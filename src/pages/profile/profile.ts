import { Component, ChangeDetectionStrategy } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ProfilUserService } from '../../services/profil-user/profil-user.service';
import { EditProfilePage } from '../edit-profile/edit-profile';
import { MyProductsPage } from '../my-products/my-products';
import { ProductsListService } from '../../services/products-list/products-list.service';
import { Observable } from '../../../node_modules/rxjs/Observable';
import { Product } from '../../models/product.model';


@IonicPage()
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {
  user = this.currentUser.getUID(); //Pour obtenir l'id de l'utilisateur connecté
  userInfo = this.currentUser.getCurrentUser();
  profile = this.currentUser.getProfile(); //Pour obtenir les infos de l'utilisateur connecté
  editProfilePage = EditProfilePage;
  myProductsPage = MyProductsPage;
  productsList: Observable<Product[]>;


  constructor(private currentUser: ProfilUserService, private products: ProductsListService,
    public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    this.productsList = this.products.getFilterProductList('uId', this.user)
    .snapshotChanges()
    .map(changes => {
      return changes.map(c => ({
        key: c.payload.key, ...c.payload.val(),
      }));
    });
    //Récupère le nombre de résultats
    this.productsList.subscribe(result => {
      console.log(result.length)
    })
  }
}

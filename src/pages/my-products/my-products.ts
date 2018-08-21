import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ProfilUserService } from '../../services/profil-user/profil-user.service';
import { AngularFireDatabase } from '../../../node_modules/angularfire2/database';
import { ProductPage } from '../product/product';
import { ProductsListService } from '../../services/products-list/products-list.service';

/**
 * Generated class for the MyProductsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-my-products',
  templateUrl: 'my-products.html',
})
export class MyProductsPage {

  user = this.currentUser.getUID(); //Pour obtenir l'id de l'utilisateur connecté
  profile = this.currentUser.getProfile(); //Pour obtenir les infos de l'utilisateur connecté
  productsList;
  productPage = ProductPage;

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
  }
}

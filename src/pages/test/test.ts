import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ProfilUserService } from '../../services/profil-user/profil-user.service';
import { AngularFireDatabase } from '../../../node_modules/angularfire2/database';
import { ProductPage } from '../product/product';
import { ProductsListService } from '../../services/products-list/products-list.service';
/**
 * Generated class for the TestPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-test',
  templateUrl: 'test.html',
})
export class TestPage {
  user = this.currentUser.getUID(); //Pour obtenir l'id de l'utilisateur connecté
  profile = this.currentUser.getProfile(); //Pour obtenir les infos de l'utilisateur connecté
  productsList;
  productPage = ProductPage;
  term;

  lastKeypress: number = 0;

  constructor(private currentUser: ProfilUserService, private database: AngularFireDatabase, private products: ProductsListService,
    public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    //this.productsList = this.products.getProductList().snapshotChanges(); 
    /*this.productsList = this.database.list('product-list/',
    ref => ref.orderByChild('uId').equalTo(this.currentUser.getUID())).snapshotChanges();*/

    /*this.productsList = this.database.list('product-list/',
    ref => ref.orderByChild('uId').equalTo(this.currentUser.getUID()))
      .snapshotChanges().map(changes => {
        return changes.map(c => ({
          key: c.payload.key, ...c.payload.val(),
      }));
    });*/

    this.productsList = this.products.getFilterProductList('uId', this.user)
    .snapshotChanges()
    .map(changes => {
      return changes.map(c => ({
        key: c.payload.key, ...c.payload.val(),
      }));
    });
  }

  search($event){
    this.productsList = this.products.getFilterProductList('name', $event.target.value)
      .snapshotChanges()
      .map(changes => {
        return changes.map(c => ({
          key: c.payload.key, ...c.payload.val(),
        }));
      });
  }
}

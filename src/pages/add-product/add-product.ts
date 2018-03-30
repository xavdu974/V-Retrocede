import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { Product } from '../../models/product.model';
import { ProductsListService } from '../../services/products-list/products-list.service';
import { HomePage } from '../home/home';
import { AngularFireList, AngularFireDatabase } from 'angularfire2/database';

/**
 * Generated class for the AddProductPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-add-product',
  templateUrl: 'add-product.html',
})
export class AddProductPage {
  product: Product = {
    name:undefined,
    description:undefined,
    society:undefined,
    location:undefined,
    price: undefined,
  }

  homePage = HomePage;
  arrData : any;
  todo$: AngularFireList<any[]>;

  constructor(public navCtrl: NavController, public navParams: NavParams, private products: ProductsListService, private toastCtrl: ToastController, private af: AngularFireDatabase) {
    //initializeApp(FIREBASE_CONFIG)
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddProductPage');
    this.todo$ = this.af.list('/product-list');
    console.log(this.todo$);
  }

  addProduct(product: Product){
    this.products.addProduct(product).then(ref => {
      this.toastCtrl.create({
        message: 'Produit ajouté avec succès',
        duration: 3000
      }).present();
      this.navCtrl.push(this.homePage);
    })
  }

}

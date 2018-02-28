import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Product } from '../../models/product.model';
import { ProductsListService } from '../../services/products-list/products-list.service';

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
    name:'',
    description:'',
    society:'',
    location:'',
    price: undefined,
  }

  constructor(public navCtrl: NavController, public navParams: NavParams, private products: ProductsListService) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddProductPage');
  }

  addProduct(product: Product){
    this.products.addProduct(product).then(ref => {
      console.log(ref.key);
    })
  }

}

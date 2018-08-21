import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Product } from '../../models/product.model';
import { ProductsListService } from '../../services/products-list/products-list.service';
import { HomePage } from '../home/home';
import { ToastService } from '../../services/toast/toast.service';
import { ProfilUserService } from '../../services/profil-user/profil-user.service';

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
    nbPhoto: 0,
    uId:this.currentUser.getUID(),
    publicationDate: null,
    imgUrl:[],
  }

  homePage = HomePage;

  constructor(public navCtrl: NavController, public navParams: NavParams, private products: ProductsListService, private toast: ToastService, private currentUser: ProfilUserService) {
    this.product.publicationDate = new Date();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddProductPage');
  }

  addProduct(product: Product){
    this.products.addProduct(product).then(ref => {
      this.toast.show('Produit ajouté avec succès');
      this.navCtrl.push(this.homePage);
    })
  }

}

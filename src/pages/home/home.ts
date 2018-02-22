import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ProductPage } from '../product/product';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  eMail: string;
  productPage = ProductPage;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.eMail = this.navParams.get('monMail');
  }
  
  ionViewDidLoad() {
    console.log('ionViewDidLoad HomePage');
  }

  fProduct(refProduit){
    this.navCtrl.push(this.productPage, {
      ref:refProduit,
    })
  }
}

import { Component } from '@angular/core';
import { NavController, NavParams, ToastController } from 'ionic-angular';
import { ProductPage } from '../product/product';
import { AngularFireAuth } from 'angularfire2/auth';
import { AddProductPage } from '../add-product/add-product';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  eMail: string;
  productPage = ProductPage;
  addProduct = AddProductPage;

  constructor(private afAuth: AngularFireAuth, private toast: ToastController ,public navCtrl: NavController, public navParams: NavParams) {
    this.eMail = this.navParams.get('monMail');
  }
  
  ionViewDidLoad() {
    this.afAuth.authState.subscribe(data => {
      if (data.email && data.uid){
        this.toast.create({
          message: "Bienvenue",
          duration: 3000
        }).present();
      }
      else{
        this.toast.create({
          message: 'Detail d\'authentification introuvable.',
          duration: 3000
        }).present();
      }
    })
  }

  fProduct(refProduit){
    this.navCtrl.push(this.productPage, {
      ref:refProduit,
    })
  }
}

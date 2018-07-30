import { Component } from '@angular/core';
import { NavController, NavParams, ToastController} from 'ionic-angular';
import { ProductPage } from '../product/product';
import { AngularFireAuth } from 'angularfire2/auth';
import { ProductsListService } from '../../services/products-list/products-list.service';
import { Observable } from 'rxjs/Observable';
import { Product } from '../../models/product.model'; //Récupère la structure de l'objet
import { ProfilePage } from '../profile/profile';
//import { database } from 'firebase'

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  profilePage = ProfilePage;
  eMail: string;
  name: string;
  productPage = ProductPage;
  mesProduits: string[];
  
  productsList: Observable<Product[]>;

  constructor(private afAuth: AngularFireAuth, private toast: ToastController , public navCtrl: NavController, public navParams: NavParams, private products: ProductsListService){
    //this.initializeItems();
    this.productsList = this.products
      .getProductList()
      .snapshotChanges()
      .map(changes => {
          return changes.map(c => ({
            key: c.payload.key, ...c.payload.val(),
        }));
      });
  }
  
  ionViewDidLoad() {
    //console.log(this.productsList);
    this.name = this.mailToName();
    /* Utile ?!
    this.productsList.subscribe((value: any) => {
      value.forEach(function(product, index: number = 0) {
        console.log("Ma/mes clé(s) :"+product.key); //tes références => pour charger toutes les images d'un produit, stocke les liens dans un tableau avec pour case tes références
      })});
    */

    //Message de bienvenue
    this.afAuth.authState.subscribe(data => {
      if (data.email && data.uid){
        this.toast.create({
          message: 'Bienvenue ' + this.name,
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

  //Récupère le prénom depuis le mail
  mailToName(){ 
    this.eMail = this.navParams.get('monMail');
    if(this.eMail != undefined){
      if(this.eMail.indexOf('@') < this.eMail.indexOf('.')){
        this.name = this.eMail.substring(0, this.eMail.indexOf('@'));
      }else{
        this.name = this.eMail.substring(0, this.eMail.indexOf('.'));
      }
    }else{
      this.name = "! On se connait ?";
    }
    this.name = this.name.charAt(0).toUpperCase() + this.name.substring(1).toLowerCase();
    return this.name;
  }

  doRefresh(refresher){
    console.log('Begin async operation', refresher);
    setTimeout(() => {
      console.log('Async operation has ended');
      refresher.complete();
    }, 2000);
  }

  /*
  initializeItems() {
    this.mesProduits = ["Banane", "Pomme", "Orange", "Grenadine"];
  }

  getItems(ev: any) {
    // Reset items back to all of the items
    this.initializeItems();

    // set val to the value of the searchbar
    const val = ev.target.value;

    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      this.mesProduits = this.mesProduits.filter((mesProduits) => {
        return (mesProduits.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
    
  }*/
}

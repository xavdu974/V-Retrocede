import { Component } from '@angular/core';
import { NavController, NavParams, ToastController} from 'ionic-angular';
import { ProductPage } from '../product/product';
import { AngularFireAuth } from 'angularfire2/auth';
import { ProductsListService } from '../../services/products-list/products-list.service';
import { Observable } from 'rxjs/Observable';
import { Product } from '../../models/product.model';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  eMail: string;
  name: string;
  productPage = ProductPage;

  productsList$: Observable<Product[]>;

  constructor(
    private afAuth: AngularFireAuth, 
    private toast: ToastController ,
    public navCtrl: NavController, 
    public navParams: NavParams, 
    private products: ProductsListService
  ) {
    this.productsList$ = this.products
      .getProductList()
      .snapshotChanges()
      .map(changes => {
          return changes.map(c => ({
            key: c.payload.key, ...c.payload.val(),
          }));
      });
  }
  
  ionViewDidLoad() {
    this.name = this.mailToName();
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

  fProduct(refProduit){
    this.navCtrl.push(this.productPage, {
      ref:refProduit,
    })
  }

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

}

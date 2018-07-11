import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Product } from '../../models/product.model';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable'
import { AngularFireDatabase, AngularFireObject } from 'angularfire2/database'

@IonicPage()
@Component({
  selector: 'page-edit-product',
  templateUrl: 'edit-product.html',
})
export class EditProductPage {
  //Déclarations
  product = {} as Product;
  productSubscription: Subscription;
  productRef: AngularFireObject<Product>;

  constructor(public navCtrl: NavController, public navParams: NavParams, private database: AngularFireDatabase) {
    //On récupère le produit concerné
    this.product = this.navParams.get('product');

    //On cible le produit sur la base de données
    const productKey = this.product.key;
    this.productRef = this.database.object('product-list/{productKey}');

    this.productSubscription = this.productRef.valueChanges().subscribe(product => this.product = product)
  }

  editProduct(product: Product){
    //Mise à jour de la bdd
    //this.productRef.update(product);
    
    //Rediriger l'utilisateur vers la page précédente
    this.navCtrl.pop();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditProductPage : '+ this.product.key);
  }

}

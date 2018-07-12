import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Product } from '../../models/product.model';
import { Subscription } from 'rxjs/Subscription';
import { AngularFireDatabase, AngularFireObject, AngularFireList } from 'angularfire2/database'

@IonicPage()
@Component({
  selector: 'page-edit-product',
  templateUrl: 'edit-product.html',
})
export class EditProductPage {
  //Déclarations
  products:AngularFireList<any>
  product: Product;
  productSubscription: Subscription;
  productRef: AngularFireObject<Product>;
  myProduct;

  constructor(public navCtrl: NavController, public navParams: NavParams, private database: AngularFireDatabase) {
    this.products = database.list('product-list');
    //On récupère le produit concerné
    this.product = this.navParams.get('product');
    this.myProduct = this.product;

    //On cible le produit sur la base de données
    this.productRef = this.database.object('product-list/{productKey}');

    this.productSubscription = this.productRef.valueChanges().subscribe(product => this.product = product)
  }

  editProduct(){
    //Mise à jour de la bdd
    this.products.update(this.myProduct.key, {
      name : this.myProduct.name,
      description : this.myProduct.description,
      society : this.myProduct.society,
      location : this.myProduct.location,
      price : this.myProduct.price
    })
    this.navCtrl.pop();//Rediriger l'utilisateur vers la page précédente
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditProductPage');
  }

}

import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ProductPage } from '../product/product';
import { ProductsListService } from '../../services/products-list/products-list.service';
import { Observable } from 'rxjs/Observable';
import { Product } from '../../models/product.model';
import { TestPage } from '../test/test';
import { AngularFireAuth } from '../../../node_modules/angularfire2/auth';
import { ProfilUserService } from '../../services/profil-user/profil-user.service';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  testPage = TestPage;
  eMail: string;
  productPage = ProductPage;
  mesProduits: string[]; 
  productsList: Observable<Product[]>;
  productsList2: Observable<Product[]>;
  isSearchbarOpened = false;
  lastKeypress: number = 0;

  constructor(public navCtrl: NavController, public navParams: NavParams, private products: ProductsListService, private afAuth: AngularFireAuth, private currentUser: ProfilUserService){
  }
  
  ionViewDidLoad() {
    this.initializeItems();
    
    if(this.currentUser.authenticated() == false){
      console.log(this.currentUser.authenticated())
    };
    /*let online: boolean;
    this.afAuth.authState.subscribe((auth) => {
      console.log(auth);
    })*/
  }

  initializeItems(){
    this.productsList = this.products
      .getProductList()
      .snapshotChanges()
      .map(changes => {
          return changes.map(c => ({
            key: c.payload.key, ...c.payload.val(),
        }));
      });
  }

  doRefresh(refresher){
    console.log('Begin async operation', refresher);
    setTimeout(() => {
      console.log('Async operation has ended');
      refresher.complete();
    }, 2000);
  }

  search($event){
    if($event.timeStamp - this.lastKeypress > 500){ //Attendre 500ms après la dernière frappe avant de questionner la Bdd
      var val = $event.target.value;
      if(val && val.trim() != ''){
        this.productsList = this.products.getFilterProductList('name', val)
        .snapshotChanges()
        .map(changes => {
          return changes.map(c => ({
            key: c.payload.key, ...c.payload.val(),
          }));
        });
      }else{
        this.initializeItems();
      }
    }
    
    this.lastKeypress = $event.timeStamp
  }
}

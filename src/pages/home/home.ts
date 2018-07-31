import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ProductPage } from '../product/product';
import { AngularFireAuth } from 'angularfire2/auth';
import { ProductsListService } from '../../services/products-list/products-list.service';
import { Observable } from 'rxjs/Observable';
import { Product } from '../../models/product.model';
import { ProfilePage } from '../profile/profile';
import { ToastService } from '../../services/toast/toast.service';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  profilePage = ProfilePage;
  eMail: string;

  productPage = ProductPage;
  mesProduits: string[];
  
  productsList: Observable<Product[]>;

  constructor(private afAuth: AngularFireAuth, private toast: ToastService , public navCtrl: NavController, public navParams: NavParams, private products: ProductsListService){
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
  }

  doRefresh(refresher){
    console.log('Begin async operation', refresher);
    setTimeout(() => {
      console.log('Async operation has ended');
      refresher.complete();
    }, 2000);
  }

}

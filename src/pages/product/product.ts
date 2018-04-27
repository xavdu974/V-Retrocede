//import * as firebase from 'firebase';

import { Component, Query } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { storage, database } from 'firebase';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { Product } from '../../models/product.model';
import { EditProductPage } from '../edit-product/edit-product';

//import { FIREBASE_CONFIG } from '../../app/app.firebase.config'

/**
 * Generated class for the ProductPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-product',
  templateUrl: 'product.html',
})
export class ProductPage {
  editProductPage = EditProductPage;
  currentImage;
  product: Product = this.navParams.get('product');

  constructor(private camera: Camera , public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    //Récupération de l'image
    var img = document.getElementById('currentImage')as HTMLImageElement;
    storage().ref(this.product.key).child("img1").getDownloadURL().then(function(url){
      img.src = url;
    }).catch(function(error){
      img.src = "https://www.vinci-construction.fr/sites/default/files/styles/1440x678/public/images/covers/sfr_retouche_05042016.jpg?itok=ICaH9mdV";
    });
  }

  //Utiliser la caméra et stocker une photo
  async takePhoto(){ 
    try{
      const options: CameraOptions = {
        quality: 100,
        targetHeight: 800,
        targetWidth: 800,
        destinationType: this.camera.DestinationType.DATA_URL,
        encodingType: this.camera.EncodingType.JPEG,
        mediaType: this.camera.MediaType.PICTURE
      }
      const result = await this.camera.getPicture(options);

      const image = `data:image/jpeg;base64,${result}`;
      
      const pictures =  storage().ref(this.product.key).child("img1"); //Emplacement sur firebase
      pictures.putString(image, 'data_url');
      console.log("Mon URL : " + pictures);

      database().ref().child("product-list/"+this.product.key).update({
        nbPhoto: 1,
      })
    }catch(e){
      console.error(e);
    }
  }

  toEditPage(){
    this.navCtrl.push(this.editProductPage,{
      product: this.product,
    })
  }

}

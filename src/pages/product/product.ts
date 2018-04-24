import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { storage } from 'firebase';
import { Camera, CameraOptions } from '@ionic-native/camera';

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
  product = this.navParams.get('product');

  constructor(private camera: Camera , public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProductPage');
    console.log(this.product.key)
  }

  async takePhoto(){ //Utiliser la caméra et stocker une photo
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
      
      const pictures =  storage().ref(this.product.key + '/' + this.product.name);
      pictures.putString(image, 'data_url');
    }catch(e){
      console.error(e);
    }
  }

}

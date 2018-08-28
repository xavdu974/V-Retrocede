//import * as firebase from 'firebase';

import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform, ActionSheetController, AlertController } from 'ionic-angular';
import { storage, database } from 'firebase';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { Product } from '../../models/product.model';
import { EditProductPage } from '../edit-product/edit-product';
import { AngularFireList, AngularFireDatabase, AngularFireObject } from 'angularfire2/database'
import { PhotoViewer } from '@ionic-native/photo-viewer';
import { CallNumber } from '@ionic-native/call-number'
import { ToastService } from '../../services/toast/toast.service';
import { ProfilUserService } from '../../services/profil-user/profil-user.service';
import { Observable } from '../../../node_modules/rxjs/Observable';
import { AngularFireAuth } from '../../../node_modules/angularfire2/auth';
import { ProductsListService } from '../../services/products-list/products-list.service';

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
  home = 'ConnectionPage';
  prod = 'ProductPage';
  edit = 'InscriptionPage';
  products:AngularFireList<any>
  editProductPage = EditProductPage;
  currentImage;
  product: Product = this.navParams.get('product');
  profile = this.currentUser.getProfileByUid(this.product.uId);

  constructor(private productsList: ProductsListService, private afDatabase: AngularFireDatabase, private afAuth: AngularFireAuth, private currentUser: ProfilUserService, private camera: Camera , public navCtrl: NavController, public navParams: NavParams, private toast: ToastService, private database: AngularFireDatabase, public platform: Platform, public actionsheetCtrl: ActionSheetController, public alertCtrl: AlertController, private photoViewer: PhotoViewer, private callNumber: CallNumber) {
    this.products = this.database.list('product-list');
  }

  ionViewDidLoad() {
    console.log("Product key : " + this.product.key);
    var img = document.getElementById('currentImage')as HTMLImageElement;
    storage().ref("product/" + this.product.key).child("img1").getDownloadURL().then(function(url){
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
      
      const pictures =  storage().ref("product/" + this.product.key).child("img1"); //Emplacement sur firebase
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

  toDeleteProduct(){
    this.alertCtrl.create({
      title: 'Suppression ?',
      message: 'Après validation, cette annonce n\'apparaîtra plus sur le catalogue.',
      buttons: [
        {
          text: 'Annuler'
        },
        {
          text: 'Supprimer',
          handler: () => {
            this.products.remove(this.product.key);
            storage().ref("product/" + this.product.key).child("img1").delete(); //supprime l'image associée
            this.toast.show("Annonce supprimée");
            this.navCtrl.pop();
          }
        }
      ]
    }).present();
  }

  openSettings(){
    //Menu de l'article
    let actionSheet = this.actionsheetCtrl.create({
      title: 'Options',
      cssClass: 'action-sheets-basic-page',
      buttons: [
        {
          text: 'Ajouter une photo',
          icon: !this.platform.is('ios') ? 'camera' : null,
          handler: () => {
            this.takePhoto();
          }
        },
        {
          text: 'Modifier l\'annonce',
          icon: !this.platform.is('ios') ? 'create' : null,
          handler: () => {
            this.toEditPage();
          }
        },
        {
          text: 'Supprimer l\'annonce',
          role: 'destructive',
          icon: !this.platform.is('ios') ? 'trash' : null,
          handler: () => {
            this.toDeleteProduct();
          }
        },
        {
          text: 'Annuler',
          role: 'cancel', // will always sort to be on the bottom
          icon: !this.platform.is('ios') ? 'close' : null,
          handler: () => {
            console.log('Annuler');
          }
        }
      ]
    });
    actionSheet.present();
  }

  photoView(){
      this.photoViewer.show("https://firebasestorage.googleapis.com/v0/b/bdd-retro.appspot.com/o/product%2F" + this.product.key + "%2Fimg1?alt=media");
  }

  toCall(){
    this.alertCtrl.create({
      title: 'Souhaitez-vous contacter le vendeur ?',
      message: 'Numéro : 0603065731',
      buttons: [
        {
          text: 'Annuler',
        },
        {
          text: 'Appeler',
          handler: () => {
            this.callNumber.callNumber("0603065731", true)
              .then(res => this.toast.show("Numérotation en cours ..."))
              .catch(err => this.toast.show("Une erreur s'est produite !")) 
          }
        }
      ]
    }).present();
  }

  toMail(){
    window.location.href='mailto:xav@yopmail.com?subject=Article : ' + this.product.name;
    this.toast.show("Ouverture de la messagerie ...");
  }

  toSave(){
    console.log(this.productsList.isFavoriteProduct(this.product.key))
  }
}

import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, Toast } from 'ionic-angular';
import { User } from '../../models/user';
import { AngularFireAuth } from 'angularfire2/auth';

/**
 * Generated class for the TestPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-test',
  templateUrl: 'test.html',
})
export class TestPage {
  user = {} as User;

  constructor(private afAuth : AngularFireAuth,public navCtrl: NavController, public navParams: NavParams, private toast: ToastController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TestPage');
    this.afAuth.auth.onAuthStateChanged(function(user) {
      if (user) {
        // Utilisateur connecté
        console.log(user.displayName);
        console.log(user.email);
        console.log(user.phoneNumber);
        console.log(user.photoURL);
        console.log(user.providerId);
        /*this.toast.create({
          message: "Bienvenue " + user.email,
          duration: 3000
        }).present();*/
        
      } else {
        // Pas d'utilisateur connecté
        /*this.toast.create({
          message: "Accès non autorisé",
          duration: 3000
        }).present();
        this.navCtrl.pop();*/
      }
    });
  }



}

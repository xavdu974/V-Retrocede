import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { User } from '../../models/user';
import { AngularFireAuth } from 'angularfire2/auth';
import { ConnectionPage } from '../connection/connection';

@IonicPage()
@Component({
  selector: 'page-inscription',
  templateUrl: 'inscription.html',
})
export class InscriptionPage {
  connectionPage = ConnectionPage
  passVerif: string;

  user = {} as User;

  constructor(private afAuth: AngularFireAuth, public navCtrl: NavController, public navParams: NavParams, private toastCtrl: ToastController) {
  }
  
  async register(user: User){
    if(user.password == this.passVerif){
      try{
        await this.afAuth.auth.createUserWithEmailAndPassword(user.email, user.password);
        this.toastCtrl.create({
          message: "Le compte a bien été créé.",
          duration: 3000
        }).present();
        this.navCtrl.push(this.connectionPage, {
          monMail: this.user.email,
        })
      }
      catch(e){
        console.error(e);
      }
    }else{
      this.toastCtrl.create({
        message: "Echec : Confirmation de mot de passe",
        duration: 3000
      }).present();
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad InscriptionPage');
  }

}

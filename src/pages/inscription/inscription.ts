import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { User } from '../../models/user';
import { AngularFireAuth } from 'angularfire2/auth';
import { ConnectionPage } from '../connection/connection';

/**
 * Generated class for the InscriptionPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

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
    //this.eMail = this.navParams.get('monMail');
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
          monMail: this.user.email, // A FINIR !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
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
  /*
  fSignIn(){
    //Vérifications adresse email
    if(this.eMail == undefined || this.pswA.trim() == ""){
      alert("Tous les champs sont obligatoires !")
    }else if(this.pswA != this.pswB){
      alert("Mots de passe non identiques !");
      this.pswA = "";
      this.pswB = "";    
    }else{
      alert("Vérification : ok");
    }

  }
  */
  ionViewDidLoad() {
    console.log('ionViewDidLoad InscriptionPage');
  }

}

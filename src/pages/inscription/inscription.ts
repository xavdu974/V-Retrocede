import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

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
  eMail: string;
  pswA: string = "";
  pswB: string = "";

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.eMail = this.navParams.get('monMail');
  }
  
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

  ionViewDidLoad() {
    console.log('ionViewDidLoad InscriptionPage');
  }

}

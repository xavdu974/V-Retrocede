import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { User } from '../../models/user';
import { AngularFireAuth } from 'angularfire2/auth';

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
  /*
  eMail: string;
  pswA: string = "";
  pswB: string = "";
  */

  user = {} as User;

  constructor(private afAuth: AngularFireAuth, public navCtrl: NavController, public navParams: NavParams) {
    //this.eMail = this.navParams.get('monMail');
  }
  
  async register(user: User){
    try{
      const result = await this.afAuth.auth.createUserWithEmailAndPassword(user.email, user.password);
      console.log(result);
    }
    catch(e){
      console.error(e);
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

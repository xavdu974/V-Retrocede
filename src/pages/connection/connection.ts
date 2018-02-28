import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { InscriptionPage } from '../inscription/inscription';
import { User } from '../../models/user';
import { AngularFireAuth } from 'angularfire2/auth';
import { HomePage } from '../home/home';

/**
 * Generated class for the ConnectionPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-connection',
  templateUrl: 'connection.html',
})
export class ConnectionPage {
  /*
  mail: string;
  psw: string;
  
  homePage = HomePage;*/
  inscriptionPage = InscriptionPage;
  homePage = HomePage;

  user = {} as User;
  
  constructor(private afAuth : AngularFireAuth, private toast: ToastController, public navCtrl: NavController, public navParams: NavParams) {
    
  }

  async login(user: User){
    var that = this;
    this.afAuth.auth.signInWithEmailAndPassword(user.email, user.password)
    .then(function(user) { //this n'est plus accessible après cette promesse -> that prend le relais
      that.navCtrl.push(that.homePage);
    })
    .catch(function(error) { //en cas de non succès
      if(error) { //si error n'est pas vide
      var errorCode = error.code;
      //var errorMessage = error.message;
        if (errorCode === 'auth/wrong-password') {
          that.toast.create({
            message: "Mot de passe incorrect",
            duration: 3000
          }).present();
        } else {
          that.toast.create({
            message: "Compte inconnu ou désactivé.",
            duration: 3000
          }).present();          
        }
      }
      });
    
    }

  register(){
    this.navCtrl.push(this.inscriptionPage);
  }

/*
  fConnection() {
    if(this.mail != null){
      this.navCtrl.push(this.homePage, {
        monMail: this.mail,
      })
    }else{
      alert("Le mail est un mal nécessaire !");
    } 
  }

  fInscription() {
    this.navCtrl.push(this.inscriptionPage, {
      monMail: this.mail,
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ConnectionPage');
  }
*/
}
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { InscriptionPage } from '../inscription/inscription';
import { User } from '../../models/user';
import { AngularFireAuth } from 'angularfire2/auth';
import { HomePage } from '../home/home';
import { ToastService } from '../../services/toast/toast.service';
import { ProfilUserService } from '../../services/profil-user/profil-user.service';

@IonicPage()
@Component({
  selector: 'page-connection',
  templateUrl: 'connection.html',
})
export class ConnectionPage {
  name: string;
  eMail: string;
  inscriptionPage = InscriptionPage;
  homePage = HomePage;

  user = {} as User;
  
  constructor(private afAuth : AngularFireAuth, private toast: ToastService, public navCtrl: NavController, public navParams: NavParams, public currentUser: ProfilUserService) {
    this.eMail = this.navParams.get('monMail');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ConnectionPage');
    this.name = this.mailToName();
  }

  async login(user: User){
    var that = this;
    this.afAuth.auth.signInWithEmailAndPassword(user.email, user.password)
    .then(function(user) { //this n'est plus accessible après cette promesse -> that prend le relais
      that.toast.show("Bienvenue " + that.mailToName())
      that.navCtrl.push(that.homePage);
    })
    .catch(function(error) {
      if(error) {
      var errorCode = error.code;
        if (errorCode === 'auth/wrong-password') {
          that.toast.show("Mot de passe incorrect");
        } else {
          that.toast.show("Compte inconnu ou désactivé.");         
        }
      }
      });
    
    }

  register(){
    this.navCtrl.push(this.inscriptionPage);
  }

  mailToName(){ 
    if(this.user.email != undefined){
      if(this.user.email.indexOf('@') < this.user.email.indexOf('.')){
        this.name = this.user.email.substring(0, this.user.email.indexOf('@'));
      }else{
        this.name = this.user.email.substring(0, this.user.email.indexOf('.'));
      }
    }else{
      this.name = "! On se connait ?";
    }
    this.name = this.name.charAt(0).toUpperCase() + this.name.substring(1).toLowerCase();
    return this.name;
  }

}
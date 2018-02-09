import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { InscriptionPage } from '../inscription/inscription';
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
  mail: string;
  psw: string;
  
  homePage = HomePage;
  inscriptionPage = InscriptionPage;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    
  }

  fConnection() {
    this.navCtrl.push(this.homePage, {
      monMail: this.mail
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ConnectionPage');
  }

}
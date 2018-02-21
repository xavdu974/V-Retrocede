import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  eMail: string;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.eMail = this.navParams.get('monMail');
  }
  
  ionViewDidLoad() {
    console.log('ionViewDidLoad HomePage');
  }
}

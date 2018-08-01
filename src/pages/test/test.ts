import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ProfilUserService } from '../../services/profil-user/profil-user.service';
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
  user = this.currentUser.getUID();
  profile = this.currentUser.getProfile();


  constructor(private currentUser: ProfilUserService,
    public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
  }



}

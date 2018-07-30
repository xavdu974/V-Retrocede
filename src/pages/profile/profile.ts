import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Profile } from '../../models/profile';
import { AngularFireAuth } from '../../../node_modules/angularfire2/auth';
import { AngularFireDatabase } from '../../../node_modules/angularfire2/database';
import { HomePage } from '../home/home';
import { auth } from '../../../node_modules/firebase';
import { Observable } from '../../../node_modules/rxjs/Observable';
/**
 * Generated class for the ProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {
  //profile = {} as Profile
  homePage = HomePage;
  profile = {} as Profile;
  profiles: Observable<any[]>
  currentUser = auth().currentUser.uid; 

  constructor(private afAuth: AngularFireAuth, private afDatabase: AngularFireDatabase,
    public navCtrl: NavController, public navParams: NavParams) {
      
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilePage');
    this.profiles = this.afDatabase.list(`profile/${this.currentUser}`).valueChanges();
    this.profiles.forEach(element => {
      this.profile.firstName = element[0];
      this.profile.lastName = element[1];
      this.profile.phoneNumber = element[2];
    });
  }

  createProfile(){
    console.table(this.profile);
    this.afAuth.authState.take(1).subscribe(auth => {
      this.afDatabase.object(`profile/${auth.uid}`).set(this.profile)
        .then(() => this.navCtrl.push(this.homePage));
    })
  }
}

import { Component, ChangeDetectionStrategy } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Profile } from '../../models/profile';
import { AngularFireAuth } from '../../../node_modules/angularfire2/auth';
import { AngularFireDatabase } from '../../../node_modules/angularfire2/database';
import { HomePage } from '../home/home';
import { ToastService } from '../../services/toast/toast.service';
import { ProfilUserService } from '../../services/profil-user/profil-user.service';


@IonicPage()
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {
  homePage = HomePage;
  uID = this.currentUser.getUID(); 
  profileData = this.currentUser.getProfile();
  profile = {} as Profile;
  test;

  constructor(private toast: ToastService , private afAuth: AngularFireAuth, private afDatabase: AngularFireDatabase,private currentUser: ProfilUserService,
    public navCtrl: NavController, public navParams: NavParams) { 
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilePage');
  }

  createProfile(){
    this.afAuth.authState.take(1).subscribe(auth => {
      this.afDatabase.object(`profile/${auth.uid}`).set(this.profile)
        .then(() => {
          this.toast.show("Profil mis à jour"), 
          this.navCtrl.push(this.homePage)
        });
    })
  }
}

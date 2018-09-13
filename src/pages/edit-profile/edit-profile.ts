import { Component, ChangeDetectionStrategy } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Profile } from '../../models/profile';
import { AngularFireAuth } from '../../../node_modules/angularfire2/auth';
import { AngularFireDatabase } from '../../../node_modules/angularfire2/database';
import { ToastService } from '../../services/toast/toast.service';
import { ProfilUserService } from '../../services/profil-user/profil-user.service';

@IonicPage()
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'page-edit-profile',
  templateUrl: 'edit-profile.html',
})
export class EditProfilePage {
  uID = this.currentUser.getUID(); 
  profileData = this.currentUser.getProfile();
  profile = {} as Profile;

  constructor(private toast: ToastService , private afAuth: AngularFireAuth, private afDatabase: AngularFireDatabase,private currentUser: ProfilUserService,
    public navCtrl: NavController, public navParams: NavParams) { 
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad editProfilePage');
  }

  createProfile(){
    this.afAuth.authState.take(1).subscribe(auth => {
      this.afDatabase.object(`profile/${auth.uid}`).set(this.profile)
        .then(() => {
          this.toast.show("Profil mis à jour"), 
          this.navCtrl.pop();
        });
    })
  }

}

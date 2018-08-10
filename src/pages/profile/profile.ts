import { Component, ChangeDetectionStrategy } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ProfilUserService } from '../../services/profil-user/profil-user.service';
import { EditProfilePage } from '../edit-profile/edit-profile';


@IonicPage()
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {
  user = this.currentUser.getUID(); //Pour obtenir l'id de l'utilisateur connecté
  userInfo = this.currentUser.getCurrentUser();
  profile = this.currentUser.getProfile(); //Pour obtenir les infos de l'utilisateur connecté
  editProfilePage = EditProfilePage;


  constructor(private currentUser: ProfilUserService,
    public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log(this.userInfo.email)
  }
}

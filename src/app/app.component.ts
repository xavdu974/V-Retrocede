import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { AddProductPage } from '../pages/add-product/add-product';
import { ConnectionPage } from '../pages/connection/connection';
import { InscriptionPage } from '../pages/inscription/inscription';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = ConnectionPage;

  pages: Array<{title: string, icon: string , component: any}>;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Annonces', icon: 'assets/icon/wish.svg', component: HomePage },
      { title: 'Déposer une annonce', icon: 'assets/icon/edit.svg', component: AddProductPage },
      { title: 'Connexion', icon: 'assets/icon/favorite.svg', component: ConnectionPage },
      { title: 'Inscription', icon: 'assets/icon/search.svg', component: InscriptionPage }
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    this.nav.setRoot(page.component);
  }
}

import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule, LoadingController } from 'ionic-angular';
import { PhotoViewer } from '../../node_modules/@ionic-native/photo-viewer';
import { CallNumber } from '../../node_modules/@ionic-native/call-number'

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { ConnectionPageModule } from '../pages/connection/connection.module';
import { InscriptionPageModule } from '../pages/inscription/inscription.module';
import { ProductPageModule } from '../pages/product/product.module';
import { AngularFireModule } from 'angularfire2';
import { FIREBASE_CONFIG } from './app.firebase.config';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabaseModule} from 'angularfire2/database';
import { AddProductPageModule } from '../pages/add-product/add-product.module';
import { ProductsListService } from '../services/products-list/products-list.service';
import { Camera } from '@ionic-native/camera';
import { EditProductPageModule } from '../pages/edit-product/edit-product.module';
import { TestPageModule } from '../pages/test/test.module';
import { ProfilePageModule } from '../pages/profile/profile.module';
import { ToastService } from '../services/toast/toast.service';
import { ProfilUserService } from '../services/profil-user/profil-user.service';
import { EditProfilePageModule } from '../pages/edit-profile/edit-profile.module';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AddProductPageModule,
    InscriptionPageModule,
    AngularFireModule.initializeApp(FIREBASE_CONFIG),//1
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    ProductPageModule,
    ConnectionPageModule,
    EditProductPageModule,
    ProfilePageModule,
    EditProfilePageModule,
    TestPageModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ProductsListService,
    Camera,
    LoadingController,
    PhotoViewer,
    CallNumber,
    ToastService,
    ProfilUserService
  ]
})
export class AppModule {}

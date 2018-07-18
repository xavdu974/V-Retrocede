import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule, LoadingController } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { ConnectionPage } from '../pages/connection/connection';
import { InscriptionPage } from '../pages/inscription/inscription';
import { ProductPage } from '../pages/product/product';
import { AngularFireModule } from 'angularfire2';//2
import { FIREBASE_CONFIG } from './app.firebase.config';//3.
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabaseModule} from 'angularfire2/database';
import { AddProductPageModule } from '../pages/add-product/add-product.module';
import { ProductsListService } from '../services/products-list/products-list.service';
import { Camera } from '@ionic-native/camera';
import { EditProductPage } from '../pages/edit-product/edit-product'
import { PhotoViewer } from '../../node_modules/@ionic-native/photo-viewer';


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    ConnectionPage,
    InscriptionPage,
    ProductPage,
    EditProductPage,
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AddProductPageModule,
    AngularFireModule.initializeApp(FIREBASE_CONFIG),//1
    AngularFireAuthModule,
    AngularFireDatabaseModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
    ConnectionPage,
    InscriptionPage,
    ProductPage,
    EditProductPage,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ProductsListService,
    Camera,
    LoadingController,
    PhotoViewer
  ]
})
export class AppModule {}

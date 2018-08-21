import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MyProductsPage } from './my-products';

@NgModule({
  declarations: [
    MyProductsPage,
  ],
  imports: [
    IonicPageModule.forChild(MyProductsPage),
  ],
})
export class MyProductsPageModule {}

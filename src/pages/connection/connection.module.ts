import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ConnectionPage } from './connection';

@NgModule({
  declarations: [
    ConnectionPage,
  ],
  imports: [
    IonicPageModule.forChild(ConnectionPage),
  ],
})
export class ConnectionPageModule {}

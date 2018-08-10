import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MyRepairHistoryPage } from './my-repair-history';

@NgModule({
  declarations: [
    MyRepairHistoryPage,
  ],
  imports: [
    IonicPageModule.forChild(MyRepairHistoryPage),
  ],
})
export class MyRepairHistoryPageModule {}

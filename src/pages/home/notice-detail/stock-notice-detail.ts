import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFirestore } from 'angularfire2/firestore';
import { GlobalVars } from '../../../providers/global';

@IonicPage()
@Component({
  selector: 'page-stock-notice-detail',
  templateUrl: 'stock-notice-detail.html',
})
export class StockNoticeDetailPage {

  // notice:any;
  content: string;

  constructor(public navCtrl: NavController, public afs: AngularFirestore, public navParams: NavParams,
  public global : GlobalVars) {
    this.content = this.navParams.get('content');
  }


  ionViewWillEnter() {
    // console.log('ionViewEnteredStockMangePage')
    this.global.changeMessage(false);
  }

}

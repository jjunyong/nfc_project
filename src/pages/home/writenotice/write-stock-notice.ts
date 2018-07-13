import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { AngularFirestore } from 'angularfire2/firestore';
import { GlobalVars } from '../../../providers/global';

/**
 * Generated class for the WritenoticePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-write-stock-notice',
  templateUrl: 'write-stock-notice.html',
})
export class WriteStockNoticePage {

  title: string;
  writer: string;
  content: string;

  constructor(public afs: AngularFirestore, public navCtrl: NavController, public navParams: NavParams,
    public global: GlobalVars, public alertCtrl: AlertController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad WritestocknoticePage');
    this.global.changeMessage(false);
  }

  confirm() {

    if (this.title == null || this.writer == null || this.content == null) {
      let alert = this.alertCtrl.create({
        title: '빈 내용을 입력하세요',
        buttons: ['OK']
      });
      alert.present();
    }
    else {
      this.afs.collection('stock_notice').add({
        title: this.title,
        writer: this.writer,
        content: this.content,
        timestamp: new Date()
      })
      this.navCtrl.pop();
    }
    
  }

}

import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFirestore } from 'angularfire2/firestore';
import { AlertController } from 'ionic-angular/components/alert/alert-controller';

@IonicPage()
@Component({
  selector: 'page-write-repair-notice',
  templateUrl: 'write-repair-notice.html',
})
export class WriteRepairNoticePage {

  title : string;
  writer : string;
  content : string;

  constructor(public afs: AngularFirestore, public navCtrl: NavController, public navParams: NavParams,
  public alertCtrl : AlertController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad WritenoticePage');
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
      this.afs.collection('repair_notice').add({
        title: this.title,
        writer: this.writer,
        content: this.content,
        timestamp: new Date()
      })
      this.navCtrl.pop();
    }
  }
}

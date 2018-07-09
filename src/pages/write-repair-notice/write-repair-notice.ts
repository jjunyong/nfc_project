import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFirestore } from 'angularfire2/firestore';

@IonicPage()
@Component({
  selector: 'page-write-repair-notice',
  templateUrl: 'write-repair-notice.html',
})
export class WriteRepairNoticePage {

  title : string;
  writer : string;
  content : string;

  constructor(public afs: AngularFirestore, public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad WritenoticePage');
  }

  confirm(){

    this.afs.collection('repairnotice').add({
      title : this.title,
      writer : this.writer,
      content : this.content,
      timestamp : new Date()
    })
    this.navCtrl.pop();
  }
}

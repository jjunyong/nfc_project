import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
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
  selector: 'page-writenotice',
  templateUrl: 'writenotice.html',
})
export class WritenoticePage {

  title: string;
  writer: string;
  content: string;

  constructor(public afs: AngularFirestore, public navCtrl: NavController, public navParams: NavParams,
  public global : GlobalVars) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad WritenoticePage');
    this.global.changeMessage(false);
  }

  confirm() {

    this.afs.collection('notice').add({
      title: this.title,
      writer: this.writer,
      content: this.content,
      timestamp: new Date()
    })
    this.navCtrl.pop();
  }

}

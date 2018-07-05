import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFirestore } from 'angularfire2/firestore';

/**
 * Generated class for the RepairNoticePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-repair-notice',
  templateUrl: 'repair-notice.html',
})
export class RepairNoticePage {

// notice:any;
content: string;

constructor(public navCtrl: NavController, public afs:AngularFirestore, public navParams: NavParams) {
  this.content = this.navParams.get('content');
}

  ionViewDidLoad() {
    console.log('ionViewDidLoad RepairNoticePage');
  }

}

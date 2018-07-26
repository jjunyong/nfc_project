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

notice:any;
backgroundImage = "https://firebasestorage.googleapis.com/v0/b/prototype-d68e4.appspot.com/o/%EB%A9%94%EC%9D%B8%ED%8E%98%EC%9D%B4%EC%A7%802_%ED%88%AC%EB%AA%85.png?alt=media&token=b4bb27d8-9ce6-44b5-b979-a5d24c2401b2";


constructor(public navCtrl: NavController, public afs:AngularFirestore, public navParams: NavParams) {
  this.notice = this.navParams.get('notice');
}

  ionViewDidLoad() {
    console.log('ionViewDidLoad RepairNoticePage');
  }

}


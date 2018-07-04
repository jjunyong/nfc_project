import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { NFC } from '@ionic-native/nfc';

/**
 * Generated class for the TesthomepagePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-testhomepage',
  templateUrl: 'testhomepage.html',
})
export class TesthomepagePage {

  payload : string;

  constructor(public navCtrl: NavController, public navParams: NavParams, private nfc: NFC) {

    // this.nfc.addMimeTypeListener('jjun/read',()=>{
    //   console.log('nfc attached')
    // }, (err) => {
    //   console.log('error attaching ndef listener', err);
    // }).subscribe((event) => {

    //   this.payload = this.nfc.bytesToString(event.tag.ndefMessage[0].payload);
    //   alert(this.payload);
    //   // this.navCtrl.push('LocationManagePage')
    // });
  }
}

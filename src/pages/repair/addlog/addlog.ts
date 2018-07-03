import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { AngularFirestore } from 'angularfire2/firestore'
import { FireService } from '../../../app/FireService';


class RepairLog{
  title: string
  writer: string
  description: string
  code: string
}

@IonicPage()
@Component({
  selector: 'page-addlog',
  templateUrl: 'addlog.html',
})
export class AddlogPage {

  RepairLog = new RepairLog();
  title : string
  writer : string
  description : string
  code : string
  
 

  constructor(public afs:AngularFirestore, public navCtrl: NavController, public navParams: NavParams,
    private toast: ToastController,
  public fireService : FireService) {

    this.code = this.navParams.get('code');
}

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddrepairPage');
  }

  save(){

    this.RepairLog.title = this.title;
    this.RepairLog.writer = this.writer;
    this.RepairLog.description = this.description;
    this.RepairLog.code = this.code;
    

    this.fireService.LogAdd(this.RepairLog)
    this.navCtrl.pop()
  }


}

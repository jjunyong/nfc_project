import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, ViewController } from 'ionic-angular';
import { AngularFirestore } from 'angularfire2/firestore'
import { FireService } from '../../../providers/FireService';


class RepairLog{
  title: string
  writer: string
  description: string
  id: string
  timestamp: Date
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
  id : string
  
 

  constructor(public afs:AngularFirestore, public navCtrl: NavController, public navParams: NavParams,
  public fireService : FireService, private viewCtrl: ViewController) {

    this.id = this.navParams.get('id');
}

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddrepairPage');
  }

  cancel(){
    this.viewCtrl.dismiss()
  }

  save(){

    this.RepairLog.title = this.title;
    this.RepairLog.writer = this.writer;
    this.RepairLog.description = this.description;
    this.RepairLog.id = this.id;
    

    this.fireService.LogAdd(this.RepairLog)
    this.navCtrl.pop()
    this.fireService.Add_User_Log(this.RepairLog.title, this.RepairLog.writer, this.RepairLog.description);
  
    
  }


}

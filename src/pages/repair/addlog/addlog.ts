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
  model : string
  serialNum:string
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
  model : string
  serialNum : string
  
 

  constructor(public afs:AngularFirestore, public navCtrl: NavController, public navParams: NavParams,
  public fireService : FireService, private viewCtrl: ViewController) {

    this.id = this.navParams.get('id');
    this.serialNum =this.navParams.get('serialNum')
    this.model= this.navParams.get('model')
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
    this.RepairLog.model=this.model;
    this.RepairLog.serialNum=this.serialNum;
    

    this.fireService.LogAdd(this.RepairLog)
    this.navCtrl.pop()
    this.fireService.Add_User_Log(this.RepairLog);
  
    
  }


}

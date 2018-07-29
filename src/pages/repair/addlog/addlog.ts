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
  backgroundImage ="https://firebasestorage.googleapis.com/v0/b/prototype-d68e4.appspot.com/o/%EB%A9%94%EC%9D%B8%ED%8E%98%EC%9D%B4%EC%A7%802_%ED%88%AC%EB%AA%85.png?alt=media&token=b4bb27d8-9ce6-44b5-b979-a5d24c2401b2";
 

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

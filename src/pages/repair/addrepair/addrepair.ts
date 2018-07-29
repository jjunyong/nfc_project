import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { AngularFirestore } from 'angularfire2/firestore'
import { FireService } from '../../../providers/FireService';


class RepairItem{
  serialNum : string;
  model: string;
  repairman: string;
  id : string;
  Image: string;
}


@IonicPage()
@Component({
  selector: 'page-addrepair',
  templateUrl: 'addrepair.html',
})
export class AddrepairPage {

  RepairItem = new RepairItem()
  serialNum
  model
  repairman

  backgroundImage = "https://firebasestorage.googleapis.com/v0/b/prototype-d68e4.appspot.com/o/%EB%A9%94%EC%9D%B8%ED%8E%98%EC%9D%B4%EC%A7%802_%ED%88%AC%EB%AA%85.png?alt=media&token=b4bb27d8-9ce6-44b5-b979-a5d24c2401b2";


  constructor(public afs:AngularFirestore, public navCtrl: NavController, public navParams: NavParams,
  public fireService : FireService) {
}

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddrepairPage');
  }

  update(){
    this.RepairItem.id = this.afs.createId();
    this.RepairItem.model = this.model;
    this.RepairItem.repairman = this.repairman;
    this.RepairItem.serialNum = this.serialNum;

    this.fireService.RepairAdd(this.RepairItem)
    this.navCtrl.pop()
  }

}

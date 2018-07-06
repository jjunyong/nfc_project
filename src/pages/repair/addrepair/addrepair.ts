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

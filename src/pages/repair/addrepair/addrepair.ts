import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { AngularFirestore } from 'angularfire2/firestore'
import { FireService } from '../../../app/FireService';


class RepairItem{
  name : string;
  model: string;
  repairman: string;
  code : string;
}


@IonicPage()
@Component({
  selector: 'page-addrepair',
  templateUrl: 'addrepair.html',
})
export class AddrepairPage {

  RepairItem = new RepairItem()
  name
  model
  repairman


  constructor(public afs:AngularFirestore, public navCtrl: NavController, public navParams: NavParams,
  public fireService : FireService) {
}

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddrepairPage');
  }

  update(){
    this.RepairItem.code = this.afs.createId();
    this.RepairItem.model = this.model;
    this.RepairItem.repairman = this.repairman;
    this.RepairItem.name = this.name;

    this.fireService.RepairAdd(this.RepairItem)
    this.navCtrl.pop()
  }

}

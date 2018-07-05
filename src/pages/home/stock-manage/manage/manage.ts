import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { AngularFirestore } from 'angularfire2/firestore'
import { FireService } from '../../../../providers/FireService';

class Item {
  model : string;
  quantity: number;
  location1: any;
  location2: any;
  serialNum : string;
}

@IonicPage()
@Component({
  selector: 'page-manage',
  templateUrl: 'manage.html',
})
export class ManagePage {

  item = new Item()
  serialNum : string;
  model : string;
  location1 : string;
  location2 : string;
  quantity : number;



  constructor(public afs:AngularFirestore, public navCtrl: NavController, public navParams: NavParams,
              private toast: ToastController,
            public fireService : FireService) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ManagePage');
  }

  add(){
    this.item.serialNum = this.serialNum;
    this.item.model = this.model;
    this.item.location1 = this.location1
    this.item.location2 = this.location2;
    this.item.quantity = this.quantity;

    this.fireService.itemAdd(this.item)
    this.navCtrl.pop()
  }

}

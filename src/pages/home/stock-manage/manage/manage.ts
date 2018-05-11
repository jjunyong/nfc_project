import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { AngularFirestore } from 'angularfire2/firestore'
import { FireService } from '../../../../app/FireService';
// import { Item } from '../../../../app/item'

class Item{
  name : string;
  quantity: number;
  location: string;
  code : string;
}

@IonicPage()
@Component({
  selector: 'page-manage',
  templateUrl: 'manage.html',
})
export class ManagePage {

  item : Item
  name
  location
  quantity

  constructor(public afs:AngularFirestore, public navCtrl: NavController, public navParams: NavParams,
              private toast: ToastController,
            public fireService : FireService) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ManagePage');
  }

  update(){
    this.item.code = Math.random().toString(36).substring(7)
    this.item.name = this.name;
    this.item.location = this.location;
    this.item.quantity = this. quantity;

    this.fireService.itemAdd(this.item)
    this.navCtrl.pop()
  }

}

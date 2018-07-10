import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore'
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
 
  public itemsCollection: AngularFirestoreCollection<Item>; 
  items : any = [];

  item = new Item()
  serialNum : string;
  model : string;
  location1 : string;
  location2 : string;
  quantity : number;
 
  itemList : any=[]; 
  itemArray : any = [];
  loadedItemList:  any=[]; 


  constructor(public afs:AngularFirestore, public navCtrl: NavController, public navParams: NavParams,
              private toast: ToastController,
            public fireService : FireService) {
             
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ManagePage');
  }

  add(){
    console.log("test", this.model)
    this.itemsCollection = this.afs.collection<Item>('item', ref => ref.where('model', '==', 'this.model'));
    this.items= this.itemsCollection.valueChanges();
    this.items.subscribe((item)=>{
          this.itemArray = item;
          this.itemList = this.itemArray;
          this.loadedItemList = this.itemArray;
    })
    console.log("exist",this.itemArray)

    this.item.serialNum = this.serialNum;
    this.item.model = this.model;
    this.item.location1 = this.location1
    this.item.location2 = this.location2;
    this.item.quantity = this.quantity;

    this.fireService.itemAdd(this.item)
    this.navCtrl.pop()
  }

}

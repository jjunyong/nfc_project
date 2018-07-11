import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, LoadingController, AlertController } from 'ionic-angular';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore'
import { FireService } from '../../../../providers/FireService';

class Item{
  location1: any;
  location2: any;
  model: string;
  quantity : number;
  id : string;
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
  model : string;
  location1 : string;
  location2 : string;
  quantity : number;
 
  itemList : any=[]; 
  itemArray : any = [];
  loadedItemList:  any=[]; 
  overlap : boolean;
  
  

  constructor(public afs:AngularFirestore, public navCtrl: NavController, public navParams: NavParams,
              private toast: ToastController,
            public fireService : FireService, public loadingCtrl: LoadingController,
            private alertCtrl : AlertController) {
    let loadingPopup = this.loadingCtrl.create({
      spinner: 'crescent', // icon style //
      content: '',
    });
    loadingPopup.present();

    this.itemsCollection = afs.collection<Item>('item');
    this.items= this.itemsCollection.valueChanges();
    
    this.items.subscribe((item)=>{
      this.itemArray = item;
      this.itemList = this.itemArray;
      this.loadedItemList = this.itemArray;
      loadingPopup.dismiss();
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ManagePage');
  }

  initializeItems(){
    this.itemList = this.loadedItemList;
  }

  add(search){
  this.initializeItems();
  var q =this.model
  // if the value is an empty string don't filter the items
  //console.log(q, "==")
  this.overlap=false;
  if (!q) {
    return;
  }
  this.itemList = this.itemList.filter((v) => {
    if(v.model && q) {
      if (v.model.toLowerCase().indexOf(q.toLowerCase()) > -1) {
        console.log("correct")
        this.overlap=true;
        return true;
      }
      return false;
    }
  });

  if(this.overlap){

    let alert =this.alertCtrl.create({
      title : 'Already Existed',
      subTitle : '이미 존재하는 Model 입니다.',
      buttons :['Dismiss']
    });
    alert.present();

  }
  else{
    //Item 추가
    this.item.model = this.model;
    this.item.location1 = this.location1
    this.item.location2 = this.location2;
    this.item.quantity = this.quantity;
    this.fireService.itemAdd(this.item)
    this.navCtrl.pop()
  }
}
}

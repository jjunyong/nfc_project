import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ViewController } from 'ionic-angular';
// import { FirebaseListObservable, AngularFireDatabase } from 'angularfire2/database-deprecated';
// import 'rxjs/add/operator/map'; // you might need to import this, or not depends on your setup

import { AlertController } from 'ionic-angular/components/alert/alert-controller';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { FireService } from '../../../../src/providers/FireService'
import { GlobalVars } from '../../../providers/global';
class Item{
  location1: any;
  location2: any;
  model: string;
  quantity : number;
  id : string;
}

@IonicPage()
@Component({
  selector: 'page-stock-manage',
  templateUrl: 'stock-manage.html',
})
export class StockManagePage {
  item = new Item()

  new_item;

  public itemsCollection: AngularFirestoreCollection<Item>; 
  itemList : any=[]; 
  itemArray : any = [];
  loadedItemList:  any=[]; 
  items : any = [];

  
  constructor( public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
    public navCtrl: NavController,
    private afs: AngularFirestore,
    public navParams : NavParams,
    public fireService : FireService,
    public global : GlobalVars
  ) {

    // this.global.currentMessage.subscribe(message => this.show = message)
    // this.global.changeMessage(false)
    this.global.changeMessage(true);

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
    console.log(this.loadedItemList)
    
   
}

ionViewWillEnter(){
  console.log('ionViewEnteredStockMangePage')
  this.global.changeMessage(false);
}

initializeItems(){
  this.itemList = this.loadedItemList;
}

getItems(searchbar) {
  // Reset items back to all of the items
  this.initializeItems();

  //console.log(this.itemList)
  // set q to the value of the searchbar
  var q = searchbar.srcElement.value;
  // if the value is an empty string don't filter the items
  if (!q) {
    return;
  }
  this.itemList = this.itemList.filter((v) => {
    if(v.model && q) {
      if (v.model.toLowerCase().indexOf(q.toLowerCase()) > -1) {
       
        return true;
      }
      return false;
    }
  });

 // console.log(q, this.itemList.length);
}


manage(){  
    let confirm = this.alertCtrl.create({
      title: '새로운 아이템을 추가하겠습니까?',
      message: '새로운 아이템을 추가하려면 Yes를 클릭하세요',
      buttons: [
        {
          text: 'Yes',
          handler: () => {
            this.openNextPage()
          }
        },
        {
          text: 'Cancel',
          handler: () => {
            console.log('cancel clicked');
          }
        }
      ]
    });
    confirm.present();
}

openNextPage(){
  this.navCtrl.push('ManagePage')
}

openDetail(item){
  this.navCtrl.push('ItemDetailPage',{
    serialNum : item.serialNum,
    model : item.model,
    location1 : item.location1,
    location2 : item.location2,
    quantity : item.quantity,
    id : item.id
  })
}

}













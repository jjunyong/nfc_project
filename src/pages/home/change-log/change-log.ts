import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { FireService } from '../../../../src/providers/FireService'
/**
 * Generated class for the ChangeLogPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
class Item{
  location1: any;
  location2: any;
  model: string;
  quantity : number;
  serialNum : string;
  id : string;
}

@IonicPage()
@Component({
  selector: 'page-change-log',
  templateUrl: 'change-log.html',
})
export class ChangeLogPage {
  
  startDate = new Date().toISOString();
  finDate = new Date().toISOString();
  public itemsCollection: AngularFirestoreCollection<Item>; 
  itemList : any=[]; 
  itemArray : any = [];
  loadedItemList:  any=[]; 
  items : any = [];
  
  constructor(public navCtrl: NavController, public navParams: NavParams,
    private afs: AngularFirestore,
    public fireService : FireService) {

    // this.itemsCollection = afs.collection<Item>('item');
    // this.items= this.itemsCollection.valueChanges();
    // this.items.subscribe((item)=>{
    //   this.itemArray = item;
    //   this.itemList = this.itemArray;
    //   this.loadedItemList = this.itemArray;
    //   //loadingPopup.dismiss();
    // })
    
    //this.itemsCollection = afs.collection('item').doc(this.itemList)

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ChangeLogPage');
  }

  SerchTime(){
    console.log(this.startDate);
    console.log(this.finDate);
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

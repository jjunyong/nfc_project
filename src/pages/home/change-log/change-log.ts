import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { FireService } from '../../../../src/providers/FireService'
import { Observable } from 'rxjs/Observable'
import { map } from 'rxjs/operators'
import { ItemDetailPage } from '../stock-manage/item-detail/item-detail';
import { LoginPage } from '../../auth/login/login';
import { timestamp } from 'rxjs/operators/timestamp';
/**
 * Generated class for the ChangeLogPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
class Log{
  itemLocation1: any;
  itemLocation2: any;
  itemModel: string;
  itemQuantity : number;
  itemSerialNum : string;
  type : string;
  timestamp : string;
}

@IonicPage()
@Component({
  selector: 'page-change-log',
  templateUrl: 'change-log.html',
})
export class ChangeLogPage {

  startDate = new Date().toISOString();
  finDate = new Date().toISOString();

  public itemsCollection: AngularFirestoreCollection<Log>; 
 // public items_Imported_Collection : AngularFirestoreCollection<import>;


  itemList : any=[]; 
  itemArray : any = [];
  loadedItemList:  any=[]; 
  items : any = [];
  itemTemp : any = [];
  changed_type : any;
  
  constructor(public navCtrl: NavController, public navParams: NavParams,
    private afs: AngularFirestore,
    public fireService : FireService) {
      this.itemsCollection = this.afs.collection<Log>('log');
      this.items= this.itemsCollection.valueChanges();
      
      this.items.subscribe((item)=>{
        this.itemArray = item;
        this.itemList = this.itemArray;
        this.loadedItemList = this.itemArray;
        //loadingPopup.dismiss();
      })
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ChangeLogPage');
  }

  SerchTime(){
    console.log(this.startDate);
    console.log(this.finDate);
    //console.log(this.itemArray);
    console.log(this.changed_type);
    //console.log("serious")
    //console.log(this.itemList.length);
    if(this.changed_type=="import"){
      
    this.itemsCollection = this.afs.collection<Log>('import', ref => ref.where('quantity', '<', '200'));
     //this.itemsCollection=this.afs.collection<Log>('import');

      this.items= this.itemsCollection.valueChanges();
        
        this.items.subscribe((item)=>{
          console.log(this.items)
          this.itemArray = item;
          this.itemList = this.itemArray;
          this.loadedItemList = this.itemArray;
          //loadingPopup.dismiss();
        })
        //console.log("length", this.itemArray.length)
    }
      if(this.changed_type=="export"){
        this.itemsCollection = this.afs.collection<Log>('export')
        this.items= this.itemsCollection.valueChanges();
        this.items.subscribe((item)=>{
          this.itemArray = item;
          this.itemList = this.itemArray;
          this.loadedItemList = this.itemArray;
          //loadingPopup.dismiss();
        })
      }

      if(this.changed_type=="location_changed"){
        this.itemsCollection = this.afs.collection<Log>('location_changed');
        this.items= this.itemsCollection.valueChanges();
       
        this.items.subscribe((item)=>{
          this.itemArray = item;
          this.itemList = this.itemArray;
          this.loadedItemList = this.itemArray;
          //loadingPopup.dismiss();
        })
      }


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

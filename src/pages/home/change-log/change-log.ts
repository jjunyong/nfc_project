import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { FireService } from '../../../../src/providers/FireService'
import { Observable, BehaviorSubject } from 'rxjs'
import { map, combineLatest, switchMap } from 'rxjs/operators'
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
  location1: any;
  location2: any;
  model: string;
  quantity : number;
  type : string;
  timestamp : string;
}

@IonicPage()
@Component({
  selector: 'page-change-log',
  templateUrl: 'change-log.html',
})
export class ChangeLogPage {  
  
  startDate : Date
  finDate : Date

  public itemsCollection: AngularFirestoreCollection<Log>; 
  items : any = [];
  itemList : any=[]; 
  itemArray : any = [];
  loadedItemList:  any=[]; 
  
  items_2 : any = [];
  itemTemp : any = [];
  changed_type : any;
  
  constructor(public navCtrl: NavController, public navParams: NavParams,
    private afs: AngularFirestore,
    public fireService : FireService) {
     
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ChangeLogPage');
  }

  SerchTime(){
    //console.log(this.itemArray);
    console.log(this.changed_type);
    //console.log("serious")
    //console.log(this.itemList.length);

    
    this.startDate=new Date(this.startDate);
    this.finDate=new Date(this.finDate)
    this.finDate.setHours(23);
    this.finDate.setMinutes(59);
    this.finDate.setSeconds(59);

    console.log(this.startDate);
    console.log(this.finDate);
    if(this.changed_type=="import"){
    this.itemsCollection = this.afs.collection<Log>('log', ref => ref.where('type', '==', 'import').where('timestamp', '<=', this.finDate).where('timestamp', '>=', this.startDate));
    this.items= this.itemsCollection.valueChanges();
    this.items.subscribe((item)=>{
          console.log(this.items)
          this.itemArray = item;
          this.itemList = this.itemArray;
          this.loadedItemList = this.itemArray;
          //loadingPopup.dismiss();
    })
    }
      if(this.changed_type=="export"){
        this.itemsCollection = this.afs.collection<Log>('log', ref => ref.where('type', '==', 'export').where('timestamp', '<=', this.finDate).where('timestamp', '>=', this.startDate));
        
        this.items= this.itemsCollection.valueChanges();
        this.items.subscribe((item)=>{
              console.log(this.items)
              this.itemArray = item;
              this.itemList = this.itemArray;
              this.loadedItemList = this.itemArray;
              //loadingPopup.dismiss();
        })
      }

      if(this.changed_type=="location_changed"){
      this.itemsCollection = this.afs.collection<Log>('log', ref => ref.where('type', '==', 'location_changed').where('timestamp', '<=', this.finDate).where('timestamp', '>=', this.startDate));
      
        this.items= this.itemsCollection.valueChanges();
      this.items.subscribe((item)=>{
          console.log(this.items)
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

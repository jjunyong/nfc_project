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
  SerialNum : string;
  type : string;
  timestamp : string;
}

@IonicPage()
@Component({
  selector: 'page-change-log',
  templateUrl: 'change-log.html',
})
export class ChangeLogPage {
  
  // items$ : Observable<Item[]>;
  // typeFilter$ : BehaviorSubject<string|null>;
  // timeFilter$ : BehaviorSubject<string|null>;
  
  // this.typeFilter$ = new BehaviorSubject(null);
  //   this.timeFilter$ = new BehaviorSubject(null);
  //   this.items$ = combineLatest(
  //     this.typeFilter$,
  //     this.timeFilter$
  //   ).pipe(
  //     switchMap(([type, time])=>
  //     afs.collection('log', ref=>{
  //       let query : firebase.firestore.CollectionReference | firebase.firebase.Query = ref;
  //       if (type) {query = query.where('type', '==', 'import')};
  //       if (time) {query = query.where('quantity', '>', '1000')};
  //       return query;
  //     }).valueChanges()
  //   )
  //   )

  // filterByType( type : string|null){
  //   this.typeFilter$.next(type)
  // }

  // filterByTime( time : string|null){
  //   this.timeFilter$.next(time);
  // }
  
  startDate : Date
  finDate : Date

  public itemsCollection: AngularFirestoreCollection<Log>; 
  public itemsCollection_2 : AngularFirestoreCollection<Log>;
 // public items_Imported_Collection : AngularFirestoreCollection<import>;


  itemList : any=[]; 
  itemArray : any = [];
  loadedItemList:  any=[]; 
  items : any = [];
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

    
    this.startDate=new Date();
    this.finDate=new Date()

    console.log(this.startDate);
    console.log(this.finDate);
    if(this.changed_type=="import"){
      
    this.itemsCollection = this.afs.collection<Log>('log', ref => ref.where('type', '==', 'import').where('timestamp', '<=', this.finDate));
    //this.itemsCollection_2 = this.afs.collection<Log>('log', ref => ref.where('quantity', '==', '500'));
    //this.itemsCollection_2 =this.afs.collection<Log>('log', ref => ref.where('timestamp', '>=', 'startDate'))
    //filterByTime(this.itemsCollection);
    //filterByType(this.itemsCollection);
    
    this.items= this.itemsCollection.valueChanges();
    
    console.log("testing",this.items)
   // this.items_2=this.itemsCollection_2.valueChanges();
   
    // const combinedList = combineLatest<any[]>(this.items, this.items_2).pipe(
    //   map(arr => arr.reduce((acc, cur) => acc.concat(cur))),
    // )
    this.items.subscribe((item)=>{
          console.log(this.items)
          this.itemArray = item;
          this.itemList = this.itemArray;
          this.loadedItemList = this.itemArray;
          //loadingPopup.dismiss();
    })
    }
      if(this.changed_type=="export"){
        this.itemsCollection = this.afs.collection<Log>('log', ref => ref.where('type', '==', 'export'));
        
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
        this.itemsCollection = this.afs.collection<Log>('log', ref => ref.where('type', '==', 'location_changed'));
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

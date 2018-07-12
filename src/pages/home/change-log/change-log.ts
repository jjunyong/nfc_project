import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { FireService } from '../../../../src/providers/FireService'
import { Observable, BehaviorSubject } from 'rxjs'
import { map, combineLatest, switchMap } from 'rxjs/operators'
import { ItemDetailPage } from '../stock-manage/item-detail/item-detail';
import { LoginPage } from '../../auth/login/login';
import { timestamp } from 'rxjs/operators/timestamp';
import { HomePage } from '../home';
import { GlobalVars } from '../../../providers/global';

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
    public fireService : FireService, private modalCtrl : ModalController,
    public global : GlobalVars) {

    this.changed_type=this.navParams.get('changed_type')
    this.startDate = this.navParams.get('startDate')
    this.finDate = this.navParams.get('finDate')
    
    // if(this.startDate==null){
    //   this.startDate.
    // }
    
    if((this.finDate==null)||(this.startDate==null)){
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

    // this.global.currentMessage.subscribe(message => this.show = message)
    this.global.changeMessage(false)
     
  }


    
    
    if(this.changed_type=="import"){
    this.itemsCollection = this.afs.collection<Log>('log', ref => ref.where('type', '==', 'import'));
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

  ionViewDidLoad() {
    console.log('ionViewDidLoad ChangeLogPage');
  }

  Fill_in(){
    console.log("fill-in")
    let modal = this.modalCtrl.create(FillPage);  //수정필요
    modal.present();
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

@Component({
  templateUrl: 'fill.html',
  selector: 'page-fill'
})
export class FillPage{

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
    public fireService : FireService, private modalCtrl : ModalController) {
     
  }
  Send(){

    this.changed_type;
    this.startDate=new Date(this.startDate);
    this.finDate=new Date(this.finDate)
    this.finDate.setHours(23);
    this.finDate.setMinutes(59);
    this.finDate.setSeconds(59);
    this.navCtrl.push('ChangeLogPage', {
      startDate : this.startDate,
      finDate : this.finDate,
      changed_type : this.changed_type
    })

  
  }
  
  // SerchTime(){
  //   //console.log(this.itemArray);
  //   console.log(this.changed_type);

 
  //   if(this.changed_type=="import"){
  //   this.itemsCollection = this.afs.collection<Log>('log', ref => ref.where('type', '==', 'import').where('timestamp', '<=', this.finDate).where('timestamp', '>=', this.startDate));
  //   this.items= this.itemsCollection.valueChanges();
  //   this.items.subscribe((item)=>{
  //         console.log(this.items)
  //         this.itemArray = item;
  //         this.itemList = this.itemArray;
  //         this.loadedItemList = this.itemArray;
  //         //loadingPopup.dismiss();
  //   })
  //   }
  //     if(this.changed_type=="export"){
  //       this.itemsCollection = this.afs.collection<Log>('log', ref => ref.where('type', '==', 'export').where('timestamp', '<=', this.finDate).where('timestamp', '>=', this.startDate));
        
  //       this.items= this.itemsCollection.valueChanges();
  //       this.items.subscribe((item)=>{
  //             console.log(this.items)
  //             this.itemArray = item;
  //             this.itemList = this.itemArray;
  //             this.loadedItemList = this.itemArray;
  //             //loadingPopup.dismiss();
  //       })
  //     }

  //     if(this.changed_type=="location_changed"){
  //     this.itemsCollection = this.afs.collection<Log>('log', ref => ref.where('type', '==', 'location_changed').where('timestamp', '<=', this.finDate).where('timestamp', '>=', this.startDate));
      
  //       this.items= this.itemsCollection.valueChanges();
  //     this.items.subscribe((item)=>{
  //         console.log(this.items)
  //         this.itemArray = item;
  //         this.itemList = this.itemArray;
  //         this.loadedItemList = this.itemArray;
  //         //loadingPopup.dismiss();
  //   })
  //   }

  //   this.navCtrl.push('ChangeLogPage',{
  //     items: this.items
  //   })
  



  // }
}

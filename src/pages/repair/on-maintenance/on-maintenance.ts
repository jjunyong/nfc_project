import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFirestore, AngularFirestoreCollection} from 'angularfire2/firestore'
import { LoadingController } from 'ionic-angular/components/loading/loading-controller';
import { GlobalVars } from '../../../providers/global';
import { AngularFireAuth} from 'angularfire2/auth'


interface userRepairLog {
  model: string,
  serialNum: string,
  title: string,
  writer: string,
  description: string;
  timestamp: Date;
}

interface RepairItem {
  model: string;
  serialNum: string;
  repairman: string;
  id: string;
  isToggled: boolean;
  startDate: Date;
  finDate: Date;
}


@IonicPage()
@Component({
  selector: 'page-on-maintenance',
  templateUrl: 'on-maintenance.html',
})
export class OnMaintenancePage {


  viewType: string = "Item";

  private usersRepairCollection: AngularFirestoreCollection<userRepairLog>;
  private itemsCollection: AngularFirestoreCollection<RepairItem>;

  repairlogList: any = [];
  repairlogArray: any = [];
  repairlogs: any = [];

  itemList: any = [];
  itemArray: any = [];
  loadedItemList: any = [];
  items: any = [];


  id: string;
  backgroundImage = "https://firebasestorage.googleapis.com/v0/b/prototype-d68e4.appspot.com/o/%EB%A9%94%EC%9D%B8%ED%8E%98%EC%9D%B4%EC%A7%802_%ED%88%AC%EB%AA%85.png?alt=media&token=b4bb27d8-9ce6-44b5-b979-a5d24c2401b2";

  constructor(public navCtrl: NavController, public navParams: NavParams, public afs: AngularFirestore, public afAuth:AngularFireAuth) {


    this.id = this.afAuth.auth.currentUser.uid


    this.usersRepairCollection = afs.collection('users').doc(this.id).collection<userRepairLog>('Repair_Log')
    this.repairlogs = this.usersRepairCollection.valueChanges()


    this.repairlogs.subscribe((userRepairLog) => {
      this.repairlogArray = userRepairLog;
      this.repairlogList = this.repairlogArray;
    });


    this.itemsCollection = afs.collection<RepairItem>('RepairItem');
    this.items = this.itemsCollection.valueChanges();

    this.items.subscribe((RepairItem) => {
      this.itemArray = RepairItem;
      this.itemList = this.itemArray;
      this.loadedItemList = this.itemArray;
    });
  }



//   this.repairlogArray.filter((eachItem)=>{
//     if((this.serialList.inArray(eachItem.serialNum, this.serialList) === -1)){
//       console.log(eachItem.serialNum)
//       console.log("내가 수리한 아이템")
//       return eachItem.serialNum;
//     }
//     else 
//       console.log("False?") 
//       return false;
// });

// console.log(this.serialList)

// }


//   private itemsCollection: AngularFirestoreCollection<RepairItem>; 



//   itemList : any=[]; 
//   itemArray : any = [];
//   loadedItemList:  any=[]; 
//   items : any = [];
//   id : string;
//   backgroundImage = "https://firebasestorage.googleapis.com/v0/b/prototype-d68e4.appspot.com/o/%EB%A9%94%EC%9D%B8%ED%8E%98%EC%9D%B4%EC%A7%802_%ED%88%AC%EB%AA%85.png?alt=media&token=b4bb27d8-9ce6-44b5-b979-a5d24c2401b2";
//   cardImage = "https://firebasestorage.googleapis.com/v0/b/prototype-d68e4.appspot.com/o/%EB%A9%94%EC%9D%B8%ED%8E%98%EC%9D%B4%EC%A7%802_%ED%88%AC%EB%AA%852.png?alt=media&token=78826653-cbd4-442d-9607-0b03983167b5"

//   constructor(public loadingCtrl: LoadingController,
//     public navCtrl: NavController,
//     public afs: AngularFirestore,
//     public navParams: NavParams,
//   public global : GlobalVars,
// public afAuth: AngularFireAuth) {

//     this.itemsCollection = afs.collection('RepairItem')
//     this.items= this.itemsCollection.valueChanges()


//    this.items.subscribe((RepairItem)=>{
//         this.itemArray = RepairItem;
//         this.itemList = this.itemArray.filter((eachItem)=>{
//           if(eachItem.isToggled===true){
//             return true;
//           }
//           else  
//             return false;
//         })

//         this.loadedItemList = this.itemArray;
//       });



    
//   }
//   ionViewWillEnter(){
//     // console.log('ionViewEnteredStockMangePage')
//     this.global.changeMessage(false);
//   }

//   openDetail(item){
//     this.navCtrl.push('RepairitemdetailPage',{
//       model: item.model,
//       id: item.id,
//       serialNum: item.serialNum,
//       repairman: item.repairman,
//       isToggled: item.isToggled,
//       startDate: item.startDate,
//       finDate: item.finDate
//     })

//   }
  
  
  
//   ionViewDidLoad() {
//     console.log('ionViewDidLoad OnMaintenancePage');
//   }

}

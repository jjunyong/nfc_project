import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFirestore, AngularFirestoreCollection} from 'angularfire2/firestore'
import { LoadingController } from 'ionic-angular/components/loading/loading-controller';

interface RepairItem{
  model: string;
  serialNum: string;
  repairman : string;
  id : string;
}

@IonicPage()
@Component({
  selector: 'page-on-maintenance',
  templateUrl: 'on-maintenance.html',
})
export class OnMaintenancePage {

  private itemsCollection: AngularFirestoreCollection<RepairItem>; 



  itemList : any=[]; 
  itemArray : any = [];
  loadedItemList:  any=[]; 
  items : any = [];
  id : string;

  constructor(public loadingCtrl: LoadingController,
    public navCtrl: NavController,
    public afs: AngularFirestore,
    public navParams: NavParams) {

    
    let loadingPopup = this.loadingCtrl.create({
      spinner: 'crescent', // icon style //
      content: '',
      duration: 1000
    });
    loadingPopup.present();

    this.itemsCollection = afs.collection('RepairItem')
    this.items= this.itemsCollection.valueChanges()


   this.items.subscribe((RepairItem)=>{
        this.itemArray = RepairItem;
        this.itemList = this.itemArray.filter((eachItem)=>{
          if(eachItem.isToggled===true){
            return true;
          }
          else  
            return false;
        })

        this.loadedItemList = this.itemArray;
        loadingPopup.dismiss();
      });



    console.log("현재 진행중ㅇ이 ㄴ아이템")

    
  }

  openDetail(item){
    this.navCtrl.push('RepairitemdetailPage',{
      model : item.model,
      id: item.id,
      serialNum: item.serialNum,
      repairman: item.repairman,
    })

  }
  
  
  
  ionViewDidLoad() {
    console.log('ionViewDidLoad OnMaintenancePage');
  }

}

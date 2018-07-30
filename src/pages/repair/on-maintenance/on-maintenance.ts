import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFirestore, AngularFirestoreCollection} from 'angularfire2/firestore'
import { LoadingController } from 'ionic-angular/components/loading/loading-controller';
import { GlobalVars } from '../../../providers/global';
import { AngularFireAuth} from 'angularfire2/auth'
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
  backgroundImage = "https://firebasestorage.googleapis.com/v0/b/prototype-d68e4.appspot.com/o/%EB%A9%94%EC%9D%B8%ED%8E%98%EC%9D%B4%EC%A7%802_%ED%88%AC%EB%AA%85.png?alt=media&token=b4bb27d8-9ce6-44b5-b979-a5d24c2401b2";
  cardImage = "https://firebasestorage.googleapis.com/v0/b/prototype-d68e4.appspot.com/o/%EB%A9%94%EC%9D%B8%ED%8E%98%EC%9D%B4%EC%A7%802_%ED%88%AC%EB%AA%852.png?alt=media&token=78826653-cbd4-442d-9607-0b03983167b5"

  constructor(public loadingCtrl: LoadingController,
    public navCtrl: NavController,
    public afs: AngularFirestore,
    public navParams: NavParams,
  public global : GlobalVars,
public afAuth: AngularFireAuth) {

    
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



    
  }
  ionViewWillEnter(){
    // console.log('ionViewEnteredStockMangePage')
    this.global.changeMessage(false);
  }

  openDetail(item){
    this.navCtrl.push('RepairitemdetailPage',{
      model: item.model,
      id: item.id,
      serialNum: item.serialNum,
      repairman: item.repairman,
      isToggled: item.isToggled,
      startDate: item.startDate,
      finDate: item.finDate
    })

  }
  
  
  
  ionViewDidLoad() {
    console.log('ionViewDidLoad OnMaintenancePage');
  }

}

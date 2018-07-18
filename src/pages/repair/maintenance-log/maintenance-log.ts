import { Component } from '@angular/core';
import { IonicPage, NavController, LoadingController } from 'ionic-angular';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { AlertController } from 'ionic-angular/components/alert/alert-controller';
import { GlobalVars } from '../../../providers/global';



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
  selector: 'page-maintenance-log',
  templateUrl: 'maintenance-log.html',
})

export class MaintenanceLogPage {

  private itemsCollection: AngularFirestoreCollection<RepairItem>;

  itemList: any = [];
  itemArray: any = [];
  loadedItemList: any = [];
  items: any = [];
  backgroundImage ="https://firebasestorage.googleapis.com/v0/b/prototype-d68e4.appspot.com/o/%EB%A9%94%EC%9D%B8%ED%8E%98%EC%9D%B4%EC%A7%802_%ED%88%AC%EB%AA%85.png?alt=media&token=b4bb27d8-9ce6-44b5-b979-a5d24c2401b2";
  cardImage = "https://firebasestorage.googleapis.com/v0/b/prototype-d68e4.appspot.com/o/%EB%A9%94%EC%9D%B8%ED%8E%98%EC%9D%B4%EC%A7%802_%ED%88%AC%EB%AA%852.png?alt=media&token=78826653-cbd4-442d-9607-0b03983167b5"

  constructor(public loadingCtrl: LoadingController,
    public navCtrl: NavController,
    public afs: AngularFirestore,
    public alertCtrl: AlertController,
    public global: GlobalVars
  ) {

    let loadingPopup = this.loadingCtrl.create({
      spinner: 'crescent', // icon style //
      content: '',
    });
    loadingPopup.present();

    this.itemsCollection = afs.collection<RepairItem>('RepairItem');
    this.items = this.itemsCollection.valueChanges();

    this.items.subscribe((RepairItem) => {
      this.itemArray = RepairItem;
      this.itemList = this.itemArray;
      this.loadedItemList = this.itemArray;
      loadingPopup.dismiss();
    });


    console.log(this.loadedItemList)
  }

  ionViewWillEnter() {
    console.log('ionViewEnteredRepairPage')
    this.global.changeMessage(false);
  }

  initializeItems() {
    this.itemList = this.loadedItemList;
  }

  getItems(searchbar) {
    // Reset items back to all of the items
    this.initializeItems();

    console.log(this.itemList)
    // set q to the value of the searchbar
    var q = searchbar.srcElement.value;
    // if the value is an empty string don't filter the items
    if (!q) {
      return;
    }
    this.itemList = this.itemList.filter((v) => {
      if (v.model && q) {
        if (v.model.toLowerCase().indexOf(q.toLowerCase()) > -1) {
          return true;
        }
        return false;
      }
    });

    console.log(q, this.itemList.length);
  }



  manage() {
    let confirm = this.alertCtrl.create({
      title: '새로운 정비 아이템을 추가하겠습니까?',
      message: '새로운 정비 아이템을 추가하려면 Yes를 클릭하세요',
      buttons: [
        {
          text: 'Yes',
          handler: () => {
            this.openAdd()
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


  openAdd() {
    this.navCtrl.push('AddrepairPage')
  }

  openDetail(item) {
    this.navCtrl.push('RepairitemdetailPage', {
      model: item.model,
      id: item.id,
      serialNum: item.serialNum,
      repairman: item.repairman,
      isToggled: item.isToggled,
      startDate: item.startDate,
      finDate: item.finDate
    })
  }
}

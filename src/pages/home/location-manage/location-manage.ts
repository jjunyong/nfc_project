
import firebase from 'firebase';
import { IonicPage } from 'ionic-angular';
import { Component } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';
import { AlertController } from 'ionic-angular/components/alert/alert-controller';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { NavParams } from 'ionic-angular/navigation/nav-params';
import { GlobalVars } from '../../../providers/global';
import { BarcodeScanner } from '@ionic-native/barcode-scanner'



interface Item {
  location1: any;
  location2: any;
  model: string;
  quantity: number;
}

@IonicPage()
@Component({
  selector: 'page-location-manage',
  templateUrl: 'location-manage.html',
})


export class LocationManagePage {
  private itemsCollection: AngularFirestoreCollection<Item>;
  itemList: any = [];
  itemArray: any = [];
  loadedItemList: any = [];

  itemList1: any = [];
  itemList2: any = [];
  itemArray2: any = [];


  items: any = [];
  location: string;
  itemgetList: any = [];
  payload: string;
  seperate: any[];

  location1: string;
  location2: string;

  location_origin: string;

  constructor(public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
    public navCtrl: NavController,
    private afs: AngularFirestore,
    public navParams: NavParams,
    public global: GlobalVars
  ) {



    this.location_origin = null; //초기화
    this.payload = null;

    this.payload = this.navParams.get('payload')
    this.location_origin = this.navParams.get("location_origin")

   console.log(this.location_origin, "from QR Page")

  
      let loadingPopup = this.loadingCtrl.create({
        spinner: 'crescent', // icon style //
        content: '',
        duration: 1000
      });
      loadingPopup.present();

      this.itemsCollection = afs.collection<Item>('item');
      this.items = this.itemsCollection.valueChanges();

      this.items.subscribe((item) => {
        this.itemArray = item;
        this.itemList = this.itemArray;
        this.loadedItemList = this.itemArray;
        loadingPopup.dismiss();
      })

     
    if (this.location_origin != null) {

      this.afs.collection('location_map').doc(this.location_origin).valueChanges()
        .subscribe((location_info: any) => {

          this.location1 = location_info.location1;
          this.location2 = location_info.location2;

          console.log(this.location1);
          console.log(this.location2);

          this.goTo2();
        })

    }

    else if (this.payload != null) {

      this.afs.collection('location_map').doc(`${this.payload}`).valueChanges()
        .subscribe((location_info: any) => {
          this.location1 = location_info.location1;
          this.location2 = location_info.location2;


          console.log(this.location1);
          console.log(this.location2);
          this.goTo2()

        })


    }
 
  }

  ionViewWillEnter() {
    // console.log('ionViewEnteredStockMangePage')
    this.global.changeMessage(false);
  }


  goTo1() {

    if (this.location2 === "null") {
      this.itemsCollection = this.afs.collection<Item>('item', ref => ref.where('location1', '==', this.location1))
    } //location2 옵션 변경시 바뀌게 하는 조건
    else {
      this.itemsCollection = this.afs.collection<Item>('item', ref => ref.where('location1', '==', this.location1).where('location2', '==', this.location2))
    }

    this.items = this.itemsCollection.valueChanges();
    this.items.subscribe((item) => {
      console.log(this.items)
      this.itemArray = item;
      this.itemList = this.itemArray;
      this.loadedItemList = this.itemArray;

    })
  }


  goTo2() {
    if (this.location1 === "null") {
      this.itemsCollection = this.afs.collection<Item>('item', ref => ref.where('location2', '==', this.location2))
    } //location2 옵션 변경시 바뀌게 하는 조건
    else {
      this.itemsCollection = this.afs.collection<Item>('item', ref => ref.where('location1', '==', this.location1).where('location2', '==', this.location2))
    }

    this.items = this.itemsCollection.valueChanges();
    this.items.subscribe((item) => {
      console.log(this.items)
      this.itemArray = item;
      this.itemList = this.itemArray;
      this.loadedItemList = this.itemArray;

    })
  }



  openDetail(item) {
    this.navCtrl.push('ItemDetailPage', {
      id: item.id,
      name: item.name,
      location1: item.location1,
      location2: item.location2,
      quantity: item.quantity
    })
  }


}




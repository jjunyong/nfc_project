import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { FireService } from '../../providers/FireService';


interface Item{
  email: string
  employee_number: string
  name: string
  phone: string
  uid: string
  role: boolean
}

@IonicPage()
@Component({
  selector: 'page-admin',
  templateUrl: 'admin.html',
})
export class AdminPage {

  public itemsCollection: AngularFirestoreCollection<Item>; 
  items : any = [];
  itemList : any=[]; 
  itemArray : any = [];
  loadedItemList:  any=[]; 
  
  auth: string;

  constructor(public afs:AngularFirestore, public navCtrl: NavController, public navParams: NavParams,
  public fireService : FireService, public loadingCtrl: LoadingController, private alertCtrl : AlertController) {
   
   
    this.auth = "권한";

    
    let loadingPopup = this.loadingCtrl.create({
      spinner: 'crescent', // icon style //
      content: '',
    });
    loadingPopup.present();

    this.itemsCollection = afs.collection('users');
    this.items= this.itemsCollection.valueChanges();
    
    this.items.subscribe((item)=>{
      this.itemArray = item;
      this.itemList = this.itemArray;
      this.loadedItemList = this.itemArray;
      loadingPopup.dismiss();
    })
  
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AdminPage');
  }

  
}

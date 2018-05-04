import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ViewController } from 'ionic-angular';
// import { FirebaseListObservable, AngularFireDatabase } from 'angularfire2/database-deprecated';
// import 'rxjs/add/operator/map'; // you might need to import this, or not depends on your setup
import { ActionSheetController } from 'ionic-angular';
import { AlertController } from 'ionic-angular/components/alert/alert-controller';
import { initializeApp } from 'firebase/app';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { FirebaseListObservable } from 'angularfire2/database-deprecated';

interface Item{
  location: string;
  name: string;
  quantity : number;
}


@IonicPage()
@Component({
  selector: 'page-stock-manage',
  templateUrl: 'stock-manage.html',
})
export class StockManagePage {

  private itemsCollection: AngularFirestoreCollection<Item>; 
  itemList : any=[]; 
  itemArray : any = [];
  loadedItemList:  any=[]; 
  items : any = [];

  constructor( public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
    public navCtrl: NavController,
    private afs: AngularFirestore
  ) {

    let loadingPopup = this.loadingCtrl.create({
      spinner: 'crescent', // icon style //
      content: '',
    });
    loadingPopup.present();

    this.itemsCollection = afs.collection<Item>('item');
    this.items= this.itemsCollection.valueChanges();
    
    this.items.subscribe((item)=>{
      this.itemArray = item;
      this.itemList = this.itemArray;
      this.loadedItemList = this.itemArray;
      loadingPopup.dismiss();
    })
    

    console.log(this.loadedItemList)

    // this.itemList
    //   .subscribe( (value) =>{
    //     this.itemList = value;
    //     this.loadedItemList = value;
    //   })
      
    // var db = firebase.firestore();
    // this.itemList = [];
    // db.collection("item").onSnapshot((snap)=>{
    //   snap.forEach((doc)=>{
    //     this.itemList.push(doc.data());
    //   })
    // })

    // this.contact = afDB.list('/contact');
    // this.contact.subscribe(contact => {
    //       this.contactArray = contact;
    //       this.contactList = this.contactArray; // for ngFor loop 
    //       this.loadedContactList = this.contactArray; 
    //       loadingPopup.dismiss()
    // })
          
}

ionViewWillEnter(){
  console.log('ionViewEnteredStockMangePage')
}

initializeItems(){
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
    if(v.name && q) {
      if (v.name.toLowerCase().indexOf(q.toLowerCase()) > -1) {
        return true;
      }
      return false;
    }
  });

  console.log(q, this.itemList.length);

}

manage(){  
    let confirm = this.alertCtrl.create({
      title: '새로운 아이템을 추가하겠습니까?',
      message: '새로운 아이템을 추가하려면 Yes를 클릭하세요',
      buttons: [
        {
          text: 'Yes',
          handler: () => {
            this.openNextPage()
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

openNextPage(){
  this.navCtrl.push('ManagePage')
}

openDetail(item){
  this.navCtrl.push('ItemDetailPage',{
    code : item.code,
    name : item.name,
    location : item.location,
    quantity : item.quantity
  })
}
}






import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
// import { FirebaseListObservable, AngularFireDatabase } from 'angularfire2/database-deprecated';
// import 'rxjs/add/operator/map'; // you might need to import this, or not depends on your setup
import firebase from 'firebase'


@IonicPage()
@Component({
  selector: 'page-stock-manage',
  templateUrl: 'stock-manage.html',
})
export class StockManagePage {
  // contact: FirebaseListObservable<any[]>;
  contactArray : any=[]; 
  itemList : any=[]; // store firebase data to local array
  loadedItemList:  any=[]; 

  
  constructor( public loadingCtrl: LoadingController) {

    let loadingPopup = this.loadingCtrl.create({
      spinner: 'crescent', // icon style //
      content: '',
      duration: 1000
    });
    loadingPopup.present();

    var db = firebase.firestore();
    db.collection("item").onSnapshot((snap)=>{
      snap.forEach((doc)=>{
        this.itemList.push(doc.data());
      })
    })

    this.loadedItemList = this.itemList;
    // this.contact = afDB.list('/contact');
    // this.contact.subscribe(contact => {
    //       this.contactArray = contact;
    //       this.contactList = this.contactArray; // for ngFor loop 
    //       this.loadedContactList = this.contactArray; 
    //       loadingPopup.dismiss()
    // })
          
}


initializeItems(){
  this.itemList = this.loadedItemList;
}

getItems(searchbar) {
  // Reset items back to all of the items
  this.initializeItems();
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

}

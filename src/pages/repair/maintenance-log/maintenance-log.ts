import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { FireService } from '../../../app/FireService';

/**
 * Generated class for the MaintenanceLogPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

 
@IonicPage()
@Component({
  selector: 'page-maintenance-log',
  templateUrl: 'maintenance-log.html',
})

export class MaintenanceLogPage { 
  itemList : any=[]; 
  itemArray : any = [];
  loadedItemList:  any=[]; 
  items : any = [];


  constructor( public loadingCtrl: LoadingController,
    public navCtrl: NavController,
    private afs: AngularFirestore
  ) {

    let loadingPopup = this.loadingCtrl.create({
      spinner: 'crescent', // icon style //
      content: '',
    });
    loadingPopup.present();

    this.afs.collection('item',ref => ref.where('isRepairable', '==', true)).valueChanges()
      .subscribe((item)=>{
        this.itemArray = item;
        this.itemList = this.itemArray;
        this.loadedItemList = this.itemArray;
        loadingPopup.dismiss();
      });
    

    console.log(this.loadedItemList)
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

  openLog(item){
    this.navCtrl.push('LogDetailPage')
  }


}

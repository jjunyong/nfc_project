import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { AngularFirestore } from 'angularfire2/firestore'
import { Observable } from 'rxjs/Observable';
import firebase from 'firebase'
@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {
  viewType: string = "Menu";
  stock_card: any[] = [];
  items: any[] = [];
  
  

  constructor(public navCtrl: NavController, public DB: AngularFirestore,public navParams: NavParams,
    public loadingCtrl: LoadingController){
      let loadingPopup = this.loadingCtrl.create({
        spinner: 'crescent',
        content: '',
        duration: 1000
      });
      loadingPopup.present();

      var db = firebase.firestore();
      // this.items = this.DB.collection('post', ref=> ref.where('type','==','notice')).valueChanges();
      db.collection('list').where("type","==","notice")
      .onSnapshot((snap)=>{
        snap.forEach((doc)=>{
          this.items.push(doc.data());
        })
      })
  }

  openLog(){
      this.navCtrl.push('ChangeLogPage'); 
  }

  openManage(){
    this.navCtrl.push('StockManagePage')
  }

  locationManage(){
    this.navCtrl.push('LocationManagePage')
  }

  // goToDetail(itemId){
  //     this.navCtrl.push('Detail3Page',{itemId:itemId}); 
  // }

}

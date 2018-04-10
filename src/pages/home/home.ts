import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { AngularFirestore } from 'angularfire2/firestore';
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

      db.collection('stock_card').where("type","==","stock_card")
      .onSnapshot((snap)=>{
        snap.forEach((doc)=>{
          this.stock_card.push(doc.data());
        })
      })

      db.collection('list').where("type","==","notice")
      .onSnapshot((snap)=>{
        snap.forEach((doc)=>{
          this.items.push(doc.data());
        })
      })
  }

  openLatest(){
      this.navCtrl.push('LatestStockPage'); 
  }

  openManage(){
    this.navCtrl.push('StockManagePage')
  }

  // goToDetail(itemId){
  //     this.navCtrl.push('Detail3Page',{itemId:itemId}); 
  // }

}

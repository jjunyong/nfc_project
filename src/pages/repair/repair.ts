import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { AngularFirestore } from 'angularfire2/firestore';
import firebase from 'firebase'


@IonicPage()
@Component({
  selector: 'page-repair',
  templateUrl: 'repair.html'
})

export class RepairPage {
  viewType: string = "Menu";
  repair_card: any[] = [];
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

      db.collection('repair_card').where("type","==","repair_card")
      .onSnapshot((snap)=>{
        snap.forEach((doc)=>{
          this.repair_card.push(doc.data());
        })
      })

      db.collection('list').where("type","==","notice")
      .onSnapshot((snap)=>{
        snap.forEach((doc)=>{
          this.items.push(doc.data());
        })
      })
  }

  openList(categoryId){
      this.navCtrl.push('List3Page',{categoryId:categoryId}); 
  }

  goToDetail(itemId){
      this.navCtrl.push('Detail3Page',{itemId:itemId}); 
  }

}

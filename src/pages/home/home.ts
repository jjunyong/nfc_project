import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { AngularFirestore } from 'angularfire2/firestore'
import { Observable } from 'rxjs/Observable';
import firebase from 'firebase'
import { ActionSheetController } from 'ionic-angular';
import { AlertController } from 'ionic-angular/components/alert/alert-controller';
import { ViewController } from 'ionic-angular';


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
    public loadingCtrl: LoadingController, public alertCtrl: AlertController){
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

  manage(){  
    let confirm = this.alertCtrl.create({
      title: '알림',
      message: '공지를 추가하시겠습니까?',
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
  this.navCtrl.push('WritenoticePage')
}

}

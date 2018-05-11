import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { AngularFirestore } from 'angularfire2/firestore'
import { Observable } from 'rxjs/Observable';
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
  items: any;
  
  

  constructor(public navCtrl: NavController, public DB: AngularFirestore,public navParams: NavParams,
    public loadingCtrl: LoadingController, public alertCtrl: AlertController,
    public afs : AngularFirestore){
      let loadingPopup = this.loadingCtrl.create({
        spinner: 'crescent',
        content: '',
        duration: 1000
      });
      loadingPopup.present();

      afs.collection('list', ref => ref.where('type','==','notice')).valueChanges()
        .subscribe(notice => this.items = notice)
      
      console.log(this.items)
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

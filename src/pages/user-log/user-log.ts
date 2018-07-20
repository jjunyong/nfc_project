
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, LoadingController } from 'ionic-angular';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';

interface userRepairLog {
  model: string,
  serialNum: string,
  title: string,
  writer: string,
  description: string;
  timestamp: Date;
}

interface userStockLog {
 model: string,
 quantity: string,
 changed_quantity: string,
 timestamp: Date,
 type: string
}

@IonicPage()
@Component({
  selector: 'page-user-log',
  templateUrl: 'user-log.html',
})
export class UserLogPage {

  private usersRepairCollection: AngularFirestoreCollection<userRepairLog>;
  private usersStockCollection: AngularFirestoreCollection<userStockLog>;


  repairlogList: any = [];
  repairlogArray: any = [];
  repairlogs: any = [];

  stocklogList: any = [];
  stocklogArray: any = [];
  stocklogs: any = [];

  id: string;
  backgroundImage = "https://firebasestorage.googleapis.com/v0/b/prototype-d68e4.appspot.com/o/%EB%A9%94%EC%9D%B8%ED%8E%98%EC%9D%B4%EC%A7%802_%ED%88%AC%EB%AA%85.png?alt=media&token=b4bb27d8-9ce6-44b5-b979-a5d24c2401b2";

  constructor(public navCtrl: NavController, public navParams: NavParams, public loadingCtrl: LoadingController, public afs: AngularFirestore) {


    this.id = this.navParams.get('uid');



    let loadingPopup = this.loadingCtrl.create({
      spinner: 'crescent', // icon style //
      content: '',
    });
    loadingPopup.present();

    this.usersRepairCollection = afs.collection('users').doc(`${this.id}`).collection<userRepairLog>('Repair_Log')
    this.repairlogs = this.usersRepairCollection.valueChanges()


    this.repairlogs.subscribe((userRepairLog) => {
      this.repairlogArray = userRepairLog;
      this.repairlogList = this.repairlogArray;
      loadingPopup.dismiss();
    });



    this.usersStockCollection = afs.collection('users').doc(`${this.id}`).collection<userStockLog>('Stock_Log')
    this.stocklogs = this.usersStockCollection.valueChanges()


    this.stocklogs.subscribe((userStockLog) => {
      this.stocklogArray = userStockLog;
      this.stocklogList = this.stocklogArray;
      loadingPopup.dismiss();
    });

  }

}

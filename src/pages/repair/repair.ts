import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { AngularFirestore } from 'angularfire2/firestore';
import firebase from 'firebase'
import { GlobalVars } from '../../providers/global';


@IonicPage()
@Component({
  selector: 'page-repair',
  templateUrl: 'repair.html'
})

export class RepairPage {
  viewType: string = "Menu";
  repair_card: any[] = [];
  items: any[] = [];



  constructor(public navCtrl: NavController, public DB: AngularFirestore, public navParams: NavParams,
    public loadingCtrl: LoadingController, public global : GlobalVars) {

    var db = firebase.firestore();

    db.collection('list').where("type", "==", "notice")
      .onSnapshot((snap) => {
        snap.forEach((doc) => {
          this.items.push(doc.data());
        })
      })
  }


  ionViewWillEnter(){
    this.global.changeMessage(true);
  }
  openLog() {
    this.navCtrl.push('MaintenanceLogPage');
  }

  openOnMaintenance() {
    this.navCtrl.push('OnMaintenancePage')
  }

}

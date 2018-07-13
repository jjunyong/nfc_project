import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { AngularFirestore } from 'angularfire2/firestore'
import { AlertController } from 'ionic-angular/components/alert/alert-controller';
import { AngularFireAuth } from 'angularfire2/auth';
import { AuthData } from '../../providers/auth-data';
import { GlobalVars } from '../../providers/global';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {

  viewType: string = "Menu";
  stock_card: any[] = [];
  items: any;
  login;
  // show
  backgroundImage="https://firebasestorage.googleapis.com/v0/b/prototype-d68e4.appspot.com/o/%EB%A9%94%EC%9D%B8%ED%8E%98%EC%9D%B4%EC%A7%802_%ED%88%AC%EB%AA%85.png?alt=media&token=b4bb27d8-9ce6-44b5-b979-a5d24c2401b2";

  constructor(public navCtrl: NavController, public DB: AngularFirestore, public navParams: NavParams,
    public loadingCtrl: LoadingController, public alertCtrl: AlertController,
    public afs: AngularFirestore, public afAuth: AngularFireAuth, public auth: AuthData,
    public global: GlobalVars) {

    // this.global.changeMessage(true);
    this.global.currentMessage.subscribe(message => console.log(message))
    // this.global.changeMessage(true)



    this.afAuth.authState.subscribe((user) => {
      if (user) {
        this.login = true;
      }
      else {
        this.login = false;
      }
    })

    if (this.login)
      console.log(afAuth.auth.currentUser.email)

    afs.collection('stock_notice').valueChanges()
      .subscribe(notice => this.items = notice)

    console.log(this.items)
  }

  ionViewWillEnter() {
    this.global.changeMessage(true);
  }

  openLog() {
    this.navCtrl.push('ChangeLogPage');
  }

  openManage() {
    this.navCtrl.push('StockManagePage')
  }

  locationManage() {
    this.navCtrl.push('LocationManagePage')
  }

  manage() {
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

  openNextPage() {
    this.navCtrl.push('WriteStockNoticePage')
  }
  openNoticeDetailPage(item) {
    this.navCtrl.push('StockNoticeDetailPage', {
      content: item.content
    });
  }

}

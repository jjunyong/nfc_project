import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { GlobalVars } from '../../../providers/global';
import {AngularFireAuth} from 'angularfire2/auth'
/**
 * Generated class for the WritenoticePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
interface User{
  name : string;
  uid : string;
}

@IonicPage()
@Component({
  selector: 'page-write-stock-notice',
  templateUrl: 'write-stock-notice.html',
})
export class WriteStockNoticePage {

  title: string;
  writer: string;
  content: string;

  user : any = [];
  userList : any=[]; 
  userArray : any = [];
  loadedUserList:  any=[]; 
  private itemsCollection: AngularFirestoreCollection<User>;

  constructor(public afs: AngularFirestore, public navCtrl: NavController, public navParams: NavParams,
    public global: GlobalVars, public alertCtrl: AlertController, public afAuth : AngularFireAuth) {
      
      
      // this.afs.collection<User>('users', ref=>ref.where("uid", "==", this.afAuth.auth.currentUser.uid)).valueChanges()
      // .subscribe((user : any)=>{
      //   this.userArray = user;
      //   this.userList = this.userArray;
      //   this.loadedUserList = this.userArray;
      // })
  
  
    }

  ionViewDidLoad() {
    console.log('ionViewDidLoad WritestocknoticePage');
    this.global.changeMessage(false);
  }

  confirm() {
    console.log(this.afAuth.auth.currentUser.uid)
    //this.itemsCollection = this.afs.collection<Log>('log', ref => ref.where('type', '==', 'import'));
  
    if (this.title == null||this.content == null||this.writer==null) {
      let alert = this.alertCtrl.create({
        title: '빈 내용을 입력하세요',
        buttons: ['OK']
      });
      alert.present();
    }
    else {
  
      this.afs.collection('stock_notice').add({
        title: this.title,
        writer: this.writer,
        content: this.content,
        timestamp: new Date() 
      })
      this.navCtrl.pop();
    }
    
  }

}

import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController, ToastController } from 'ionic-angular';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { AngularFireAuth } from 'angularfire2/auth';
import { FireService } from '../../providers/FireService';
import { Observable } from 'rxjs';
import { ViewController } from 'ionic-angular/navigation/view-controller';


interface User {
  email: string
  employee_number: string
  name: string
  phone: string
  uid: string
  role: boolean
  thumbnail: string
}


@IonicPage()
@Component({
  selector: 'page-admin',
  templateUrl: 'admin.html',
})
export class AdminPage {

  userinfo: string;

  public itemsCollection: AngularFirestoreCollection<User>;
  items: any = [];
  itemList: any = [];
  itemArray: any = [];
  loadedItemList: any = [];

  authoption: string;
  user: Observable<User>;


  constructor(public afs: AngularFirestore, public navCtrl: NavController, public navParams: NavParams,
    public fireService: FireService, public loadingCtrl: LoadingController, private alertCtrl: AlertController,
    public afAuth: AngularFireAuth, public viewCtrl: ViewController, public toast: ToastController) {



   // var admin = require("firebase-admin");

    // var serviceAccount = require("../../../prototype-d68e4-firebase-adminsdk-ehk2t-8bc1d6cf15.json");
 
    // admin.initializeApp({
    //   credential: admin.credential.cert(serviceAccount),
    //   databaseURL: 'https://prototype-d68e4.firebaseio.com'
    // });


    this.authoption = "권한";


    let loadingPopup = this.loadingCtrl.create({
      spinner: 'crescent', // icon style //
      content: '',
    });
    loadingPopup.present();

    this.itemsCollection = afs.collection('users');
    this.items = this.itemsCollection.valueChanges();

    this.items.subscribe((item) => {
      this.itemArray = item;
      this.itemList = this.itemArray;
      this.loadedItemList = this.itemArray;
      loadingPopup.dismiss();
    })
  }

  delete(item) {

    this.userinfo = item.uid


    let confirm = this.alertCtrl.create({
      title: '정말로 회원 정보를 삭제하시겠습니까?',
      message: '아이템을 삭제하시려면 Yes를 클릭하세요',
      buttons: [
        {
          text: 'Yes',
          handler: () => {

            this.afs.collection('users').doc(this.userinfo).delete().then(() => {


              let toast = this.toast.create({
                message: "성공적으로 삭제하였습니다.",
                duration: 2000,
                position: "bottom"
              });
              toast.present();

            }).catch(function (error) {
              console.error("삭제에 실패하였습니다. ", error);
            });
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


  ionViewDidLoad() {
    console.log('ionViewDidLoad AdminPage');
  }


}

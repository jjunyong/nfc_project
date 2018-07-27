import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController, ToastController } from 'ionic-angular';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { AngularFireAuth } from 'angularfire2/auth';
import { FireService } from '../../providers/FireService';
import { Observable } from 'rxjs';
import { ViewController } from 'ionic-angular/navigation/view-controller';
import { User } from '../../form/user'



// interface User {
//   email: string
//   employee_number: string
//   name: string
//   phone: string
//   uid: string
//   role: Roles
//   thumbnail: string
// }


@IonicPage()
@Component({
  selector: 'page-admin',
  templateUrl: 'admin.html',
})
export class AdminPage {

  userinfo: string;
  id: string;

  // public itemsCollection: AngularFirestoreCollection<User>;
  // items: any = [];
  // itemList: any = [];
  // itemArray: any = [];
  // loadedItemList: any = [];

  authoption: string = "subscriber"
  users;
  backgroundImage="https://firebasestorage.googleapis.com/v0/b/prototype-d68e4.appspot.com/o/%EB%A9%94%EC%9D%B8%ED%8E%98%EC%9D%B4%EC%A7%802_%ED%88%AC%EB%AA%85.png?alt=media&token=b4bb27d8-9ce6-44b5-b979-a5d24c2401b2";


  constructor(public afs: AngularFirestore, public navCtrl: NavController, public navParams: NavParams,
    public fireService: FireService, public loadingCtrl: LoadingController, private alertCtrl: AlertController,
    public afAuth: AngularFireAuth, public viewCtrl: ViewController, public toast: ToastController) {

    this.afs.collection<User>('users').valueChanges()
      .subscribe((users)=>{
        this.users = users;
      })

    // this.itemsCollection = afs.collection('users');
    // this.items = this.itemsCollection.valueChanges();

    // this.items.subscribe((item) => {
      // this.itemArray = item;
      // this.itemList = this.itemArray;
      // this.loadedItemList = this.itemArray;
    // })



  }
  


  delete(item) {

    event.stopPropagation(); 

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

  profile(item) {
    
    console.log(item.uid);

    this.navCtrl.push('UserLogPage', {
     uid : item.uid,
    }
    )
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AdminPage');
  }

  updateRole(user, role){
    this.afs.collection('users').doc(user.uid).update({
      role : role
    })
  }


}

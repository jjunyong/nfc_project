import { Component, ViewChild } from '@angular/core';
import { Platform, Nav, ToastController, AlertController, PopoverController, ModalController, ViewController, NavController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AngularFirestore } from 'angularfire2/firestore';
import { GlobalVars } from '../providers/global';
import { BarcodeScanner } from '@ionic-native/barcode-scanner'
import { AuthService } from '../providers/auth.service';
import { User } from '../form/user';


@Component({
  selector: 'ion-app',
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  rootPage: any = 'MainPage';
  pages: Array<{ title: string, component: any }>;
  authUser: any;
  testCheckboxOpen: boolean;
  testCheckboxResult;
  requests: any;
  show: boolean;
  loggedIn;

  qrData = null;
  createdCode = null;
  scannedCode = null;

  private masterEmail: string = "admin@palmCLOUD.co.kr";
  public masterSwitch: boolean = false;



  constructor(public platform: Platform, public statusBar: StatusBar,
    public splashScreen: SplashScreen,
    public auth: AuthService, public toast: ToastController, public alertCtrl: AlertController,
    public afs: AngularFirestore, public popoverCtrl: PopoverController, public modalCtrl: ModalController,
    public global: GlobalVars, private barcodeScanner: BarcodeScanner
  ) {

    this.auth.user.subscribe((user) => {
      if (user) {
        this.loggedIn = true;
      }
      else {
        this.loggedIn = false;
      }
    })

    this.global.currentMessage.subscribe(message => this.show = message)

    // this.auth.user.subscribe((auth) => {
    //   console.log(auth.email)
    //   if (auth.email === this.masterEmail) {
    //     this.masterSwitch = true;
    //   }
    // })


    
    //   this.afs.collection('users').doc(auth.uid).valueChanges()
    //     .subscribe((user: any)=>{
    //       console.log(user)
    //       this.user_thumbnail = user.thumbnail;
    //     })
    // })



    this.initializeApp();
    this.pages = [
      // { title: '로그인', component: "MainPage" },
      { title: '재고관리', component: 'HomePage' },
      { title: '정비관리', component: "RepairPage" },
      // { title: 'QR-Code', component: "QrcodePage" },
      { title: 'My profile', component: "ProfilePage" }
      // {title:'app1', component:"Category1Page"},
      // {title:'NFC', component:"NfcPage"},
      // {title:'Timeline',component:'TimelinePage'}
    ];
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    if (this.loggedIn) {
      this.nav.setRoot(page.component);
    }
    else {
      this.showAlert();
    }
  }

  DologIn() {
    this.nav.push('LoginPage');
    // let modal = this.modalCtrl.create(LoginSelectPage);
    // modal.present();
  }

  logout() {
    this.auth.logout().then(() => {
      let toast = this.toast.create({
        message: "로그아웃 되었습니다",
        duration: 2000,
        position: "bottom"
      });
      toast.present();
      this.nav.setRoot('MainPage');
    });

  }

  // requestAuthorization() {

  //   let alert = this.alertCtrl.create();
  //   alert.setTitle('원하는 권한을 신청하세요');
  //   alert.addInput({
  //     type: 'checkbox',
  //     label: 'admin',
  //     value: 'admin'
  //   });
  //   alert.addInput({
  //     type: 'checkbox',
  //     label: 'editor',
  //     value: 'editor'
  //   });

  //   alert.addButton('취소');
  //   alert.addButton({
  //     text: '확인',
  //     handler: data => {

  //       let user_id = this.afAuth.auth.currentUser.uid;

  //       console.log('Checkbox data:', data);
  //       this.testCheckboxOpen = false;
  //       this.testCheckboxResult = data;
  //       this.afs.collection('request').doc(user_id).set({
  //         uid: user_id,
  //         role: {
  //           admin: data[0] == 'admin' ? true : false,
  //           editor: data[1] == 'editor' ? true : false
  //         }
  //       }).then(() => {
  //         let toast = this.toast.create({
  //           message: "권한이 신청되었습니다",
  //           duration: 2000,
  //           position: "bottom"
  //         });
  //         toast.present();
  //       })
  //     }
  //   });
  //   alert.present().then(() => {
  //     this.testCheckboxOpen = true;
  //   })
  // }

  // approveAuthorization() {
  //   this.nav.push(AuthorizationPage);
  // }

  openStock() {
    if (this.loggedIn) {
      this.nav.setRoot('HomePage');
    }
    else {
      this.showAlert();
    }
  }

  openRepair() {
    if (this.loggedIn) {
      this.nav.setRoot('RepairPage');
    }
    else {
      this.showAlert();
    }
  }
  openMain() {
    this.nav.setRoot('MainPage');
  }
  openAdmin() {
    if (this.loggedIn) {
      this.nav.setRoot('AdminPage');
    }
    else {
      this.showAlert();
    }
  }

  showAlert() {
    const alert = this.alertCtrl.create({
      title: '로그인이 필요한 서비스입니다',
      subTitle: 'Get started을 눌러 지금 바로 가입하세요!',
      buttons: ['OK']
    });
    alert.present();
  }
  qrPage() {

    this.barcodeScanner.scan().then(barcodeData => {
      this.scannedCode = barcodeData.text;

      this.nav.push('LocationManagePage', {
        location_origin: this.scannedCode
      })

    }, (err) => {
      console.log('Error : ', err)
    });

    //testing qr code
    // this.scannedCode=1
    // this.navCtrl.push('LocationManagePage',{
    //   location_origin : this.scannedCode
    // })

  }
  openProfile() {
    if (this.loggedIn) {
      this.nav.setRoot('ProfilePage');
    }
    else {
      this.showAlert();
    }
  }

}


// @Component({
//   selector: 'page-login-select',
//   templateUrl: 'login-select.html'
// })
// export class LoginSelectPage{

//   public backgroundImage : any = "https://firebasestorage.googleapis.com/v0/b/prototype-d68e4.appspot.com/o/%EB%A9%94%EC%9D%B8%ED%8E%98%EC%9D%B4%EC%A7%80.jpg?alt=media&token=9e7f9e83-b6e6-4ea3-abd5-dfb2b8d7e5a4";

//   constructor(public authData : AuthData, public navCtrl : NavController, public viewCtrl:ViewController){
//   }

//   dismiss(){   //자기 자신을 끄게 해야 한다. ViewController를 이용하여
//     this.viewCtrl.dismiss();
//   }


//   googleLogin() {
//     // this.afAuth.auth.signInWithPopup(new auth.GoogleAuthProvider());
//     this.authData.googleLogin().then(()=>{
//       this.navCtrl.setRoot('MainPage');
//     });
//   }

//   loginWithEmail() {
//     this.navCtrl.push('LoginPage');
//   }


// }

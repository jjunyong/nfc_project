import { Component, ViewChild } from '@angular/core';
import { Platform, Nav, ToastController, AlertController, PopoverController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AngularFireAuth } from 'angularfire2/auth';
import { EMAIL_VALIDATOR } from '@angular/forms/src/directives/validators';
import { AuthData } from '../providers/auth-data';
import { AngularFirestore } from 'angularfire2/firestore';
import { AuthorizationPage } from './authorization/authorization';
import { subscribeOn } from 'rxjs/operator/subscribeOn';

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
  requests : any;
  login : boolean;

  private masterEmail: string = "21300649@handong.edu";
  public masterSwitch: boolean = false;
  

  constructor(public platform: Platform, public statusBar: StatusBar,
    public splashScreen: SplashScreen, public afAuth: AngularFireAuth,
    public auth: AuthData, public toast: ToastController, public alerCtrl: AlertController,
    public afs: AngularFirestore, public popoverCtrl: PopoverController,
   ) {


    this.afAuth.authState.subscribe((auth) => {
      console.log(auth.email)
      this.authUser = auth.email
      if (auth.email === this.masterEmail) {
        this.masterSwitch = true;
      }
    })

    
    this.afAuth.authState.subscribe((auth) => {

      if(auth!=null){
        this.login = true;
      }
      else{
        this.login = false;
      }
    })



    this.initializeApp();
    this.pages = [
      // { title: '로그인', component: "MainPage" },|
      { title: '재고관리', component: 'HomePage' },
      { title: '정비관리', component: "RepairPage" },
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
    this.nav.setRoot(page.component);
  }

  logout() {
    this.afAuth.auth.signOut();
    let toast = this.toast.create({
      message: "로그아웃 되었습니다",
      duration: 2000,
      position: "bottom"
    });
    toast.present();
    this.nav.setRoot('MainPage');
  }

  requestAuthorization() {
    let alert = this.alerCtrl.create();
    alert.setTitle('원하는 권한을 신청하세요')
    alert.addInput({
      type: 'checkbox',
      label: 'admin',
      value: 'admin'
    });
    alert.addInput({
      type: 'checkbox',
      label: 'editor',
      value: 'editor'
    });

    alert.addButton('취소');
    alert.addButton({
      text: '확인',
      handler: data => {

        let user_id = this.afAuth.auth.currentUser.uid;

        console.log('Checkbox data:', data);
        this.testCheckboxOpen = false;
        this.testCheckboxResult = data;
        this.afs.collection('request').doc(user_id).set({
          uid: user_id,
          role : {
            admin : data[0]=='admin'?true:false,
            editor : data[1]=='editor'?true:false
          }
        }).then(() => {
          let toast = this.toast.create({
            message: "권한이 신청되었습니다",
            duration: 2000,
            position: "bottom"
          });
          toast.present();
        })
      }
    });
    alert.present().then(() => {
      this.testCheckboxOpen = true;
    })
  }

  approveAuthorization(){
    this.nav.push(AuthorizationPage);
  }

  openStock(){
    this.nav.setRoot('HomePage');
  }

  openRepair(){
    this.nav.setRoot('RepairPage');
  }
  openMain(){
    this.nav.setRoot('MainPage');
  }
}


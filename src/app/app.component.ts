import { Component, ViewChild } from '@angular/core';
import { Platform, Nav } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AngularFireAuth } from 'angularfire2/auth';
import { EMAIL_VALIDATOR } from '@angular/forms/src/directives/validators';
import { AuthData } from '../providers/auth-data';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  rootPage:any = 'MainPage';
  pages: Array<{title: string, component: any}>;
  authUser : any;

  constructor(public platform: Platform, public statusBar: StatusBar,
     public splashScreen: SplashScreen, public afAuth : AngularFireAuth,
    public auth : AuthData) {

        this.afAuth.authState.subscribe((auth)=>{
          this.authUser = auth.email
        })
    
    this.initializeApp();
    this.pages = [
      {title:'로그인',component:"MainPage"},
      {title:'재고관리',component:'HomePage'},
      {title:'정비관리', component:"RepairPage"},
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

  openPage(page){
    this.nav.setRoot(page.component);
  }
}


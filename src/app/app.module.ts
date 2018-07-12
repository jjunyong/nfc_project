import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireModule } from 'angularfire2';

// import { AngularFireStorageModule } from 'angularfire2/storage';
import { AuthData } from '../providers/auth-data';
import { Facebook } from '@ionic-native/facebook';
import { GooglePlus } from '@ionic-native/google-plus';
import { AngularFirestoreModule } from 'angularfire2/firestore'
import { NFC, Ndef} from '@ionic-native/nfc';
import { FireService } from '../providers/FireService';
import { AuthorizationPage } from './authorization/authorization';
import { LoginSelectPage } from './app.component'
import { GlobalVars } from '../providers/global';
import { FillPage } from '../pages/home/change-log/change-log';

// import { AngularFireStorageModule } from 'angularfire2/storage';

export const config = { 
  apiKey: "AIzaSyACcRwZawea9vXAI0cNz0xsjbHRqP5XTlY",
    authDomain: "prototype-d68e4.firebaseapp.com",
    databaseURL: "https://prototype-d68e4.firebaseio.com",
    projectId: "prototype-d68e4",
    storageBucket: "prototype-d68e4.appspot.com",
    messagingSenderId: "498739217733"
};

@NgModule({
  declarations: [
    MyApp,
    AuthorizationPage,
    LoginSelectPage,
    FillPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(config),
    // AngularFireStorageModule,
    AngularFireAuthModule,
    AngularFirestoreModule,
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AuthorizationPage,
    LoginSelectPage,
    FillPage
  ],  
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthData,
    Facebook,
    GooglePlus,
    NFC,
    Ndef,
    FireService,
    GlobalVars
  ]
})
export class AppModule {} 

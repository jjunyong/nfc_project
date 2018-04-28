import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule, AngularFireDatabase } from 'angularfire2/database';
import { AuthData } from '../providers/auth-data';
import { Facebook } from '@ionic-native/facebook';
import { GooglePlus } from '@ionic-native/google-plus';
import { AngularFirestoreModule } from 'angularfire2/firestore'
import { NFC, Ndef} from '@ionic-native/nfc';

// import { AngularFireStorageModule } from 'angularfire2/storage';


export const config = { 
  apiKey: "AIzaSyAvvRWBkF21p7_ol6OQsH2rst4UjfWZfJU",
  authDomain: "prototype-afd2b.firebaseapp.com",
  databaseURL: "https://prototype-afd2b.firebaseio.com",
  projectId: "prototype-afd2b",
  storageBucket: "prototype-afd2b.appspot.com",
  messagingSenderId: "706026974631"
};

@NgModule({
  declarations: [
    MyApp
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),

    AngularFireModule.initializeApp(config),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    AngularFirestoreModule,

  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp
  ],  
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthData,
    Facebook,
    GooglePlus,
    AngularFireDatabase,
    NFC,
    Ndef
  ]
})
export class AppModule {}

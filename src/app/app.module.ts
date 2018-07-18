import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireModule } from 'angularfire2';

import { AngularFireStorageModule } from 'angularfire2/storage';
import { AuthData } from '../providers/auth-data';
import { GooglePlus } from '@ionic-native/google-plus';
import { AngularFirestoreModule } from 'angularfire2/firestore'
import { NFC, Ndef} from '@ionic-native/nfc';
import { FireService } from '../providers/FireService';
import { AuthorizationPage } from './authorization/authorization';
import { LoginSelectPage } from './app.component'
import { GlobalVars } from '../providers/global';
import { FillPage } from '../pages/home/change-log/change-log';
import { GalleryPage } from '../pages/home/stock-manage/item-detail/gallery';
import { QrcodePage } from '../pages/qrcode/qrcode';
import { IonicPageModule } from 'ionic-angular/module';
import { NgxQRCodeModule } from 'ngx-qrcode2';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { NavController} from 'ionic-angular'
import * as admin from 'firebase-admin';
 

export const config = { 
  apiKey: "AIzaSyACcRwZawea9vXAI0cNz0xsjbHRqP5XTlY",
    authDomain: "prototype-d68e4.firebaseapp.com",
    databaseURL: "https://prototype-d68e4.firebaseio.com",
    projectId: "prototype-d68e4",
    storageBucket: "prototype-d68e4.appspot.com",
    messagingSenderId: "498739217733"
};

admin.initializeApp({
  credential: admin.credential.cert({
    projectId: "prototype-d68e4",
    clientEmail: "firebase-adminsdk-ehk2t@prototype-d68e4.iam.gserviceaccount.com",
    privateKey: "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQDAZUH+h/6aiD1N\nd8YQsvidO3w6x07SJWaxgufIYt25qHzgEZAcbUbJhvriu/ibjUIoU5F9RW/Xz3cV\nbjWoUD/JsX1uhJZ6b0DbcRADB5zItxL5NE1z409GudLpp+AAHMpdU6MSOuTqvx3r\nENqDD1QlDmhxcymIcnC0983AG9F1ndKZaVkAgzmAyeeyOvtXz3nSRtsiOGJdV/Tx\nK5VHWkFGdWbstrrrslPDrF54gBI9oxEQ9ONgolKG8Xvv2xiK7SjT0kb4uduWL53d\nctnxF08Bv1AY6NV5G72PdCpCsyoVgbEnvIpfVx2YQAshiQ3LRmWpsY+Y1g30SG27\nm3nOv0lPAgMBAAECggEALJLpFL7OKmA5D6sZrMHCHq9q6zVE2iQHJEYnTAI3y20x\nLTp0cFmS5lrK4l/ZS7SQ6MXfta2yKUYsGT901/9rn99qp4G5WTlQRebuZj1LwibE\nEw9eiGRX+BNSPYcCuxPwgGnBpJYXdhl8JXs8nNOe040AfpRHQZD98rdcqE7pmr1j\noewbRxyacmB1yoXHuua5u25GLDp53LOLfKnlLsvXirr+X34azTB2aVkTInyJuG2o\nAZwSaKDmVVaW/lghjuIYFApB7u0YSTSHH1F0OjleAvx9wQdgtpPVpZXRCWsz2/LJ\nHDCxvs5ssrn80Udc6rcJP9DU9tcN65obQviNt+SA8QKBgQD8L31B3bWMISIF13M1\n8UFJ7VtZoi/ZFMQXSNrNKIC2zh2Sv91C9iwjyYhv05ihEt8qHCN3MPEklYo1Vpm3\njQ3gi6loNlf6SIvQK3bVZqriqRYbGz0nBkewe/5prKnA8BRyOa4neWg7yEVz4tOC\nlGKC4KfESNL99LPUfMJUmLKE8QKBgQDDTkARlc9uAzhdW33TVSom6/4m13gKgdH8\nHue8TFJmJswQDh8sSNxXpyDdKKx1+zRAqoNO2q9mvd7yAtdyUu4t3icRCLCUtba/\nw0GzduXHzLYKyflyLGBVleawjmltEnb7UfDH0O49xmP+LoL+NaKG8NPT5mgPdMj+\noDY2LHGyPwKBgQC1JNuBS2MTw9zve0Hrdl8iXhdm/AQIl0z/OLrJ8RT7unQtrBmf\n9rnf/uw8/y28TZT1Z37mJ8afM7cx9wG1geF88HUAQUDSq/eZ0Q6r3PJUm4YgdGFp\nva4TDA3EFF1fFFRrdBkvi5qejo2s3zp0qmdUgVCgwnqkJnhh4jeokoJw0QKBgHE+\nPgf0RYIUe+ol0p9nEjnfPE5pQUFWZNs7UELuPhjdBhWJGqoi1SA91+BkZRtDvNiC\nBgEC7BE2pr7Mxv+S9mfCGATYdQrFEmG+ZaoZlsJzAFrhIbIB6Rm3ATv+V0LXIgY3\nTNWPX5SSJAiOD4Y2szZrDWgggNX1cVWyr7xZqNMhAoGBAPB1LKNiIcAYl+mayeFA\nCYESlXUh2KqtM08nuzODI9zEqBqCy1hZWUO7SyS+OERoTYE91aJ+qNHTuu9lY2o8\ngLHAYkuyTEBO/Aei5TGPCjtYRrCo+JzREkeg5EJ3kCXeRRt7ZiO0er0I8pOWC+JC\nKEvhvsh13pTbr6c1GS1l95Vi\n-----END PRIVATE KEY-----\n",
  }),
  databaseURL: 'https://prototype-d68e4.firebaseio.com'
});


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
    AngularFireStorageModule,
    AngularFireAuthModule,
    AngularFirestoreModule,
    IonicPageModule, 
    NgxQRCodeModule
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
    GooglePlus,
    NFC,
    Ndef,
    FireService,
    GlobalVars, 
    BarcodeScanner, 
  ]
})
export class AppModule {} 

import { Component } from '@angular/core';
import { IonicPage,NavController,NavParams } from 'ionic-angular';
import { NFC } from '@ionic-native/nfc';
import { AngularFireAuth } from 'angularfire2/auth';
import { auth } from 'firebase';
import { AuthData } from '../../providers/auth-data';

/**
 * Generated class for the MainPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-main',
  templateUrl: 'main.html',
})
export class MainPage {

  public backgroundImage: any = "https://firebasestorage.googleapis.com/v0/b/prototype-d68e4.appspot.com/o/login.jpg?alt=media&token=86151782-4372-4ec3-84e7-c2ef76b4a663";

  payload : string;

  constructor(public afAuth : AngularFireAuth, public navCtrl: NavController, public navParams: NavParams, private nfc: NFC,
  public authData : AuthData) {

    // this.nfc.addMimeTypeListener('jjun/read',()=>{
    //   console.log('nfc attached')
    // }, (err) => {
    //   console.log('error attaching ndef listener', err);
    // }).subscribe((event) => {

    //   this.payload = this.nfc.bytesToString(event.tag.ndefMessage[0].payload);      alert(this.payload);
    //   // this.navCtrl.push('LocationManagePage')
    // });

<<<<<<< Updated upstream:src/pages/main/main.ts
    console.log(this.authData.isLoggedIn());
  }

=======
>>>>>>> Stashed changes:src/pages/testhomepage/testhomepage.ts
  googleLogin() {
    this.afAuth.auth.signInWithPopup(new auth.GoogleAuthProvider());
  }

  loginWithEmail(){
    this.navCtrl.push('LoginPage');
  }

  createAccount(){
    this.navCtrl.push('RegisterPage');
  }

  logout(){
    this.afAuth.auth.signOut().then(()=>{
  //   let toast = this.toast.create({
  //     message: "로그아웃 되었습니다!",
  //     duration: 1000,
  //     position: "bottom"
  //   });
  //   toast.present();
  })
  }

  
}

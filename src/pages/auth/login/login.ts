import { Component } from '@angular/core';
import { IonicPage, NavController, LoadingController, AlertController } from 'ionic-angular';
import { FormBuilder, Validators } from '@angular/forms';

import firebase from 'firebase';
import {AngularFireModule} from 'angularfire2'
import { Platform } from 'ionic-angular';
//***********  Facebook **************/
import { Facebook } from '@ionic-native/facebook';
//***********  Google plus **************/
import { GooglePlus } from '@ionic-native/google-plus';
import { AuthData } from '../../../providers/auth-data';
import { AngularFireAuth } from 'angularfire2/auth';


@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  public loginForm: any;
  public backgroundImage: any = "https://firebasestorage.googleapis.com/v0/b/prototype-afd2b.appspot.com/o/bg1.jpg?alt=media&token=3244d9a3-9411-419a-bd8e-203d84e36d5b";
//   public imgLogo: any = "./assets/imgs/medium_150.70391061453px_1202562_easyicon.net.png";

  constructor(private fire:AngularFireAuth, public navCtrl: NavController, public authData: AuthData, public fb: FormBuilder, public alertCtrl: AlertController,public loadingCtrl: LoadingController,private facebook: Facebook,
    private googleplus: GooglePlus,
    private platform: Platform,) {
      let EMAIL_REGEXP = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;
      this.loginForm = fb.group({
            email: ['', Validators.compose([Validators.required, Validators.pattern(EMAIL_REGEXP)])],
            password: ['', Validators.compose([Validators.minLength(6), Validators.required])]
      });
  }

  login(){
      if (!this.loginForm.valid){
          //this.presentAlert('Username password can not be blank')
          console.log("error");
      } else {
        let loadingPopup = this.loadingCtrl.create({
          spinner: 'crescent', 
          content: ''
        });
        loadingPopup.present();

        this.authData.loginUser(this.loginForm.value.email, this.loginForm.value.password)
        .then( authData => {
          console.log("Auth pass");
          loadingPopup.dismiss();
          // this.navCtrl.setRoot('AfterLoginPage');
          this.navCtrl.setRoot('HomePage');
        }, error => {
          var errorMessage: string = error.message;
          loadingPopup.dismiss().then( () => {
              this.presentAlert(errorMessage)
          });
        });
      }
  }

  forgot(){
    this.navCtrl.push('ForgotPage');
  }

  createAccount(){
    this.navCtrl.push('RegisterPage');
  }
  presentAlert(title) {
    let alert = this.alertCtrl.create({
      title: title,
      buttons: ['OK']
    });
    alert.present();
  }

}

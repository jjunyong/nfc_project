import { Component } from '@angular/core';
import { IonicPage, NavController, LoadingController, AlertController } from 'ionic-angular';

import { FormBuilder, Validators } from '@angular/forms';

import { Platform } from 'ionic-angular';
//***********  Facebook **************/
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook';

//***********  Google plus **************/
import { GooglePlus } from '@ionic-native/google-plus';

import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

import { AuthData } from '../../../providers/auth-data';


@IonicPage()
@Component({
  selector: 'page-main',
  templateUrl: 'main.html'
})
export class MainPage {


  userData=null;
  public loginForm: any;
  public backgroundImage: any = "./assets/imgs/main_bg.jpg";
  public imgLogo: any = "./assets/imgs/ionic.png";

  constructor(private fire:AngularFireAuth, public navCtrl: NavController, public authData: AuthData, private platform: Platform, public fb: FormBuilder, public alertCtrl: AlertController,public loadingCtrl: LoadingController,private facebook: Facebook,private googleplus: GooglePlus) {
      let EMAIL_REGEXP = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;
      this.loginForm = fb.group({
            email: ['', Validators.compose([Validators.required, Validators.pattern(EMAIL_REGEXP)])],
            password: ['', Validators.compose([Validators.minLength(6), Validators.required])]
      });
  }

  loginWithFacebook(){
    this.fire.auth.signInWithPopup(new firebase.auth.FacebookAuthProvider())
    .then(res=>{
      console.log(res);
    })
  }
  logoutOfFacebook(){
    this.fire.auth.signOut();
    console.log("signout");
  }


  loginWithFB(){
    this.facebook.login(['email', 'public_profile']).then((response: FacebookLoginResponse)=>{
      this.facebook.api('me?fields=id, name, email, first_name, picture.width(720).height(720).as(picture_large)', []).then(profile=>{
        this.userData={email:profile['email'], first_name:profile["first_name"], picture:profile['picture_large']['data']['url'], nusername:profile['name']};
      })
    })
  }

  facebookLogin(){
    let loadingPopup = this.loadingCtrl.create({
      spinner: 'crescent', 
      content: '',
      duration: 15000
    });
    loadingPopup.present();
    // call signInWithFacebook in authData provider.
    if (this.platform.is('cordova')) {
      this.authData.signInWithFacebook()
      .then( authData => {
        var resJSON = JSON.stringify(authData);
        this.authData.updateUserProfile(authData.uid,authData.displayName,authData.email,authData.photoURL,authData.phoneNumber)
        loadingPopup.dismiss();
        this.navCtrl.setRoot('AfterLoginPage');

      }, error => {
        var errorMessage: string = error.message;
        loadingPopup.dismiss().then( () => {
          alert("Error:"+errorMessage)
        });
      });
    }
    else {
      alert("Please install app in device.")
      loadingPopup.dismiss();
    }
  }

  googleLogin(){
    let loadingPopup = this.loadingCtrl.create({
    spinner: 'crescent', 
    content: '',
    duration: 15000
    });
    loadingPopup.present();
    if (this.platform.is('cordova')) {
      this.authData.signInWithGoogle()
      .then( authData => {
        this.authData.updateUserProfile(authData.uid,authData.displayName,authData.email,authData.photoURL,authData.phoneNumber)
        loadingPopup.dismiss();
        this.navCtrl.setRoot('AfterLoginPage');
      }, error => {
        var errorMessage: string = error.message;
        loadingPopup.dismiss().then( () => {
          alert("Error"+errorMessage)
        });
      });  
    }
    else {
      alert("Please install app in device.")
      loadingPopup.dismiss();
    }


  }
  
  
  loginWithEmail(){
    this.navCtrl.push('LoginPage');
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

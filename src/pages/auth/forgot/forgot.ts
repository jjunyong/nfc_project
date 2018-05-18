import { IonicPage, NavController,LoadingController, AlertController } from 'ionic-angular';
import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthData } from '../../../providers/auth-data';


@IonicPage()
@Component({
  selector: 'page-forgot',
  templateUrl: 'forgot.html'
})
export class ForgotPage {
  public resetPasswordForm;
  public backgroundImage: any = "https://firebasestorage.googleapis.com/v0/b/prototype-afd2b.appspot.com/o/bg3.jpg?alt=media&token=c6b8fce8-064f-4501-8339-fbef26340903"; 

  constructor(public authData: AuthData, public fb: FormBuilder, public nav: NavController, public loadingCtrl: LoadingController, public alertCtrl: AlertController) {

      let EMAIL_REGEXP = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;
      this.resetPasswordForm = fb.group({
            email: ['', Validators.compose([Validators.required, Validators.pattern(EMAIL_REGEXP)])],
      });
  }

  resetPassword(){
    if (!this.resetPasswordForm.valid){
        console.log("form is invalid = "+ this.resetPasswordForm.value);
    } else {

      let loadingPopup = this.loadingCtrl.create({
        spinner: 'crescent', 
        content: ''
      });
      loadingPopup.present();
      this.authData.resetPassword(this.resetPasswordForm.value.email)
      .then((user) => {
          loadingPopup.dismiss();
          this.presentAlert("We just sent you a reset link to your email");
          this.nav.setRoot('LoginPage');
      }, (error) => {
          loadingPopup.dismiss();
          var errorMessage: string = error.message;
          this.presentAlert(errorMessage);
      });
    }
  }

  presentAlert(title) {
    let alert = this.alertCtrl.create({
      title: title,
      buttons: ['OK']
    });
    alert.present();
  }
}

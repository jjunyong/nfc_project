import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFirestore } from 'angularfire2/firestore';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireStorage } from 'angularfire2/storage';
import { finalize } from 'rxjs/operators';
import { AlertController } from 'ionic-angular/components/alert/alert-controller';
import { AuthService } from '../../providers/auth.service';
import { CameraOptions, Camera } from '@ionic-native/camera';

/**
 * Generated class for the ProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  name: string = "";
  email: string = "";
  employee_number: string = "";
  phone_number: number;
  thumbnail;
  uid;
  uploadPercent;
  downloadURL;

  backgroundImage = "https://firebasestorage.googleapis.com/v0/b/prototype-d68e4.appspot.com/o/%EB%A9%94%EC%9D%B8%ED%8E%98%EC%9D%B4%EC%A7%802_%ED%88%AC%EB%AA%85.png?alt=media&token=b4bb27d8-9ce6-44b5-b979-a5d24c2401b2";

  constructor(public navCtrl: NavController, public navParams: NavParams, public afs: AngularFirestore,
    public storage : AngularFireStorage, public alertCtrl : AlertController, public camera : Camera,
  public auth: AuthService) {

    this.auth.user.subscribe((user)=>{
      this.uid = user.uid
      this.afs.collection('users').doc(`${user.uid}`).valueChanges()
        .subscribe((user_info: any) => {
          this.name = user_info.name;
          this.email = user_info.email;
          this.employee_number = user_info.employee_number;
          this.phone_number = user_info.phone;
          this.thumbnail = user_info.thumbnail;
        })
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilePage');
  }

  uploadFileDesktop(event) {
    const file = event.target.files[0];
    const filePath = `profiles/${this.uid}`;
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(filePath, file);

    this.uploadPercent = task.percentageChanges();
    // get notified when the download URL is available
    task.snapshotChanges().pipe(
      finalize(() => this.downloadURL = fileRef.getDownloadURL())
    )
      .subscribe()

    task.downloadURL()
      .subscribe((url) => {
        this.thumbnail = url;
        })
  }

  async uploadFileMobile() {
    try {
      const options: CameraOptions = {
        quality: 50,
        targetHeight: 600,
        targetWidth: 600,
        destinationType: this.camera.DestinationType.DATA_URL,
        encodingType: this.camera.EncodingType.JPEG,
        mediaType: this.camera.MediaType.PICTURE
      }
      const result = await this.camera.getPicture(options);

      const image = `data:image/jpeg;base64,${result}`;

      const pictures = this.storage.ref(`profiles/${this.uid}`)
      pictures.putString(image, 'data_url');

      pictures.getDownloadURL()
        .subscribe((url) => {
          this.thumbnail = url;
        })
    }
    catch (e) {
      console.error(e);
    }
  }

  submit(){
    let alert = this.alertCtrl.create({
      title: '정말 변경하시겠습니까?',
      buttons: [
        {
          text: 'Yes',
          handler: () => {
            this.afs.collection('users').doc(this.uid).update({
              name : this.name,
              employee_number : this.employee_number,
              email : this.email,
              phone : this.phone_number,
              thumbnail : this.thumbnail
          }).then(()=>{
            this.navCtrl.push('MainPage');
          })
        }
      },
        {
          text: 'Cancel',
          handler: () => {
            console.log('cancel clicked');
          }
        }
      ]
    });
    alert.present();
 
  }
}

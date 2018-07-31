import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { AngularFirestore } from 'angularfire2/firestore'
import { FireService } from '../../../providers/FireService';
import { AngularFireStorage } from 'angularfire2/storage';
import { finalize } from 'rxjs/operators';
import { CameraOptions, Camera } from '@ionic-native/camera';


class RepairItem{
  serialNum : string;
  model: string;
  repairman: string;
  id : string;
  thumbnail: string;
}


@IonicPage()
@Component({
  selector: 'page-addrepair',
  templateUrl: 'addrepair.html',
})
export class AddrepairPage {

  RepairItem = new RepairItem()
  serialNum
  model
  repairman
  thumbnail;

  uploadPercent
  snapshot
  downloadURL

  backgroundImage = "https://firebasestorage.googleapis.com/v0/b/prototype-d68e4.appspot.com/o/%EB%A9%94%EC%9D%B8%ED%8E%98%EC%9D%B4%EC%A7%802_%ED%88%AC%EB%AA%85.png?alt=media&token=b4bb27d8-9ce6-44b5-b979-a5d24c2401b2";


  constructor(public afs:AngularFirestore, public navCtrl: NavController, public navParams: NavParams,
  public fireService : FireService, public storage : AngularFireStorage, public camera : Camera) {
}

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddrepairPage');
  }
  
  




  uploadFileDesktop(event) {
    const file = event.target.files[0];
    const filePath = `repair_item/${this.serialNum}`;
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(filePath, file);

    this.uploadPercent = task.percentageChanges();
    this.snapshot = task.snapshotChanges()
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

  isActive(snapshot){
    return snapshot.state === 'running' && snapshot.bytesTransferred < snapshot.totalBytes 
  }

  async uploadFileMobile() {
    try {
      const options: CameraOptions = {
        quality: 70,
        destinationType: this.camera.DestinationType.DATA_URL,
        encodingType: this.camera.EncodingType.JPEG,
        mediaType: this.camera.MediaType.PICTURE
      }
      const result = await this.camera.getPicture(options);

      const image = `data:image/jpeg;base64,${result}`;

      const task = this.storage.ref(`repair_item/${this.serialNum}`).putString(image, 'data_url');
      this.uploadPercent = task.percentageChanges();

      task.downloadURL().subscribe((url)=>{
        this.thumbnail = url;
      })

    }
    catch (e){
      console.error(e);
    }
  }

  update(){

    if(this.model && this.serialNum && this.thumbnail && this.repairman){
    this.RepairItem.id = this.afs.createId();
    this.RepairItem.model = this.model;
    this.RepairItem.repairman = this.repairman;
    this.RepairItem.serialNum = this.serialNum;
    this.RepairItem.thumbnail = this.thumbnail;
    this.fireService.RepairAdd(this.RepairItem)
    this.navCtrl.pop()
    }
    else{
      alert("모든 필드를 입력하세요")
    }

  }

}

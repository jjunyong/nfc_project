import { Component, ChangeDetectorRef } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ToastController } from 'ionic-angular';
import { AngularFirestore } from 'angularfire2/firestore'
// import { AngularFireStorage, AngularFireUploadTask } from 'angularfire2/storage';

import { NumberFormatStyle } from '@angular/common/src/i18n/locale_data_api';
import { Observable } from 'rxjs';
import { GlobalVars } from '../../../../providers/global';



@IonicPage()
@Component({
  selector: 'page-item-detail',
  templateUrl: 'item-detail.html',
})


export class ItemDetailPage {
  showToolbar: boolean = false;
  transition: boolean = false;

  model: string;
  location1: any;
  location2: any;
  quantity: number;
  id: string;

  public pre_model: any;
  public pre_location1: any;
  public pre_location2: any;
  public pre_quantity: number;
  public pre_id: any;
  public changed_quantity: any;


  // task: AngularFireUploadTask;
  // percentage: Observable<number>;
  // snapshot: Observable<any>;
  // image : string;


  constructor(public navCtrl: NavController, public navParams: NavParams,
    public ref: ChangeDetectorRef, public afs: AngularFirestore, public alertCtrl: AlertController,
    public toast : ToastController, public global : GlobalVars) {

    this.global.changeMessage(false);

    this.model = this.navParams.get('model');
    this.location1 = this.navParams.get('location1');
    this.location2 = this.navParams.get('location2');
    this.quantity = this.navParams.get('quantity');
    this.id = this.navParams.get('id');

    this.pre_quantity = this.quantity
    this.pre_id = this.id
    this.pre_location1 = this.location1
    this.pre_location2 = this.location2
    this.pre_model = this.model
  }



  ionViewDidLoad() {

    console.log('ionViewDidLoad ItemDetailPage');
  }

  onScroll($event: any) {
    let scrollTop = $event.scrollTop;
    this.showToolbar = scrollTop >= 100;
    if (scrollTop < 0) {
      this.transition = false;
      //this.headerImgSize = `${ Math.abs(scrollTop)/2 + 100}%`;
    } else {
      this.transition = true;
      // this.headerImgSize = '100%'
    }
    this.ref.detectChanges();
  }

  modify() {

  }

  confirm() {
    this.afs.collection('item').doc(this.id).update({
      model: this.model,
      location1: this.location1,
      location2: this.location2,
      quantity: this.quantity,
      timestamp: new Date()
    })

    this.changed_quantity = this.quantity - this.pre_quantity

    console.log(this.changed_quantity)
    if ((this.pre_location1 != this.location1) || (this.pre_location2 != this.location2)) {
      const doc_id = this.afs.createId();
      this.afs.collection("log").add({
        model: this.model,
        type: "location_changed",
        quantity: this.quantity,
        location1: this.location1,
        location2: this.location2,
        timestamp: new Date(),
        changed_quantity: this.changed_quantity,

      })
    }

    if (this.changed_quantity > 0) {
      this.afs.collection("log").add({
        model: this.model,
        type: "import",
        quantity: this.quantity,
        location1: this.location1,
        location2: this.location2,
        timestamp: new Date(),
        changed_quantity: this.changed_quantity,

      })
    }

    if (this.changed_quantity < 0) {
      this.afs.collection("log").add({
        model: this.model,
        type: "export",
        quantity: this.quantity,
        location1: this.location1,
        location2: this.location2,
        timestamp: new Date(),
        changed_quantity: this.changed_quantity,

      })
    }
    this.navCtrl.push('StockManagePage', {
      model: this.model,
      location1: this.location1,
      location2: this.location2,
      quantity: this.quantity,
      id: this.id,
      status: true
    })
  }


  delete() {

    let confirm = this.alertCtrl.create({
      title: '정말로 아이템을 삭제하시겠습니까?',
      message: '아이템을 삭제하시려면 Yes를 클릭하세요',
      buttons: [
        {
          text: 'Yes',
          handler: () => {
            this.afs.collection('item').doc(this.id).delete().then(() => {
              
              let toast = this.toast.create({
                message: "성공적으로 삭제하였습니다.",
                duration: 2000,
                position: "bottom"
              });
              toast.present();
              this.navCtrl.pop();
            }).catch(function (error) {
              console.error("삭제에 실패하였습니다. ", error);
            });
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


    confirm.present();
  }
  
//   startUpload(event: FileList){
//     const file = event.item(0);

//     if(file.type.split('/')[0] !== 'image'){
//       console.error('Unsupported file type!');
//       return;
//     }

//     const path = `item_images/${file.name}`;
//     const customMetadata = { app : 'Capstone App'}

//     this.task = this.storage.upload(path, file, { customMetadata});
//     this.percentage = this.task.percentageChanges();
//     this.snapshot = this.task.snapshotChanges();

//     this.task.downloadURL()
//       .subscribe(url=>{
//         this.image = url;
//       })
//   }
//   isActive(snapshot){
//     return snapshot.state === 'running' && snapshot.bytesTransferred < snapshot.totalBytes
//  }
}

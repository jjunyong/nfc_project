import { Component, ChangeDetectorRef } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { FireService } from '../../../providers/FireService'
import { RepairitemdetailPageModule } from './repairitemdetail.module';
import { AngularFirestore } from 'angularfire2/firestore';
import { ToastController } from 'ionic-angular/components/toast/toast-controller';


class RepairItem{
  finDate: Date;
  id: string;
  isToggled: boolean;
}

@IonicPage()
@Component({
  selector: 'page-repairitemdetail',
  templateUrl: 'repairitemdetail.html',
})


export class RepairitemdetailPage {

  RepairItem = new RepairItem();

  itemList : any=[]; 
  itemArray : any = [];
  loadedItemList:  any=[]; 
  items : any = [];


  showToolbar:boolean = false;
  transition:boolean = false;

  id: string;
  serialNum:string;
  model:string;
  repairman:string;

  startDate : string;
  finDate : string
  isToggled: boolean;


  constructor(public navCtrl: NavController, public navParams: NavParams, public toast: ToastController,
    public ref: ChangeDetectorRef,  public fireService : FireService, public afs: AngularFirestore, public alertCtrl: AlertController) {

      this.id = this.navParams.get('id');
      this.serialNum = this.navParams.get('serialNum');
      this.model = this.navParams.get('model');
      this.repairman = this.navParams.get('repairman');
      this.isToggled = this.navParams.get('isToggled');
      this.finDate = this.navParams.get('finDate');
      this.startDate = this.navParams.get('startDate');

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ItemDetailPage');
  }

  onScroll($event: any){
    let scrollTop = $event.scrollTop;
    this.showToolbar = scrollTop >= 100;
    if(scrollTop < 0){
        this.transition = false;
        //this.headerImgSize = `${ Math.abs(scrollTop)/2 + 100}%`;
    }else{
        this.transition = true;
       // this.headerImgSize = '100%'
    }
    this.ref.detectChanges();
  }

  add(){
    this.navCtrl.push('AddlogPage',{
      id : this.id
    })
  }  
  
  timeline(){
    this.navCtrl.push('TimelinePage',{
      id : this.id
    })
  }

repairfin(){

    this.isToggled !== true;
    console.log(this.isToggled)
    this.RepairItem.isToggled = this.isToggled
    this.RepairItem.finDate = new Date()
    this.finDate = this.RepairItem.finDate.toISOString();
    this.RepairItem.id = this.id
    this.fireService.finAdd(this.RepairItem)
    console.log(this.finDate)
  }

  modify(){

  }

  addtime(item)
  {

  }

  
  delete() {

    let confirm = this.alertCtrl.create({
      title: '정말로 아이템을 삭제하시겠습니까?',
      message: '아이템을 삭제하시려면 Yes를 클릭하세요',
      buttons: [
        {
          text: 'Yes',
          handler: () => {
            this.afs.collection('RepairItem').doc(this.id).delete().then(() => {
              
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


}

import { Component, ChangeDetectorRef } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { FireService } from '../../../providers/FireService'
import { RepairitemdetailPageModule } from './repairitemdetail.module';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { ToastController } from 'ionic-angular/components/toast/toast-controller';
import {AngularFireAuth} from 'angularfire2/auth'

class RepairItem{
  finDate: Date;
  id: string;
  isToggled: boolean;
}

interface RepairItemLog{
  title: string,
  writer: string,
  description: string;
  timestamp: Date;
}

@IonicPage()
@Component({
  selector: 'page-repairitemdetail',
  templateUrl: 'repairitemdetail.html',
})


export class RepairitemdetailPage {

  private itemsCollection: AngularFirestoreCollection<RepairItemLog>; 

  id_temp : string ;
  RepairItem = new RepairItem();

  itemList : any=[]; 
  itemArray : any = [];
  loadedItemList:  any=[]; 
  items : any = [];

  showToolbar:boolean = false;
  transition:boolean = false;

  id: string;
  public serialNum:string;
  public model:string;
  repairman:string;

  startDate : Date;
  finDate : Date
  isToggled: boolean;

  backgroundImage = "https://firebasestorage.googleapis.com/v0/b/prototype-d68e4.appspot.com/o/%EB%A9%94%EC%9D%B8%ED%8E%98%EC%9D%B4%EC%A7%802_%ED%88%AC%EB%AA%85.png?alt=media&token=b4bb27d8-9ce6-44b5-b979-a5d24c2401b2";
  cardImage = "https://firebasestorage.googleapis.com/v0/b/prototype-d68e4.appspot.com/o/%EB%A9%94%EC%9D%B8%ED%8E%98%EC%9D%B4%EC%A7%802_%ED%88%AC%EB%AA%852.png?alt=media&token=78826653-cbd4-442d-9607-0b03983167b5"


  constructor(public navCtrl: NavController, public navParams: NavParams, public toast: ToastController,
    public ref: ChangeDetectorRef,  public fireService : FireService, public afs: AngularFirestore, public alertCtrl: AlertController,
    public loadingCtrl: LoadingController,public afAuth : AngularFireAuth) {

      this.id = this.navParams.get('id');
      this.serialNum = this.navParams.get('serialNum');
      this.model = this.navParams.get('model');
      this.repairman = this.navParams.get('repairman');
      this.isToggled = this.navParams.get('isToggled');
      this.finDate = this.navParams.get('finDate');
      this.startDate = this.navParams.get('startDate')

      

      let loadingPopup = this.loadingCtrl.create({
        spinner: 'crescent', // icon style //
        content: '',
      });
      loadingPopup.present();
  

      this.itemsCollection = afs.collection('RepairItem').doc(`${this.id}`).collection<RepairItemLog>('repair', ref=>ref.orderBy('timestamp','desc').limit(2))
      this.items= this.itemsCollection.valueChanges()
  
  
     this.items.subscribe((RepairItemLog)=>{
          this.itemArray = RepairItemLog;
          this.itemList = this.itemArray;
          this.loadedItemList = this.itemArray;
          loadingPopup.dismiss();
        });
  


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

  addlog(){
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
    this.finDate = this.RepairItem.finDate;
    this.RepairItem.id = this.id
    this.fireService.finAdd(this.RepairItem)
    console.log(this.finDate)
    if(this.isToggled){
      //console.log(this.model, this.serialNum, "on")
        this.fireService.Add_User_Log(this.model, this.serialNum)
    }
    
  

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


  more(){

    this.itemsCollection = this.afs.collection('RepairItem').doc(`${this.id}`).collection<RepairItemLog>('repair', ref=>ref.orderBy('timestamp','desc'))
    this.items= this.itemsCollection.valueChanges()


   this.items.subscribe((RepairItemLog)=>{
        this.itemArray = RepairItemLog;
        this.itemList = this.itemArray;
        this.loadedItemList = this.itemArray;
      });

  
  }


}

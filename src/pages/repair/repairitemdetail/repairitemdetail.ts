import { Component, ChangeDetectorRef } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FireService } from '../../../providers/FireService'
import { RepairitemdetailPageModule } from './repairitemdetail.module';


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


  constructor(public navCtrl: NavController, public navParams: NavParams,
    public ref: ChangeDetectorRef,  public fireService : FireService) {

      this.id = this.navParams.get('id');
      this.serialNum = this.navParams.get('serialNum');
      this.model = this.navParams.get('model');
      this.repairman = this.navParams.get('repairman');
      this.isToggled = this.navParams.get('isToggled');
      this.finDate = this.navParams.get('finDate');
      this.startDate = this.navParams.get('startDate');

      console.log(this.isToggled)
      console.log("처음에 토글값 들어올때")

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

    this.isToggled = !this.isToggled
    console.log("여기서 토글값 변화되어야 합니다")
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

}

import { Component, ChangeDetectorRef } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FireService } from '../../../providers/FireService'
import { RepairitemdetailPageModule } from './repairitemdetail.module';


class RepairItem{
  finDate: string;
  id: string;
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

  startDate = new Date().toISOString();
  finDate : string;


  constructor(public navCtrl: NavController, public navParams: NavParams,
    public ref: ChangeDetectorRef,  public fireService : FireService) {

      this.id = this.navParams.get('id');
      this.serialNum = this.navParams.get('serialNum');
      this.model = this.navParams.get('model');
      this.repairman = this.navParams.get('repairman');
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
    this.RepairItem.finDate = new Date().toISOString();
    this.fireService.RepairAdd(this.RepairItem)
    this.navCtrl.pop()
  }

  modify(){

  }

  addtime(item)
  {

  }

}

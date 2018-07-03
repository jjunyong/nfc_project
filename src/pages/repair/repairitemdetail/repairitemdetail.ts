
import { Component, ChangeDetectorRef } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-repairitemdetail',
  templateUrl: 'repairitemdetail.html',
})


export class RepairitemdetailPage {

  itemList : any=[]; 
  itemArray : any = [];
  loadedItemList:  any=[]; 
  items : any = [];


  showToolbar:boolean = false;
  transition:boolean = false;

  code: string;
  name:string;
  model:string;
  repairman:string;

  startDate = new Date().toISOString();
  finDate = new Date().toISOString();


  constructor(public navCtrl: NavController, public navParams: NavParams,
    public ref: ChangeDetectorRef) {

      this.code = this.navParams.get('code');
      this.name = this.navParams.get('name');
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
      code : this.code
    })
  }
  
  modify(){

  }

  addlog(item)
  {

  }

}
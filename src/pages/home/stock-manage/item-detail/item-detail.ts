import { Component, ChangeDetectorRef } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the ItemDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-item-detail',
  templateUrl: 'item-detail.html',
})

export class ItemDetailPage {
  showToolbar:boolean = false;
  transition:boolean = false;

  code:any;
  name :string;
  location:string;
  quantity:any;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public ref: ChangeDetectorRef) {

      this.code = this.navParams.get('code');
      this.name = this.navParams.get('name');
      this.location = this.navParams.get('location');
      this.quantity = this.navParams.get('quantity');
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

  modify(){

  }

  confirm(){
    console.log("confirm");
    console.log(this.name, this.location, this.quantity);
    this.navCtrl.push('StockManagePage',{
      code : this.code,
      name : this.name,
      location : this.location,
      quantity : this.quantity
    })
  }

}

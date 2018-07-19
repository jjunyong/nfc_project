import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ViewController } from 'ionic-angular';
// import { FirebaseListObservable, AngularFireDatabase } from 'angularfire2/database-deprecated';
// import 'rxjs/add/operator/map'; // you might need to import this, or not depends on your setup

import { AlertController } from 'ionic-angular/components/alert/alert-controller';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { FireService } from '../../../../src/providers/FireService'
import { GlobalVars } from '../../../providers/global';
import { count } from 'rxjs/operator/count';
class Item{
  location1: any;
  location2: any;
  model: string;
  quantity : number;
  id : string;
  public add_num : number ;
  public remove_num :number;
}
// class modify{
//   model : any;
//   attribute : any;
// }

@IonicPage()
@Component({
  selector: 'page-stock-manage',
  templateUrl: 'stock-manage.html',
})
export class StockManagePage {
  item = new Item()

  new_item;

  public itemsCollection: AngularFirestoreCollection<Item>; 
  itemList : any=[]; 
  itemArray : any = [];
  loadedItemList:  any=[]; 
  items : any = [];
  // modifyList : modify;

  public setArray : any =[];

  addArray : any =[];
  removeArray : any =[];
  count_temp : number ;

  temp : number=0;



  
  constructor( public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
    public navCtrl: NavController,
    private afs: AngularFirestore,
    public navParams : NavParams,
    public fireService : FireService,
    public global : GlobalVars
  ) {

    // this.global.currentMessage.subscribe(message => this.show = message)
    // this.global.changeMessage(false)
    this.global.changeMessage(true);

    let loadingPopup = this.loadingCtrl.create({
      spinner: 'crescent', // icon style //
      content: '',
    });
    loadingPopup.present();

    this.itemsCollection = afs.collection<Item>('item');
    this.items= this.itemsCollection.valueChanges();
    
    this.items.subscribe((item)=>{
      this.itemArray = item;
      this.itemList = this.itemArray;
      this.loadedItemList = this.itemArray;
      loadingPopup.dismiss()
    })

    //console.log("test")
    // for (var i=0;i<this.temp;i++){
    //   console.log()
    // }
  setTimeout(()=>{
  this.temp=this.itemArray.length;
  for(var i=0; i<this.temp; i++){
    this.itemArray[i].add_num=0;
    this.itemArray[i].remove_num=0;
    this.setArray[i]=this.itemArray[i]
   // this.removeArray[i]=this.itemArray[i]
   // this.addArray[i]=this.itemArray[i]
    // this.removeArray[i]=0;
    // this.addArray[i]=0;
    console.log(this.setArray[i].model, this.setArray[i].add_num, this.setArray[i].remove_num)
  }
  

  }, 500);
  

}
remove(item){ 
  for(var i=0;i<this.temp;i++){
    if(item.model==this.setArray[i].model){
      this.setArray[i].remove_num++;
      console.log(this.setArray[i].model, this.setArray[i].remove_num, "remove")
    }
  }
  this.count_temp=item.quantity -1; 
  Number(this.count_temp)
  this.afs.collection('item').doc(item.id).update({
    quantity : this.count_temp
  })
  //this.count_remove++;
  //this.removeArray[this.count_remove]=item.model;
  //console.log(this.count_remove, this.removeArray[this.count_remove])
}

add(item){
  
  for(var i=0;i<this.temp;i++){
  if(item.model==this.setArray[i].model){
    this.setArray[i].add_num++;
    console.log(this.setArray[i].model, this.setArray[i].add_num, "add")
  }
}
  this.count_temp=Number(item.quantity)+ Number(1); 
  this.afs.collection('item').doc(item.id).update({
    quantity : this.count_temp
  })
  //this.count_add++;
  //this.addArray[this.count_add]=item.model;
  //console.log(this.count_add, this.addArray[this.count_add])
}


ionViewWillEnter(){
  console.log('ionViewEnteredStockMangePage')
  this.global.changeMessage(false);
}

set(){
  //console.log(this.count_add, this.count_remove)
  //this.temp=this.itemArray.length;
  //console.log(this.temp, "test")
  let confirm = this.alertCtrl.create({
    title: '현재 상태를 저장하시겠습니까?',
    message: '현재 상태를 저장하려면 Yes를 클릭하세요',
    buttons: [
      {
        text: 'Yes',
        handler: () => {
          this.fire_update()
        }
      },
      {
        text: 'Cancel',
        handler: () => {
          this.fire_reset()
        }
      }
    ]
  });
  confirm.present();
}

initializeItems(){
  this.itemList = this.loadedItemList;
  
}
fire_update(){
//log update
console.log("log update")
for(var i=0; i<this.temp; i++){
  console.log(this.setArray[i].model, this.setArray[i].add_num, "add")
  console.log(this.setArray[i].model, this.setArray[i].remove_num, "remove")
  }
}


fire_reset(){
//firestore reset
console.log("log reset")
for(var i=0; i<this.temp; i++){
  console.log(this.setArray[i].model, this.setArray[i].add_num, "add")
  console.log(this.setArray[i].model, this.setArray[i].remove_num, "remove")
  }
}

getItems(searchbar) {
  // Reset items back to all of the items
  this.initializeItems();

  //console.log(this.itemList)
  // set q to the value of the searchbar
  var q = searchbar.srcElement.value;
  // if the value is an empty string don't filter the items
  if (!q) {
    return;
  }
  this.itemList = this.itemList.filter((v) => {
    if(v.model && q) {
      if (v.model.toLowerCase().indexOf(q.toLowerCase()) > -1) {
       
        return true;
      }
      return false;
    }
  });

 // console.log(q, this.itemList.length);
}




manage(){  
    let confirm = this.alertCtrl.create({
      title: '새로운 아이템을 추가하겠습니까?',
      message: '새로운 아이템을 추가하려면 Yes를 클릭하세요',
      buttons: [
        {
          text: 'Yes',
          handler: () => {
            this.openNextPage()
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

openNextPage(){
  this.navCtrl.push('ManagePage')
}

openDetail(item){
  this.navCtrl.push('ItemDetailPage',{
    serialNum : item.serialNum,
    model : item.model,
    location1 : item.location1,
    location2 : item.location2,
    quantity : item.quantity,
    id : item.id
  })
}

}













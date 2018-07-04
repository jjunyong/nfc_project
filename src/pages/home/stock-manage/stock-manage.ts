import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ViewController } from 'ionic-angular';
// import { FirebaseListObservable, AngularFireDatabase } from 'angularfire2/database-deprecated';
// import 'rxjs/add/operator/map'; // you might need to import this, or not depends on your setup
import { ActionSheetController } from 'ionic-angular';
import { AlertController } from 'ionic-angular/components/alert/alert-controller';
import { initializeApp } from 'firebase/app';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection  } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { FirebaseListObservable } from 'angularfire2/database-deprecated';
import { FireService } from '../../../app/FireService';

class Item{
  location: string;
  name: string;
  quantity : number;
  code : string;
  id : string;
}


@IonicPage()
@Component({
  selector: 'page-stock-manage',
  templateUrl: 'stock-manage.html',
})
export class StockManagePage {
  item = new Item()

  new_item= new Item()

  



  public itemsCollection: AngularFirestoreCollection<Item>; 
  itemList : any=[]; 
  itemArray : any = [];
  loadedItemList:  any=[]; 
  items : any = [];

  
  constructor( public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
    public navCtrl: NavController,
    private afs: AngularFirestore,
    public navParams : NavParams,
    public fireService : FireService
  ) {

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
      loadingPopup.dismiss();
    })
    console.log(this.loadedItemList)
    
   
}

ionViewWillEnter(){
  console.log('ionViewEnteredStockMangePage')
}

initializeItems(){
  this.itemList = this.loadedItemList;
}

getItems(searchbar) {
  // Reset items back to all of the items
  this.initializeItems();

  console.log(this.itemList)
  // set q to the value of the searchbar
  var q = searchbar.srcElement.value;
  // if the value is an empty string don't filter the items
  if (!q) {
    return;
  }
  this.itemList = this.itemList.filter((v) => {
    if(v.name && q) {
      if (v.name.toLowerCase().indexOf(q.toLowerCase()) > -1) {
        return true;
      }
      return false;
    }
  });

  console.log(q, this.itemList.length);
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
    code : item.code,
    name : item.name,
    location : item.location,
    quantity : item.quantity,
    id : item.id
  })
}

upDate(){
  //console.log(this.navCtrl.pop(name));
 console.log("임시버튼");
 if(this.navParams.get('status')){
   for(let upDate of this.itemArray){
     if(upDate.code==this.navParams.get('code')){
         // this.navCtrl.push('ChangeLogPage',{
         //   changed_name : upDate.name,
         //   changed_code : upDate.code,
         //   changed_location : upDate.location,
         //   changed_quantity : upDate.quantity
         // })
         console.log("임시")

         // this.new_item.code= this.navParams.get('code')
         // this.new_item.name= this.navParams.get('name');
         // this.new_item.location= this.navParams.get('location');
         // this.new_item.quantity= this.navParams.get('quantity');
         // this.fireService.modifyItems(this.new_item  );
         // this.navCtrl.pop()
         this.item.name=this.navParams.get('name');
         this.item.location=this.navParams.get('location');
         this.item.quantity=this.navParams.get('quantity');
         this.item.code=this.navParams.get('code');
         this.item.id=this.navParams.get('id');
         
         console.log("modify");
         console.log(this.item.id)
         this.fireService.modifyItems(this.item);
         this.navCtrl.pop()
         // upDate.name=this.navParams.get('name')
         // upDate.location=this.navParams.get('location')
         // upDate.quantity=this.navParams.get('quantity')
     }
   }
  }
}
  
  
 
}













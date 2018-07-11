
import firebase from 'firebase';
import {IonicPage } from 'ionic-angular';
import { Component } from '@angular/core';
import { NavController, LoadingController} from 'ionic-angular';
import { AlertController } from 'ionic-angular/components/alert/alert-controller';
import { AngularFirestore,  AngularFirestoreCollection } from 'angularfire2/firestore';
import { NavParams } from 'ionic-angular/navigation/nav-params';



interface Item{
  location1: any;
  location2: any;
  model: string;
  quantity : number;
}

@IonicPage()
@Component({
  selector: 'page-location-manage',
  templateUrl: 'location-manage.html',
})


export class LocationManagePage {
  private itemsCollection: AngularFirestoreCollection<Item>; 
  itemList : any=[]; 
  itemArray : any = [];
  loadedItemList:  any=[]; 

  itemList1 : any=[];
  itemList2 : any=[]; 
  itemArray2 : any = [];


  items : any = [];
  location: string;
  itemgetList : any=[];
  payload : any;

  location1: string;
  location2: string;

  constructor( public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
    public navCtrl: NavController,
    private afs: AngularFirestore,
    public navParams : NavParams
  ){

    this.payload = this.navParams.get('payload')
    // alert(this.payload)



    let loadingPopup = this.loadingCtrl.create({
      spinner: 'crescent', // icon style //
      content: '',
      duration: 1000
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

intersect() {
    var setA = new Set(this.itemList1);
    var setB = new Set(this.itemList2);
    this.itemList = new Set([setA].filter(x => setB.has(x)));
    console.log(this.itemList.location1);
    return this.itemList;

}


  goTo1(location1: string) {

    this.itemList = this.itemList.filter((eachItem)=>{
      if(eachItem.location1===location1){
        this.itemList1 = this.itemList;
        return true;
      }
      else  
        return false;
    })

    }


    goTo2(location2: string) {

      this.itemList = this.loadedItemList.filter((eachItem)=>{
        if(eachItem.location2===location2){
          this.itemList2 = this.itemList;
          return true;
        }
        else  
          return false;
      })
    
    }
  

    openDetail(item){
      this.navCtrl.push('ItemDetailPage',{
        code : item.code,
        name : item.name,
        location1 : item.location1,
        locatoin2 : item.location2,
        quantity : item.quantity
      })
    }


  }




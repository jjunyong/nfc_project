
import firebase from 'firebase';
import {IonicPage } from 'ionic-angular';
import { Component } from '@angular/core';
import { NavController, LoadingController} from 'ionic-angular';
import { AlertController } from 'ionic-angular/components/alert/alert-controller';
import { AngularFirestore,  AngularFirestoreCollection } from 'angularfire2/firestore';



interface Item{
  location1: any;
  location2: any;
  model: string;
  serialNum : string;
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
  items : any = [];

  constructor( public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
    public navCtrl: NavController,
    private afs: AngularFirestore
  ){

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
  
  initializeItems(){
    this.itemList = this.loadedItemList;
  }
  
   goTo(table: string) {

    this.initializeItems();

      let firestore = firebase.firestore();
      const itemRef = firestore.collection("item");
    
      var lists : Array <any>=[];
     
      itemRef.where("location", '==' , table)
      .get()
      .then(function(querySnapshot) {
          querySnapshot.forEach(function(doc) {
            lists.push(doc.data());    
          })
      });
  
      this.itemList = lists;

      console.log(this.itemList);
      
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




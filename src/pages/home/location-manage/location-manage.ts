import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFirestore } from 'angularfire2/firestore';
import firebase from 'firebase';


@IonicPage()
@Component({
  selector: 'page-location-manage',
  templateUrl: 'location-manage.html',
})
export class LocationManagePage {
    items: string[];    
    location: string;
    //table: {test};
  
    constructor(public navCtrl: NavController, public navParams: NavParams) {
      
    }
      

    goTo(table: string) {
      let firestore = firebase.firestore();
      const itemRef = firestore.collection("item");
    
      var product : Array <string>=[];
      itemRef.where("location", '==' , table)
      .get()
      .then(function(querySnapshot) {
          querySnapshot.forEach(function(doc) {
             product.push(doc.data().name);
        
          })
      });
  
      this.items = product;
      
    }

    choose(item){
      //선택된 아이템 상세정보로 넘어가게
    }
  }




import { Component, Injectable } from '@angular/core';
import { IonicPage, ToastController } from 'ionic-angular';
import { AngularFirestore } from 'angularfire2/firestore'


@Injectable()
export class FireService{

  constructor(public afs : AngularFirestore, public toast : ToastController){
  }


  itemAdd(item){
    this.afs.collection('item').add({
        name : item.name,
        quantity : item.quantity,
        location : item.location,
        code : item.code
    })

    this.afs.collection("log").add({
        itemName : item.name,
        code : item.code,
        type : "add",
        quantity : item.quantity,
        location : item.location, 
        timestamp : new Date()
      })
    
    let toast = this.toast.create({
            message: "succesfully added",
            duration: 2000,
            position: "bottom"
    });
    toast.present();
  }

}

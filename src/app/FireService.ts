import { Component, Injectable } from '@angular/core';
import { ToastController } from 'ionic-angular';
import { AngularFirestore } from 'angularfire2/firestore'


@Injectable()
export class FireService{

  constructor(public afs : AngularFirestore, public toast : ToastController){
  }


  LogAdd(RepairLog){
    console.log(RepairLog.code)
    this.afs.collection('RepairItem').doc(`${RepairLog.code}`).collection('repair').add({
        title : RepairLog.title,
        writer: RepairLog.writer,
        description: RepairLog.description
    })

    let toast = this.toast.create({
            message: "succesfully added",
            duration: 2000,
            position: "bottom"
    });
    toast.present();
  }

  RepairAdd(RepairItem){
    this.afs.collection('RepairItem').doc(`${RepairItem.code}`).set({
        name : RepairItem.name,
        model : RepairItem.model,
        repairman : RepairItem.repairman,
        code : RepairItem.code
    })

    this.afs.collection("repairlog").doc(`${RepairItem.code}`).set({
        itemName : RepairItem.name,
        code : RepairItem.code,
        type : "add",
        model : RepairItem.model,
        repairman : RepairItem.repairman, 
        timestamp : new Date()
      })
    
    let toast = this.toast.create({
            message: "succesfully added",
            duration: 2000,
            position: "bottom"
    });
    toast.present();
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

  getItems(){
    return this.afs.collection('item').valueChanges();
  }

  getLogs(){
    return this.afs.collection('repair_log').valueChanges();
  }

}

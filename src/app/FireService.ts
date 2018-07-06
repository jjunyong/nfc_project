import { Component, Injectable } from '@angular/core';
import { ToastController } from 'ionic-angular';
import { AngularFirestore } from 'angularfire2/firestore'


@Injectable()
export class FireService{

  constructor(public afs : AngularFirestore, public toast : ToastController){
  }




  LogAdd(RepairLog){
    console.log(RepairLog.id)
    this.afs.collection('RepairItem').doc(`${RepairLog.id}`).collection('repair').add({
        title : RepairLog.title,
        writer: RepairLog.writer,
        description: RepairLog.description,
        timestamp: new Date()

    })

    let toast = this.toast.create({
            message: "succesfully added",
            duration: 2000,
            position: "bottom"
    });
    toast.present();
  }

  RepairAdd(RepairItem){
    this.afs.collection('RepairItem').doc(`${RepairItem.id}`).set({
        serialNum : RepairItem.serialNum,
        model : RepairItem.model,
        repairman : RepairItem.repairman,
        id : RepairItem.id
    })

    this.afs.collection("repairlog").doc(`${RepairItem.id}`).set({
        serialNum : RepairItem.serialNum,
        id : RepairItem.id,
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
    const doc_id = this.afs.createId();

    this.afs.collection('item').doc(doc_id).set({
        name : item.name,
        quantity : item.quantity,
        location1 : item.location1,
        location2 : item.location2,
        code : item.code,
        id : doc_id,
        tiemstamp : new Date()
    })

    this.afs.collection("log").add({
        itemName : item.name,
        code : item.code,
        type : "add",
        quantity : item.quantity,
        location1 : item.location1, 
        location2 : item.location2,
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

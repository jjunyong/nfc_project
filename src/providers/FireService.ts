import { Injectable } from '@angular/core';
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

    const doc_id = this.afs.createId();

    this.afs.collection('item').doc(doc_id).set({
        model : item.model,
        quantity : item.quantity,
        location1 : item.location1,
        location2 : item.location2, 
        serialNum : item.serialNum,
        id : doc_id
    })

    this.afs.collection("log").add({
        itemModel : item.model,
        itemSerialNum : item.serialNum,
        type : "add",
        itemQuantity : item.quantity,
        itemLocation1 : item.location1, 
        itemLocation2 : item.location2,
        timestamp : new Date()
      })
    
    let toast = this.toast.create({
            message: "succesfully added",
            duration: 2000,
            position: "bottom"
    });
    toast.present();
  }

  modifyItems(new_item){
    this.afs.collection('item').doc(new_item.id).update({
      name : new_item.name,
      code : new_item.code,
      location1 : new_item.location1,
      location2 : new_item.location2,
      quantity : new_item.quantity

    })

  }

  getItems(){
    return this.afs.collection('item').valueChanges();
  }

  getLogs(){
    return this.afs.collection('repair_log').valueChanges();
  }

}

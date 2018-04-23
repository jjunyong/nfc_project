import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFirestore } from 'angularfire2/firestore'

/**
 * Generated class for the ManagePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-manage',
  templateUrl: 'manage.html',
})
export class ManagePage {

  name : string;
  quantity: number;
  location: string;

  constructor(public afs:AngularFirestore, public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ManagePage');
  }

  update(){
    const itemRef = this.afs.collection("item").add({
      // productCode : this.productCode,
      name : this.name,
      // classfication : this.classification,
      quantity : this.quantity,
      location : this.location
    }).then(()=>{
      alert("Data succesfully written!")
    }).catch((error)=>{
      alert("Error"+error)
    })


    this.navCtrl.pop()
  }

}

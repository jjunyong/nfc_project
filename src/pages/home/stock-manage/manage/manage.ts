import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController} from 'ionic-angular';
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
  code : string;

  constructor(public afs:AngularFirestore, public navCtrl: NavController, public navParams: NavParams,
              private toast: ToastController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ManagePage');
  }

  update(){
    this.code = Math.random().toString(36).substring(7)
    const itemRef = this.afs.collection("item").add({
      name : this.name,
      code : this.code,
      quantity : this.quantity,
      location : this.location
    }).then(()=>{

      this.afs.collection("log").add({
        itemName : this.name,
        code : this.code,
        type : "add",
        quantity : this.quantity,
        location : this.location, 
        timestamp : new Date()
      }).then(()=>{

        let toast = this.toast.create({
          message: "succesfully added",
          duration: 2000,
          position: "bottom"
        });
        toast.present();
      })
    }).catch((error)=>{
      alert("Error"+error)
    })


    


    this.navCtrl.pop()
  }

}

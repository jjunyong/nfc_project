import { Component  } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController,LoadingController, AlertController } from 'ionic-angular';
import 'rxjs/add/operator/map'; // you might need to import this, or not depends on your setup
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from 'angularfire2/firestore';

interface RepairItemLog{
  title: string,
  writer: string,
  description: string;
}

@IonicPage()
@Component({
  selector: 'page-timeline',
  templateUrl: 'timeline.html'
})
export class TimelinePage {

  private itemsCollection: AngularFirestoreCollection<RepairItemLog>; 


  timeline: AngularFirestoreDocument<any[]>;
  feedView: string = "activity";


  itemList : any=[]; 
  itemArray : any = [];
  loadedItemList:  any=[]; 
  items : any = [];
  code : string;


  constructor( public loadingCtrl: LoadingController,
    public navCtrl: NavController,
    private afs: AngularFirestore,
    public alertCtrl: AlertController,
    public navParams: NavParams
  ) {

    this.code = this.navParams.get('code');

    let loadingPopup = this.loadingCtrl.create({
      spinner: 'crescent', // icon style //
      content: '',
    });
    loadingPopup.present();

    this.itemsCollection = afs.collection('RepairItem').doc(this.code).collection('Log')
    this.items= this.itemsCollection.valueChanges()
    


   this.items.subscribe((RepairItem)=>{
        this.itemArray = RepairItem;
        this.itemList = this.itemArray;
        this.loadedItemList = this.itemArray;
        loadingPopup.dismiss();
      });
    

    console.log(this.loadedItemList)

    }

    
}

import { Component, ChangeDetectorRef } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFirestore } from 'angularfire2/firestore'

/**
 * Generated class for the ItemDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-item-detail',
  templateUrl: 'item-detail.html',
})


export class ItemDetailPage {
  showToolbar:boolean = false;
  transition:boolean = false;

  serialNum:any;
  model :string;
  location1: any;
  location2: any;
  quantity:any;
  id : string;

  public pre_serialNum:any;
  public pre_model :any;
  public pre_location1 : any;
  public pre_location2 : any;
  public pre_quantity : any;
  public pre_id: any;
  public changed_quantity : any;


  constructor(public navCtrl: NavController, public navParams: NavParams,
    public ref: ChangeDetectorRef,public afs : AngularFirestore) {
      this.serialNum = this.navParams.get('serialNum');
      this.model = this.navParams.get('model');
      this.location1 = this.navParams.get('location1');
      this.location2 = this.navParams.get('location2');
      this.quantity = this.navParams.get('quantity');
      this.id=this.navParams.get('id');
      //console.log("done")
      this.pre_quantity=this.quantity
      this.pre_id=this.id
      this.pre_location1=this.location1
      this.pre_location2=this.location2
      this.pre_model=this.model
      this.pre_serialNum=this.serialNum

     // console.log(this.pre_quantity)

      
      
  }



  ionViewDidLoad() {
    
    console.log('ionViewDidLoad ItemDetailPage');
  }

  onScroll($event: any){
    let scrollTop = $event.scrollTop;
    this.showToolbar = scrollTop >= 100;
    if(scrollTop < 0){
        this.transition = false;
        //this.headerImgSize = `${ Math.abs(scrollTop)/2 + 100}%`;
    }else{
        this.transition = true;
       // this.headerImgSize = '100%'
    }
    this.ref.detectChanges();
  }

  modify(){

  }

  confirm(){
    console.log("testing")
    console.log(this.pre_quantity, this.quantity)
    console.log("testing end")

    this.afs.collection('item').doc(this.id).update({
      model : this.model,
      serialNum : this.serialNum,
      location1 : this.location1,
      location2 : this.location2,
      quantity : this.quantity,
      timestamp : new Date()
    })
    
    this.changed_quantity=this.quantity-this.pre_quantity
    if((this.pre_location1!=this.location1)||(this.pre_location2!=this.location2)){
      const doc_id = this.afs.createId();
      this.afs.collection("location_changed").add({
        model : this.model,
        serialNum : this.serialNum,
        type : "location_changed",
        quantity : this.quantity,
        location1 : this.location1, 
        location2 : this.location2,
        timestamp : new Date(),
        import_quantity : this.changed_quantity,
        id : doc_id
      })

      this.afs.collection("log").add({
        model : this.model,
        serialNum : this.serialNum,
        type : "location_changed",
        quantity : this.quantity,
        location1 : this.location1, 
        location2 : this.location2,
        timestamp : new Date(),
        import_quantity : this.changed_quantity,
        id : doc_id
      })
    
    }
      
    


    if(this.changed_quantity>0){
      const doc_id = this.afs.createId();
    this.afs.collection("import").add({
      model : this.model,
      serialNum : this.serialNum,
      type : "import",
      quantity : this.quantity,
      location1 : this.location1, 
      location2 : this.location2,
      timestamp : new Date(),
      import_quantity : this.changed_quantity,
      id : doc_id

    })
    this.afs.collection("log").add({
      model : this.model,
      serialNum : this.serialNum,
      type : "import",
      quantity : this.quantity,
      location1 : this.location1, 
      location2 : this.location2,
      timestamp : new Date(),
      import_quantity : this.changed_quantity,
      id : doc_id
    })
  
  
  }
    else{
      const doc_id = this.afs.createId();
    this.afs.collection("export").add({
        model : this.model,
        serialNum : this.serialNum,
        type : "export",
        quantity : this.quantity,
        location1 : this.location1, 
        location2 : this.location2,
        timestamp : new Date(),
        export_quantity : this.changed_quantity,
        id : doc_id
    })
    this.afs.collection("log").add({
      model : this.model,
      serialNum : this.serialNum,
      type : "export",
      quantity : this.quantity,
      location1 : this.location1, 
      location2 : this.location2,
      timestamp : new Date(),
      import_quantity : this.changed_quantity,
      id : doc_id
    })
  }

    
    
    this.navCtrl.push('StockManagePage',{
      serialNum : this.serialNum,
      model : this.model,
      location1 : this.location1,
      location2 : this.location2,
      quantity : this.quantity, 
      id : this.id,
      status : true
    })
  }

}

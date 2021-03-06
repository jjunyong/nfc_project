import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { QrcodePage } from './qrcode';
import { NgxQRCodeModule} from 'ngx-qrcode2'
import { BarcodeScanner} from '@ionic-native/barcode-scanner'

@NgModule({
  declarations: [
    QrcodePage,
  ],
  imports: [
    IonicPageModule.forChild(QrcodePage),
    NgxQRCodeModule
  ],
  providers:[
    BarcodeScanner
  ]
})
export class QrcodePageModule {}

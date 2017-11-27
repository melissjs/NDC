import { Component } from '@angular/core';

/**
https://www.techiediaries.com/barcode-qr-code-scanner-encoder-ionic-3/
 */
@Component({
  selector: 'qr-code-scan',
  templateUrl: 'qr-code-scan.html'
})
export class QrCodeScanComponent {

  text: string;

  constructor() {
    console.log('Hello QrCodeScanComponent Component');
    this.text = 'Hello World';
  }

}

import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { ToastController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { concat } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SocketService {
  deviceSTR: String;
  isConnected: Boolean;
  constructor(private socket: Socket, private toastCtrl: ToastController, private alertCtrl: AlertController, ) {
    this.isConnected = false;
  }
  connect() {
    if (!this.isConnected) {
      this.socket.connect();
      this.isConnected = true;
    }
  }

  disconnect() {
    if (this.isConnected) {
      this.socket.disconnect();
      this.isConnected = false;
    }
  }

  getSocket() {
    return this.socket;
  }

  error() {
    this.socket.fromEvent('error' + String(this.deviceSTR)).subscribe((data: any) => {
      this.presentAlert(data.msg, 'Error');
    });
  }

  createDeviceString() {
    this.deviceSTR = this.makeRandom();
    // console.log('in socket/socket.service create: ', this.deviceSTR)
  }

  getDeviceString() {
    if (!this.deviceSTR) {
      this.createDeviceString();
    }
    // console.log('in socket/socket.service get: ', this.deviceSTR)
    // alert('get device STR')
    return this.deviceSTR;
  }

  makeRandom() {
    let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890,./;'[]\=-)(*&^%$#@!~`";
    const lengthOfCode = 40;
    let text = "";
    for (let i = 0; i < lengthOfCode; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
  }

  async presentAlert(msg, header) {
    const alert = await this.alertCtrl.create({
      header: header,
      // subHeader: 'Subtitle',
      message: msg,
      buttons: ['OK'],
    });

    await alert.present();
    let result = await alert.onDidDismiss();
    // console.log(result);
  }
}

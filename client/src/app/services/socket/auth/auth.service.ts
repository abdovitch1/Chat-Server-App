import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { AlertController } from '@ionic/angular';
import { SocketService } from '../socket.service';

import * as io from 'socket.io-client';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  deviceSTR: String;
  isAuth: boolean;
// https://us-central1-ionic-chat-59369.cloudfunctions.net/app
// http://192.168.1.5:3000
  private url = 'https://b070f633.ngrok.io/';
  private socketClient;  

  constructor(
      private socket: Socket,
      private alertCtrl: AlertController,
    ) {
    this.deviceSTR = this.getDeviceSTR();
    this.isAuth = false;//path: '/app/socket.io',,{ transports: ['websocket', 'polling', 'flashsocket']}
    // this.socketClient = io(this.url,{ transports: ['websocket', 'polling', 'flashsocket']} );
    // this.socketClient.connect();
    // if(this.socketClient.connected){
    //   console.log('true')
    // }else{
    //   console.log('false')
    // }
  }
  
  login(userData: any) {
    userData.deviceSTR = this.deviceSTR;
    this.socket.connect();
    this.socket.emit('login', userData);
    // this.socketClient.emit('login', userData);
  }

  signUp(userData: any) {
    userData.deviceSTR = this.deviceSTR;
    // console.log('user data in signup service: ',userData)
    this.socket.connect();
    this.socket.emit('signUp', userData);
    // this.socketClient.emit('signUp', userData);
  }

  checkUserName(userName: String) {
    var userData = {
      deviceSTR: this.deviceSTR,
      userName: userName
    }
    this.socket.connect();
    this.socket.emit('check-user-name', userData);
    // this.socketClient.emit('check-user-name', userData);
  }

  letNewKnowMe(myData, hisName){
    this.socket.connect();
    this.socket.emit('addEachOther', {myData, hisName});
    // this.socketClient.emit('addEachOther', {myData, hisName});
  }

  goOnline(userData){
    userData.deviceSTR = this.deviceSTR;
    this.socket.connect();
    this.socket.emit('goOnline', userData);
  }

  logout(userName){
    this.socket.connect();
    this.socket.emit('logout', {userName});
  }


  createDeviceString() {
    this.deviceSTR = this.makeRandom();
  }
  getDeviceSTR() {
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

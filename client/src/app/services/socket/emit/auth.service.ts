import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { AlertController } from '@ionic/angular';
import { SocketService } from '../socket.service';
import { NavController } from '@ionic/angular';
import * as authSocketServListen from '../listen/auth.service';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  deviceSTR: String;

  constructor(
    private socket: Socket,
    private socketServ: SocketService,
    private navController: NavController,
    private authSocketServListen: authSocketServListen.AuthService
  ) {
    this.deviceSTR = this.socketServ.getDeviceString();
    // this.socketServ.connect();
    // this.socket.connect();
  }

  login(userData: any) {
    userData.deviceSTR = this.deviceSTR;
    console.log('emit: login : userData', userData)
    this.socket.connect()
    this.socket.emit('login', userData);
  }

  signUp(userData: any) {
    userData.deviceSTR = this.deviceSTR;
    this.socket.emit('signUp', userData);
  }

  checkUserName(userName: String) {
    var userData = {
      deviceSTR: this.deviceSTR,
      userName: userName
    }
    this.socket.emit('check-user-name', userData);
  }

  letNewKnowMe(myData, hisName){
    this.socket.emit('addEachOther', {myData, hisName});
  }

  goOnline(userData){
    userData.deviceSTR = this.deviceSTR;
    this.socket.emit('goOnline', userData);
  }

  logout(userName){
    this.socket.emit('logout', {userName});
    this.authSocketServListen.saveData();
    this.navController.navigateBack('/home');
  }

  sendMessege(messege, deviceSTR){
    var currentUser = this.authSocketServListen.getUser();
    this.socket.emit('send-messege',{ messege,deviceSTR, userName: currentUser.userName});
  }

  










}

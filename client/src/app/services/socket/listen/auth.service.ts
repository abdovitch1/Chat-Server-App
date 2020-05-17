import { Injectable } from '@angular/core';
import { StorageService } from '../../storage/storage.service';
import { NavController } from '@ionic/angular';
import * as socketInd from '../socket.service'
import { Socket } from 'ngx-socket-io';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  onlineNotFriends = [];
  friends = [];
  thisUser = { userName: '', id: -1, name: '', pass: '' };
  deviceSTR: String;
  constructor(
    private socket: Socket,
    private socketInd: socketInd.SocketService,
    private storage: StorageService,
  ) {
    this.deviceSTR = this.socketInd.getDeviceString();
  }

  login() {
    return this.socket.fromEvent('login--' + String(this.deviceSTR));
  }

  addMeToNewUsers() {
    return this.socket.fromEvent('userOnline');
  }

  addUsersToMe() {
    return this.socket.fromEvent(String(this.deviceSTR));
  }

  logout() {
    return this.socket.fromEvent('logout');
  }

  checkUserName() {
    return this.socket.fromEvent('check-user-name--' + this.deviceSTR);
  }

  async saveData() {
    await this.storage.saveIsLoged(false);
    await this.storage.saveUser(this.thisUser)
    await this.storage.saveFriends(this.friends, this.thisUser.userName);
    this.onlineNotFriends = [];
    this.friends = [];
    this.thisUser = { userName: '', id: -1, name: '', pass: '' };
  }

  getMessege() {
    return this.socket.fromEvent(String(this.deviceSTR) + '--Messege');
  }

  error(){
    return this.socket.fromEvent('error' + String(this.deviceSTR));
  }

  socketConnect(){
    this.socket.connect();
  }
  socketDisconnect(){
    this.socket.disconnect();
  }

}

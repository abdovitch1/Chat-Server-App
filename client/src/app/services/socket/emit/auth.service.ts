import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import * as socketInd from '../socket.service'

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  deviceSTR: String;
  // socket;

  constructor(
    private socket: Socket,
    private socketInd: socketInd.SocketService
  ) {
    this.socket = socketInd.getSocket();
  }

  login(userData: any) {
    this.socket.emit('login', userData);
  }

  signUp(userData: any) {
    this.socket.emit('signUp', userData);
  }

  checkUserName(userData) {
    this.socket.emit('check-user-name', userData);
  }

  letNewKnowMe(myData, hisName) {
    this.socket.emit('addEachOther', { myData, hisName });
  }

  goOnline(userData) {
    this.socket.emit('goOnline', userData);
  }

  logout(userName) {
    this.socket.emit('logout', { userName });
  }

  sendMessege(data) {
    this.socket.emit('send-messege', data);
  }
}

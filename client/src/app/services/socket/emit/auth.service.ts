import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  deviceSTR: String;

  constructor(
    private socket: Socket,
  ) {}

  login(userData: any) {
    // console.log('in emit: login userData',userData)
    this.socket.emit('login', userData);
  }

  signUp(userData: any) {
    this.socket.emit('signUp', userData);
  }

  checkUserName(userData) {
    this.socket.emit('check-user-name', userData);
  }

  letNewKnowMe(myData, hisName){
    this.socket.emit('addEachOther', {myData, hisName});
  }

  goOnline(userData){
    this.socket.emit('goOnline', userData);
  }

  logout(userName){
    // console.log('authServiceEmit, Logout: ',userName)
    this.socket.emit('logout', {userName});
  }

  sendMessege(data){
    this.socket.emit('send-messege',data);
  }
}

import { Injectable } from '@angular/core';
import { SocketService } from '../socket.service';
import { Socket } from 'ngx-socket-io';
import { StorageService } from '../../storage/storage.service';
// import * as AuthServiceEmit from '../emit/auth.service';
import { NavController } from '@ionic/angular';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of'

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  onlineNotFriends = [];
  friends = [];
  thisUser = { userName: '', id: -1, name: '', pass: '' };
  deviceSTR: String;
  constructor(
    private socketServ: SocketService,
    private socket: Socket,
    private storage: StorageService,
    // private authServEmit: AuthServiceEmit.AuthService,
    private navController: NavController
  ) {
    this.deviceSTR = this.socketServ.getDeviceString();
    this.socket.connect();
  }

  setUser(user){
    this.thisUser = user;
  }
  getUser() {
    return this.thisUser;
  }
  setFriends(friends){
    this.friends = friends;
  }
  getFriends() {
    return this.friends
  }
  getOnlinePeaple() {
    return this.onlineNotFriends;
  }

  login() {
    return this.socket.fromEvent('login--' + String(this.deviceSTR)).subscribe((data: any) => {
      console.log('login in service listen')
      this.storage.saveUser(data.userData);
      this.thisUser = data.userData;
      this.storage.saveIsLoged(true);
      this.storage.saveLastLogUser(this.thisUser.userName)
      this.navController.navigateForward('/app-home')
    });
  }

  addMeToNewUsers() {
    return this.socket.fromEvent('userOnline').subscribe((data: any) => {
      if (data.userData.userName !== this.thisUser.userName) {
        var newUser: any = this.friends.find(item => item.userName == data.userData.userName);
        if (newUser) {
          newUser.isActive = true;
        } else {
          newUser = this.onlineNotFriends.find(item => item.userName == data.userData.userName);
          if (!newUser) {
            data.userData.newMessege = [];
            data.userData.messeges = [];
            this.onlineNotFriends.push(data.userData);
            var myData = {
              id: this.thisUser.id,
              userName: this.thisUser.userName,
              name: this.thisUser.name,
              deviceSTR: this.deviceSTR
            }
            // this.authServEmit.letNewKnowMe(myData, data.userData.deviceSTR);
            // letNewKnowMe(myData, hisName){
              this.socket.emit('addEachOther', {myData, hisName: data.userData.deviceSTR});
            // }
          }
        }
      }
    });
  }

  addUsersToMe() {
    return this.socket.fromEvent(String(this.deviceSTR)).subscribe((data: any) => {
      var newUser: any = this.friends.find(item => item.userName == data.userName);
      if (newUser) {
        newUser.isActive = true;
      }

      else {
        newUser = this.onlineNotFriends.find(item => item.userName == data.userName);
        if (!newUser) {
          data.newMessege = [];
          data.messeges = [];
          this.onlineNotFriends.push(data);
        }
      }
    })
  }

  logout() {
    return this.socket.fromEvent('logout').subscribe((data: any) => {
      console.log('logout in service listen')
      let index1 = this.friends.findIndex(d => d.userName == data.userName);
      this.friends.splice(index1, 1)
      console.log('logout this.onlineNotFriends', this.onlineNotFriends)

      let index = this.onlineNotFriends.findIndex(d => d.userName == data.userName);
      this.onlineNotFriends.splice(index, 1)
      console.log('logout this.onlineNotFriends', this.onlineNotFriends)
    })
  }

  async checkUserName() {
    await this.socket.fromEvent('check-user-name--' + this.deviceSTR).subscribe((data: any) => {
      if (data.msg) {
        return true;
      }
      else {
        this.socketServ.presentAlert('This user name is already exist!', 'Error');
        return false;
      }
    })
    return true
  }

  async saveData() {
    await this.storage.saveIsLoged(false);
    await this.storage.saveUser(this.thisUser)
    await this.storage.saveFriends(this.friends,this.thisUser.userName);
    this.onlineNotFriends = [];
    this.friends = [];
    this.thisUser = { userName: '', id: -1, name: '', pass: '' };
  }

  getMessege(){
    return this.socket.fromEvent(String(this.deviceSTR) + '--Messege').subscribe((data: any) => {
      var messege = data.messege;
      var userName = data.userName;
      var createdDate = data.createdDate;

      let index1 = this.friends.findIndex(d => d.userName == userName);
      if(index1 !== -1){  
        this.friends[index1].newMessege.push({messege, createdDate, owner: 'other'})
        this.friends[index1].messeges.push({messege, createdDate, owner: 'other'})
      }

      let index = this.onlineNotFriends.findIndex(d => d.userName == userName);
      if(index !== -1){
        this.onlineNotFriends[index].newMessege.push({messege, createdDate, owner: 'other'})
        this.onlineNotFriends[index].messeges.push({messege, createdDate,owner: 'other'})
      }
    })
  }

  newMessegeRead(userName){
    let index1 = this.friends.findIndex(d => d.userName == userName);
      if(index1 !== -1){  
        console.log('f index1: ',this.friends[index1])
        this.friends[index1].newMessege = [];
      }

      let index = this.onlineNotFriends.findIndex(d => d.userName == userName);
      if(index !== -1){
        console.log('f index: ',this.friends[index])
        this.onlineNotFriends[index].newMessege = [];
      }
  }

}

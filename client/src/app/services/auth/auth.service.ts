import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import * as socketServEmit from '../socket/emit/auth.service';
import * as socketServListen from '../socket/listen/auth.service';

import * as storageServ from '../storage/storage.service';
import { AlertController } from '@ionic/angular';
import * as socketIndex from '../socket/socket.service'
import { concat } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private socketServEmit: socketServEmit.AuthService,
    private socketServListen: socketServListen.AuthService,
    private storageServ: storageServ.StorageService,
    private socketServIndex: socketIndex.SocketService,
    private router: Router,
    private alertCtrl: AlertController
  ) {
  this.deviceSTR = this.socketServIndex.getDeviceString();
    this.friends = [];
    this.OnlineNotFriends= [];
  }

  user: any;
  friends: Array<any>;
  OnlineNotFriends: Array<any>;
  deviceSTR;// = this.socketServIndex.getDeviceString();

  login(userData?: any) {
    // console.log('login in servInd: ',userData)
    if (userData) {
      userData.deviceSTR = this.deviceSTR;
      // console.log('login in servInd: deviceSTR: ',this.deviceSTR)
      this.socketServEmit.login(userData);
      return;
    }
    // console.log('d5l fel login')
    if (this.user) {
      // console.log('this.user: in login: ', this.user)
      this.router.navigate(['/app-home'],{ replaceUrl: true });
      return;
    }

    this.storageServ.isLoged().then(isLoged => {
      if (isLoged) {
        // console.log('isLoged: ', isLoged)
        this.storageServ.getLastLogUserName().then(userName => {
          // console.log('userName: ', userName)
          this.storageServ.getUser(userName).then(user => {
            // console.log('user: ', user)
            this.user = user;
            this.user.deviceSTR = this.deviceSTR;
            var userData = {
              userName: user.userName,
              id: user.id,
              name: user.name,
              deviceSTR: this.user.deviceSTR
            }
            this.socketServEmit.goOnline(userData);
            this.router.navigate(['/app-home'],{ replaceUrl: true });

          }).catch(err => {
            console.log('3-error: ', err)
            this.router.navigate(['/home'],{ replaceUrl: true });
          })
        }).catch(err => {
          console.log('2-error: ', err)
          this.router.navigate(['/home'],{ replaceUrl: true });
        })
      }
      else {
        this.router.navigate(['/home'],{ replaceUrl: true });
      }
    }).catch(err => {
      console.log('1-error: ', err);
      this.router.navigate(['/home'],{ replaceUrl: true });
    })

    // this.storageServ.isLoged().then(isLoged => {
    //   if (isLoged) {
    //     console.log('isLoged: ', isLoged)
    //     return this.storageServ.getLastLogUserName();
    //   }
    // }).then(userName => {
    //   console.log('userName: ', userName)
    //   if (userName) {
    //     return this.storageServ.getUser(userName);
    //   }
    // }).then(user => {
    //   console.log('user: ', user)
    //   if (user) {
    //     this.user = user;
    //     this.user.deviceSTR = this.deviceSTR;
    //     var userData = {
    //       userName: user.userName,
    //       id: user.id,
    //       name: user.name,
    //       deviceSTR: this.user.deviceSTR
    //     }
    //     this.socketServEmit.goOnline(userData);
    //     this.router.navigate(['/app-home']);
    //     return this.storageServ.getFriends(this.user.userName);
    //   }
    // }).catch(err => {
    //   console.log('error in login : ', err);
    //   this.router.navigate(['/home']);
    // }).then(friends => {
    //   console.log('friends: ', friends)
    //   if (friends) {
    //     this.friends = friends;
    //   }
    //   return this.storageServ.getOtherFriendsHasMSG(this.user.userName)
    // }).then(otherFriends => {
    //   console.log('otherFriends: ', otherFriends)
    //   if (otherFriends) {
    //     this.OnlineNotFriends = otherFriends;
    //   }
    // })
  }

  signUp(userData: any) {
    userData.deviceSTR = this.deviceSTR;
    this.socketServEmit.signUp(userData);
  }

  logout(isLoged) {
    var copyUser = JSON.parse(JSON.stringify(this.user));
    // var copyFriends = [...copyFriends];
    this.socketServEmit.logout(copyUser.userName);
    // this.storageServ.saveIsLoged(isLoged);
    // this.storageServ.saveFriends(copyFriends, copyUser.userName);
    this.storageServ.saveUser(copyUser)
    if (!isLoged) {
      this.user = undefined;
      this.friends = [];
      this.OnlineNotFriends = [];
      // this.deviceSTR = '';
    }
    this.router.navigate(['/home'],{ replaceUrl: true });
  }

  checkUserName(userName: String) {
    var userData = {
      deviceSTR: this.deviceSTR,
      userName: userName
    }
    this.socketServEmit.checkUserName(userData);
  }

  getUser() {
    return this.user;
  }

  getFriends() {
    return this.friends;
  }

  addToFriends(friend: any) {
    var newUser = this.friends.find(f => f.userName == friend.userName);
    if (!newUser) {
      this.friends.push(friend);
    }
  }

  getOnlineNotFriends() {
    return this.OnlineNotFriends;
  }

  addToOnlineNotFriends(friend: any) {
    var newUser = this.OnlineNotFriends.find(f => f.userName == friend.userName);
    if (!newUser) {
      friend.newMessege = [];
      friend.messeges = [];
      friend.isActive = true;
      this.OnlineNotFriends.push(friend);
    } else {
      newUser.isActive = true;
    }
  }

  sendMessege(msg, friendDeviceStr) {
    var jsonData = {
      messege: msg,
      deviceSTR: friendDeviceStr,
      userName: this.user.userName
    }
    this.socketServEmit.sendMessege(jsonData);
  }

  loginListen() {
    this.socketServListen.login().subscribe((data: any) => {
      console.log('loginListen: data',data )
      this.user = data.userData;

      this.storageServ.saveIsLoged(true)
      this.storageServ.saveUser(this.user)

      this.storageServ.getFriends(this.user.userName).then(friends => {
        if (friends) {
          this.friends = friends;
        }
      }).catch(err => {
        console.log('error in loginListen: ', err)
        this.friends = [];
      })

      this.router.navigate(['/app-home'],{ replaceUrl: true });

    })
  }

  NewUserHasCome() {
    this.socketServListen.addMeToNewUsers().subscribe((data: any) => {
      console.log('NewUserHasCome: data',data)
      if (data.userData.userName !== this.user.userName) {
        var newUser = this.friends.find(friend => friend.userName == data.userData.userName);
        if (!newUser) {
          this.addToOnlineNotFriends(data.userData);
        }else{
          newUser.isActive = true;
        }
        var myData = {
          id: this.user.id,
          userName: this.user.userName,
          name: this.user.name,
          deviceSTR: this.deviceSTR
        }
        var hisName = data.userData.deviceSTR;
        this.socketServEmit.letNewKnowMe(myData, hisName)

      }
    })
  }

  addUsersToMe() {
    this.socketServListen.addUsersToMe().subscribe((data: any) => {
      console.log('addUsersToMe: data',data)
      var newUser: any = this.friends.find(item => item.userName == data.userName);
      if (!newUser) {

        newUser = this.OnlineNotFriends.find(item => item.userName == data.userName);
        if (!newUser) {
          this.addToOnlineNotFriends(data)
        }
      }
    })
  }

  FriendLogout() {
    this.socketServListen.logout().subscribe((data: any) => {
      console.log('FriendLogout: data',data)
      let indFriend = this.friends.findIndex(d => d.userName == data.userName);
      if (indFriend != -1) this.friends[indFriend].isActive = false;

      let OtherFInd1 = this.OnlineNotFriends.findIndex(d => d.userName == data.userName);
      if (OtherFInd1 != -1) {
        // this.friends[OtherFInd1].isActive = false;
        if (this.OnlineNotFriends[OtherFInd1].newMessege.length == 0) {
          this.OnlineNotFriends.splice(OtherFInd1, 1);
        }
        else {
          this.OnlineNotFriends[OtherFInd1].isActive = false;
          // this.storageServ.saveOtherFriendsHasMSG(this.OnlineNotFriends[OtherFInd1], this.user.userName);
        }
      }

    })
  }

  checkUserNameResponse() {
    return this.socketServListen.checkUserName()//.subscribe((data: any) => {
    //   console.log('ServInd checkUserNameResponse: ', data)
    //   if (data.msg) {
    //     bool = true;
    //     return true;

    //   } else {
    //     this.presentAlert('This user name is already exist!', 'Error');
    //     bool = false;
    //     return false
    //   }
    // })
    // return bool
  }

  getMessege() {
    this.socketServListen.getMessege().subscribe((data: any) => {
      console.log('getMessege: data', data)
      var messege = data.messege;
      var userName = data.userName;
      var createdDate = data.createdDate;

      let indFriend = this.friends.findIndex(d => d.userName == userName);
      console.log('getMessege: this.friends', this.friends)
      console.log('getMessege: indFriend', indFriend)
      if (indFriend !== -1) {
        console.log('getMessege: this.friends[indFriend]', this.friends[indFriend])
        this.friends[indFriend].newMessege.push({ messege, createdDate, owner: 'other' })
        // this.friends[indFriend].messeges.push({ messege, createdDate, owner: 'other' })
      }

      let index = this.OnlineNotFriends.findIndex(d => d.userName == userName);
      console.log('getMessege: this.OnlineNotFriends', this.OnlineNotFriends)
      console.log('getMessege: index', index)
      if (index !== -1) {
        console.log('getMessege: this.OnlineNotFriends[index]', this.OnlineNotFriends[index])
        this.OnlineNotFriends[index].newMessege.push({ messege, createdDate, owner: 'other' })
        // this.OnlineNotFriends[index].messeges.push({ messege, createdDate, owner: 'other' })
      }
    })
  }

  getError() {
    this.socketServListen.error().subscribe((data: any) => {
      this.presentAlert(data.msg, 'Error');
    })
  }

  chooseChat(friendData){
    var ind = this.OnlineNotFriends.indexOf(friendData);
    if (ind != -1) {
      console.log()
      var becomeFriend = JSON.parse(JSON.stringify(this.OnlineNotFriends[ind]));
      
      this.OnlineNotFriends.splice(ind, 1);
      this.friends.push(becomeFriend);
      console.log('becomeFriend: ',becomeFriend)
    }
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

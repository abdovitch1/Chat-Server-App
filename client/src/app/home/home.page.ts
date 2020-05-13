import { Component, OnInit } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { ToastController } from '@ionic/angular';
import { StorageService } from '../services/storage/storage.service';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { concat } from 'rxjs';
import * as authSocketListen from '../services/socket/listen/auth.service'
import * as authSocketEmit from '../services/socket/emit/auth.service'
import { SocketService } from '../services/socket/socket.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  message = '';
  messages = [];
  currentUser = '';

  // onlineNotFriends = [];
  // friends = [];
  // thisUser = { userName: '', id: -1, name: '', pass: '' };
  // specificChat;

  haveAcc = true;

  // deviceSTR;
  // atHome= false;
  // userName: String;
  onNotify() {
    this.haveAcc = !this.haveAcc;
  }

  constructor(
    private socket: Socket,
    private toastCtrl: ToastController,
    private storage: StorageService,
    private authSocketListen: authSocketListen.AuthService,
    private authSocketEmit: authSocketEmit.AuthService,
    private socketSetv: SocketService,
    private router: Router
  ) {
    this.storage.isLoged().then(isLoged => {
      console.log('is loged: ', isLoged)
      if (isLoged) {
        this.storage.getLastLogUserName().then(userName => {
          this.storage.getUser(userName).then(user => {
            if (user) {
              this.authSocketListen.setUser(user);
              this.authSocketEmit.goOnline({ userName: user.userName, id: user.id, name: user.name });
              this.storage.getFriends(userName).then(friends => {
                if (friends) {
                  this.authSocketListen.setFriends(friends);
                }
              })//.catch(err => {
              //   console.log('1gab err: ', err)
              // })
              this.router.navigate(['/app-home']);
            }
          })//.catch(err => {
          //   console.log('2gab err: ', err)
          // })
        })//.catch(err => {
        //   console.log('3gab err', err)
        // })
      }
    })
  }

  onLogout() {
    // var userName = this.thisUser.userName;
    // this.onlineNotFriends = [];
    // this.friends = [];
    // this.thisUser = { userName: '', id: -1, name: '', pass: '' };
    // this.storage.saveIsLoged(false);
    // this.atHome = false;
    // console.log('onLogout',userName)
    // this.authServ.logout(userName);
  }

  ngOnInit() {
    this.authSocketListen.login();
    this.socketSetv.error();
    // this.deviceSTR = this.authServ.getDeviceSTR();

    // this.socket.fromEvent('login--' + String(this.deviceSTR)).subscribe((data: any) => {
    //   console.log('in login-- data:', data)
    //   console.log('in login-- this.userName:', this.userName)
    //   this.storage.saveUser(data.userData);
    //   this.thisUser = data.userData;
    //   this.storage.saveIsLoged(true);
    //   this.storage.saveLastLogUser(this.thisUser.userName)
    //   this.userName =this.thisUser.userName;
    //   this.atHome = true;
    //   console.log('in login-- this.userName:', this.userName.length)
    // });

    // this.socket.fromEvent('error' + String(this.deviceSTR)).subscribe((data: any) => {
    //   this.authServ.presentAlert(data.msg, 'Error');
    // });

    // this.socket.fromEvent('userOnline').subscribe((data: any) => {
    //   console.log('d5l f user online', data)
    //   // console.log('data.userName: ', data.userName)
    //   // console.log('this.thisUser.userName: ', this.thisUser.userName)
    //   if (data.userData.userName !== this.thisUser.userName) {
    //     var newUser = this.friends.find(item => item.userName == data.userData.userName);
    //     // console.log('1-newUser: ', newUser)
    //     if (newUser) {
    //       newUser.isActive = true;
    //     } else {
    //       newUser = this.onlineNotFriends.find(item => item.userName == data.userData.userName);
    //       // console.log('2-newUser: ', newUser)
    //       if (!newUser) {
    //         // console.log('onlineNotFriends', this.onlineNotFriends)
    //         this.onlineNotFriends.push(data.userData);
    //         // console.log('onlineNotFriends', this.onlineNotFriends)

    //         var myData = {
    //           id: this.thisUser.id,
    //           userName: this.thisUser.userName,
    //           name: this.thisUser.name
    //         }
    //         // console.log('3-newUser: ', myData)
    //         console.log('4-username: ', data.userData.deviceSTR)
    //         this.authServ.letNewKnowMe(myData, data.userData.deviceSTR);
    //       }
    //     }
    //   }
    // });
    // // this.userName =this.thisUser.userName;
    // console.log('the userName: ', String(this.deviceSTR))
    // this.socket.fromEvent(String(this.deviceSTR)).subscribe((data: any) => {
    //   console.log('my userName: ', this.thisUser.userName)
    //   console.log('data: ', data)
    //   var newUser = this.friends.find(item => item.userName == data.userName);
    //   if (newUser) {
    //     newUser.isActive = true;
    //   }

    //   else {
    //     newUser = this.onlineNotFriends.find(item => item.userName == data.userName);
    //     if (!newUser) {
    //       this.onlineNotFriends.push(data);
    //     }
    //   }
    // })

    // this.socket.fromEvent('logout').subscribe((data: any) => {
    //   console.log('logout: ', data)
    //   this.friends = this.friends.filter(function (item) {
    //     return item.userName !== data.userName;
    //   });
    //   this.onlineNotFriends = this.onlineNotFriends.filter(function (item) {
    //     return item.userName !== data.userName;
    //   });

    // })





    //   this.socket.connect();

    //   let name = `User-${new Date().getTime()}`;
    //   this.currentUser = name;

    //   this.socket.emit('set-name',name);

    //   this.socket.fromEvent('users-changed').subscribe(data =>{
    //     console.log('got data: ',data)
    //     let user = data['user'];
    //     if (data['event'] == 'left'){
    //       this.showToast(`User left: ${user}` )
    //     } else{
    //       this.showToast(`User joined: ${user}` )
    //     }
    //   });


    //   this.socket.fromEvent('message').subscribe(msg =>{
    //     console.log('new: ',msg)
    //     this.messages.push(msg);
    //   })

  }

  // setUser(user) {
  //   this.thisUser = user;
  // }

  // chooseChat(friend){
  //   alert('tyb')
  //   console.log('tyb')

  //   this.atHome = false;
  // }

  // sendMessage(){
  //   this.socket.emit('send-message',{text: this.message})
  //   this.message = '';
  // }

  // ionViewWillLeave(){
  //   this.socket.disconnect();
  // }

  // async showToast(msg){
  //   let toast = await this.toastCtrl.create({
  //     message: msg,
  //     position: 'top',
  //     duration: 2000
  //   });
  //   toast.present();
  // }

}

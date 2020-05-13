import { Component, OnInit } from '@angular/core';
import * as authSocketServListen from '../services/socket/listen/auth.service';
import { StorageService } from '../services/storage/storage.service';

@Component({
  selector: 'app-app-home',
  templateUrl: './app-home.page.html',
  styleUrls: ['./app-home.page.scss'],
})
export class AppHomePage implements OnInit {

  friends = [];
  OnlineNotFriends = [];

  chatWith: any = {};

  currentUser: any;
  constructor(
    private authSocketServListen: authSocketServListen.AuthService,
    private storageServ: StorageService
  ) {
    
  }

  ngOnInit() {
    this.authSocketServListen.addMeToNewUsers();
    this.authSocketServListen.addUsersToMe();
    this.authSocketServListen.logout();
    this.friends = this.authSocketServListen.getFriends();
    this.OnlineNotFriends = this.authSocketServListen.getOnlinePeaple();
    this.currentUser = this.authSocketServListen.getUser();
    this.authSocketServListen.getMessege();
  }

  chooseChat(friendData) {
    this.chatWith = friendData;

    var ind = this.OnlineNotFriends.indexOf(friendData);
    if (ind != -1) {
      this.OnlineNotFriends.splice(ind, 1);
      this.friends.push(friendData);
    }
  }

  ionViewWillLeave() {
    console.log('d5l f ionViewWillLeave')

    this.storageServ.saveIsLoged(true);
    this.storageServ.saveLastLogUser(this.currentUser.userName);
    this.storageServ.saveUser(this.currentUser)
    this.storageServ.saveFriends(this.friends, this.currentUser.userName);
  }

  returnback() {
    this.chatWith = {}
  }

}

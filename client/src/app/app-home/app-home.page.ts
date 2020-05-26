import { Component, OnInit } from '@angular/core';
import * as ServInd from '../services/auth/auth.service'

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
    private ServInd: ServInd.AuthService
  ) {

  }

  ngOnInit() {
    this.currentUser = this.ServInd.getUser()
    this.friends = this.ServInd.getFriends();
    this.OnlineNotFriends = this.ServInd.getOnlineNotFriends(); 
  }

  async chooseChat(friendData) {
    var x = await this.ServInd.chooseChat(friendData);
    this.friends = x.friends;
    this.OnlineNotFriends = x.OnlineNotFriends;


    var ind = this.OnlineNotFriends.indexOf(friendData);
    this.chatWith = friendData;
  }

  ionViewWillLeave() {
    this.ServInd.logout(true)
  }

  ngOnDestroy(){
    this.ServInd.logout(true)
  }

  returnback() {
    this.chatWith = undefined;
    this.chatWith = {}
  }

}

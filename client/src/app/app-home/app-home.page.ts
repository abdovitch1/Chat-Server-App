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

    this.ServInd.FriendLogout();
    this.ServInd.NewUserHasCome();
    this.ServInd.addUsersToMe();
    this.ServInd.getMessege();
  }

  chooseChat({friendInd, userName}) {
    console.log('choos chat: ', friendInd, userName)
    if(this.friends[friendInd]){
      if(this.friends[friendInd].userName == userName){
        this.chatWith =  this.friends[friendInd];
        this.ServInd.chooseChat(this.friends[friendInd]);
      }else{
        this.chatWith =  this.OnlineNotFriends[friendInd];
        this.ServInd.chooseChat(this.OnlineNotFriends[friendInd]);
      }
    }else{
      this.chatWith =  this.OnlineNotFriends[friendInd];
      this.ServInd.chooseChat(this.OnlineNotFriends[friendInd]);
    }
    // this.chatWith = friendData;
    
  }

  ionViewWillLeave() {
    this.ServInd.logout(true)
  }

  returnback() {
    this.chatWith = {}
  }

}

import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import * as ServInd from './services/auth/auth.service';
import * as socketServListen from './services/socket/listen/auth.service'

import * as x from './services/storage/storage.service'

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private ServInd: ServInd.AuthService,
    private socketServListen: socketServListen.AuthService,

    private x: x.StorageService
  ) {
    this.initializeApp();

    // this.x.clear()

    this.ServInd.FriendLogout();
    this.ServInd.NewUserHasCome();
    this.ServInd.addUsersToMe();
    this.ServInd.getMessege();
    
    this.socketServListen.socketDisconnect()
     
    this.ServInd.login()
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  
}

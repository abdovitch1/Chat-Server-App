import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule, HttpClient } from '@angular/common/http';

import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import * as AuthServiceEmit from './services/socket/emit/auth.service';
import * as AuthServiceListen from './services/socket/listen/auth.service';
import { TopBarModule } from './top-bar/top-bar.module';
import { HomePageModule } from './home/home.module';
import { AppHomePageModule } from './app-home/app-home.module';


// import { SocketIoModule, SocketIoConfig } from 'ng-socket-io';


//,'http://192.168.1.5:3000'
//  'https://us-central1-ionic-chat-59369.cloudfunctions.net/app'
//   'https://b070f633.ngrok.io/'
// $ ngrok http 3000 
const config: SocketIoConfig = { url: 'https://63a5b52c.ngrok.io/', options: { transports: ['websocket', 'polling', 'flashsocket'] } };

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule, 
    HttpClientModule, 
    IonicModule.forRoot(), 
    AppRoutingModule, 
    SocketIoModule.forRoot(config),
    TopBarModule,
    HomePageModule,
    AppHomePageModule
  ],
  providers: [
    StatusBar,
    SplashScreen,
    NativeStorage,
    AuthServiceEmit.AuthService,
    AuthServiceListen.AuthService,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AppHomePageRoutingModule } from './app-home-routing.module';

import { AppHomePage } from './app-home.page';
import { ChatComponent } from '../chat/chat.component';
import { FriendListViewComponent } from '../friend-list-view/friend-list-view.component';
import { TopBarModule } from '../top-bar/top-bar.module';
// import { TopBarComponent } from '../top-bar/top-bar.component';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TopBarModule,
    AppHomePageRoutingModule
  ],
  declarations: [AppHomePage, FriendListViewComponent, ChatComponent,]
})
export class AppHomePageModule {}

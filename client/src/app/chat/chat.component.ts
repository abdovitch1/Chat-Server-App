import { Component, OnInit, Input } from '@angular/core';
import * as ServInd from '../services/auth/auth.service'

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})
export class ChatComponent implements OnInit {

  @Input() friend;
  message;

  constructor(
    private ServInd: ServInd.AuthService
  ) {

  }

  ngOnInit() {
    this.friend.newMessege = undefined;
    this.friend.newMessege = [];

  }

  sendMessage() {
    this.friend.messeges.push({ messege: this.message, createdDate: new Date(), owner: 'me' })
    this.ServInd.sendMessege(this.message, this.friend.deviceSTR)
    this.message = ''
  }

  ngOnDestroy() {
    this.friend.newMessege = undefined;
    this.friend.newMessege = [];
  }
}

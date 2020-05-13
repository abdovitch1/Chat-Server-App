import { Component, OnInit, Input } from '@angular/core';
import * as authSocketServListen from '../services/socket/listen/auth.service';
import * as authSocketServLEmit from '../services/socket/emit/auth.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})
export class ChatComponent implements OnInit {

  @Input() friend;
  message;

  constructor(
    private authSocketServListen:  authSocketServListen.AuthService,
    private authSocketServEmit: authSocketServLEmit.AuthService,

  ) {
    
   }

  ngOnInit() {
    console.log('this.friend',this.friend)
    this.authSocketServListen.newMessegeRead(this.friend.userName);

    // this.authSocketServListen.getMessege();
  }

  sendMessage(){
    // messeges: [{messege: 'his msg', createdDate: new Date(), owner:'other'}
    this.friend.messeges.push({messege: this.message, createdDate: new Date(), owner:'me'})
    this.authSocketServEmit.sendMessege(this.message, this.friend.deviceSTR);
    this.message=''
  }


}

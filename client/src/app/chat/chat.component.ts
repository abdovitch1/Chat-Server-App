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
    // console.log('this.friend',this.friend)
    // this.friend.newMessege=[];

    this.friend.messeges.push(...this.friend.newMessege);
    this.friend.newMessege = [];
  }

  sendMessage(){
    // messeges: [{messege: 'his msg', createdDate: new Date(), owner:'other'}
    this.friend.messeges.push({messege: this.message, createdDate: new Date(), owner:'me'})
    // this.authSocketServEmit.sendMessege(this.message, this.friend.deviceSTR);
    this.ServInd.sendMessege(this.message,this.friend.deviceSTR)
    this.message=''
  }
  // ionViewDidEnter(){
  //   alert('ionviewdidenter chat ')
    
  // }

  // ngOnDestroy(){
  //   alert('destroy  chat ')
  // }

  // ionViewDidLeave(){
  //   alert('ionViewDidLeave chat ')
  // }


}

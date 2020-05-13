import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AuthService } from '../services/socket/emit/auth.service';
import * as authSocketListen from '../services/socket/listen/auth.service';
import { Socket } from 'ngx-socket-io';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent implements OnInit {

  @Output() notify = new EventEmitter();
    
  userName: String;
  name: String;
  password: String;
  validUserName: boolean;
  deviceSTR: String;

  constructor(
      private authSocketEmit: AuthService, 
      private authSocketListen: authSocketListen.AuthService,
      
    ) {
    this.validUserName = false;
    
  }

  ngOnInit() {
    // this.socket.fromEvent('check-user-name--'+this.deviceSTR).subscribe( (data: any) => {
    //   if(data.msg) {
    //     this.validUserName = true;
    //   }
    //   else{
    //     this.authSocketServ.presentAlert('This user name is already exist!', 'Error');
    //     this.validUserName = false;
    //   }
    // })

    this.authSocketListen.checkUserName().then(data => {
      this.validUserName = data;
    });
  }

  signUp(){
    var userData = {
      'userName': this.userName,
      'name' : this.name,
      'password': this.password
    }
    console.log('in sign up componant')
    this.authSocketEmit.signUp(userData)
  }

  checkUserName(){
    console.log('userName: ',this.userName )
    this.authSocketEmit.checkUserName(this.userName);
  }


  
}

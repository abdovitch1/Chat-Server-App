import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AuthService } from '../services/socket/emit/auth.service';
import { Socket } from 'ngx-socket-io';

AuthService
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  userName: String;
  password: String;
  deviceSTR: String;

  @Output() notify = new EventEmitter();

  constructor(private authSocketEmit: AuthService) { 
  }

  ngOnInit() {
  
  }

  login(){
    var userData = {
      'userName': this.userName,
      'password': this.password
    }
    this.authSocketEmit.login(userData);
  }

}

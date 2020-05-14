import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import * as ServInd from '../services/auth/auth.service'


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

  constructor(
    private ServInd: ServInd.AuthService
  ) { }

  ngOnInit() { 
    // alert('ngOnInit login')

  }
  // ionViewDidEnter(){
  //   alert('ionviewdidenter login')
  // }

  // ngOnDestroy(){
  //   alert('destroy login')
  // }

  // ionViewDidLeave(){
  //   alert('ionViewDidLeave login')
  // }
  login() {
    var userData = {
      'userName': this.userName,
      'password': this.password
    }
    this.ServInd.login(userData);
  }

}

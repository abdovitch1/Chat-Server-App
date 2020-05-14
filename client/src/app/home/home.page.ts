import { Component, OnInit } from '@angular/core';
import * as ServInd from '../services/auth/auth.service'

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  haveAcc = true;

  constructor(
    private socketServInd: ServInd.AuthService 
  ) { }


  ngOnInit() {
    // this.authSocketListen.login();
    // this.socketSetv.error();
    this.socketServInd.loginListen();
    this.socketServInd.getError();
  }

  // ngOnDestroy(){
  //   alert('destroy  home')
  // }

  // ionViewDidLeave(){
  //   alert('ionViewDidLeave home')
  // }

  onNotify() {
    this.haveAcc = !this.haveAcc;
  }

}

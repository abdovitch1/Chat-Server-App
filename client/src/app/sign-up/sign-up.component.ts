import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import * as ServInd from '../services/auth/auth.service'

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

  constructor(
    private ServInd: ServInd.AuthService
  ) { this.validUserName = false; }

  ngOnInit() {  
    // alert('ngOnInit sign up')
    this.ServInd.checkUserNameResponse().subscribe((data: any) => {
      if(data.msg){
        this.validUserName = true;
      }else{
        this.validUserName = false;
        this.ServInd.presentAlert('This user name is already exist!', 'Error');
      }
    })
  }

  // ionViewDidEnter(){
  //   alert('ionviewdidenter sign up')
    
  // }

  // ngOnDestroy(){
  //   alert('destroy  sign up')
  // }

  // ionViewDidLeave(){
  //   alert('ionViewDidLeave sign up')
  // }

  signUp() {
    var userData = {
      'userName': this.userName,
      'name': this.name,
      'password': this.password
    }
    this.ServInd.signUp(userData)
  }

  checkUserName() {
    this.ServInd.checkUserName(this.userName);
  }

  



}

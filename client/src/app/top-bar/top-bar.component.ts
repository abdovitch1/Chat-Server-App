import { Component, OnInit, Input, Output,EventEmitter } from '@angular/core';
import { AuthService } from '../services/socket/emit/auth.service';
import * as AuthServiceListen from '../services/socket/listen/auth.service';
@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.scss'],
})
export class TopBarComponent implements OnInit {
  @Input() auth;
  @Input() back;
  @Input() title;
  @Output() goback = new EventEmitter();
  userData: any;
  constructor(
    private authServEmit: AuthService,
    private authServListen: AuthServiceListen.AuthService,
  ) { }

  ngOnInit() {
    this.userData = this.authServListen.getUser();
  }

  logout(){
    this.authServEmit.logout(this.userData.userName);
  }
}

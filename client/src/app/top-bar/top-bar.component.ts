import { Component, OnInit, Input, Output,EventEmitter } from '@angular/core';
import * as ServInd from '../services/auth/auth.service'
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
    private ServInd: ServInd.AuthService
  ) { }

  ngOnInit() {
    this.userData = this.ServInd.getUser()
  }

  logout(){
    this.ServInd.logout(false);
  }
}

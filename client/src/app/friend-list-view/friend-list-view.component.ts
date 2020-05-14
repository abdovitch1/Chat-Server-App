import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AuthService } from '../services/socket/listen/auth.service';

@Component({
  selector: 'app-friend-list-view',
  templateUrl: './friend-list-view.component.html',
  styleUrls: ['./friend-list-view.component.scss'],
})
export class FriendListViewComponent implements OnInit {

  @Input() friendList: Observable<any[]>;
  @Input() title;

  @Output() friendData = new EventEmitter();

  friends;

  constructor(private a: AuthService) { }

  ngOnInit() {
  }

  // ionViewDidEnter(){
  //   alert('ionviewdidenter friend-list-view')
    
  // }

  // ngOnDestroy(){
  //   alert('destroy  friend-list-view')
  // }

  // ionViewDidLeave(){
  //   alert('ionViewDidLeave friend-list-view')
  // }


  chooseChat(friendInd, userName) {

    this.friendData.emit({friendInd, userName});
  }

}

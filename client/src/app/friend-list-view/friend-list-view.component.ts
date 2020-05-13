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
    // console.log('friend List: ', this.friendList)
    // if (this.friendList) {
    //   this.friendList.subscribe((friends) => {
    //     console.log('this.OnlineNotFriends ', this.friends);
    //     this.friends = friends;
    //     console.log('this.OnlineNotFriends ', this.friends);
    //   });

    // }

    // this.a.getOnlinePeaple().subscribe((data) => {
    //   this.friends = data;
    // })

  }

  chooseChat(friend) {
    this.friendData.emit(friend);
  }

}

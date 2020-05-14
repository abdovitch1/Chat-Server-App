import { Injectable } from '@angular/core';
import { NativeStorage } from '@ionic-native/native-storage/ngx';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor(private storage: NativeStorage) { }

  isLoged(){
    this.storage.clear()
    return this.storage.getItem('isLoged');
  } 

  saveIsLoged(bool){
    this.storage.setItem('isLoged', bool)
    if(!bool){
      this.storage.remove('userName');
    }
  }

  saveLastLogUser(userName){
    this.storage.setItem('userName', userName)
  }

  getLastLogUserName(){
    return this.storage.getItem('userName');
  }

  saveUser(userData){
    this.storage.setItem( userData.userName, userData);
  }

  getUser(userName){
    // console.log('getuser')
    // this.storage.clear();
    return this.storage.getItem(userName);
  }

  saveFriends(friendsData, userName){
    this.storage.setItem('friends-' + userName, friendsData);
  }

  saveOtherFriendsHasMSG(friendData, userName){
    this.storage.getItem('OtherHasMSG--' + userName).then((data) => {
      if(data){
        var friend = data.find(f => f.userName == friendData.userName);
        if(friend ){
          friend.newMessege.push(...friendData.newMessege)
        }else{
          data.push(friendData);
        }
        this.storage.setItem('OtherHasMSG--' + userName,data);
      }
    }).catch(err => {
      console.log('error in saveOtherFriendHasMSG: ',err);
      var arr = [];
      arr.push(friendData);
      this.storage.setItem('OtherHasMSG--' + userName,arr);
    })
  }

  getOtherFriendsHasMSG(userName){
    return this.storage.getItem('OtherHasMSG--' + userName);
  }

  getFriends(userName){
    return this.storage.getItem('friends-' + userName);
  }
}

import { Injectable } from '@angular/core';
import { NativeStorage } from '@ionic-native/native-storage/ngx';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor(private storage: NativeStorage) { }


  async clear() {
    await this.storage.keys().then((data) => {
      console.log('data in clear: ', data)
      data.map(f => {
        console.log('ffff:', f)
        this.storage.remove(f);
      })
    }).catch(err => {
      console.log('error data in clear: ', err)
    })



    this.storage.keys().then((data) => {
      console.log('1-data in clear: ', data)
    }).catch(err => {
      console.log('1- error data in clear: ', err)
    })

  }
  isLoged() {
    return this.storage.getItem('isLoged');
  }

  saveIsLoged(bool) {
    this.storage.setItem('isLoged', bool)
    if (!bool) {
      this.storage.remove('userName');
    }
  }

  saveLastLogUser(userName) {
    this.storage.setItem('userName', userName)
  }

  getLastLogUserName() {
    return this.storage.getItem('userName');
  }

  saveUser(userData) {
    this.storage.setItem(userData.userName, userData);
  }

  getUser(userName) {
    return this.storage.getItem(userName);
  }

  saveFriends(friendsData, userName) {
    for(var i=0; i<friendsData.length; i++){
      friendsData[i].isActive = false;
    }
    this.storage.setItem('friends-' + userName, friendsData);
  }

  async saveOtherFriendsHasMSG(friendData, userName) {
    var savedData = friendData.filter(f => f.newMessege.length > 0)
    for(var i=0; i<savedData.length; i++){
      savedData[i].isActive = false;
    }
    this.storage.setItem('OtherHasMSG--' + userName, savedData);
  }

  getOtherFriendsHasMSG(userName) {
    return this.storage.getItem('OtherHasMSG--' + userName);
  }

  getFriends(userName) {
    return this.storage.getItem('friends-' + userName);
  }
}

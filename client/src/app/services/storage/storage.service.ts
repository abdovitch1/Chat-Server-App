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
    console.log('isLoged')
    return this.storage.getItem('isLoged');
  }

  saveIsLoged(bool) {
    this.storage.setItem('isLoged', bool)
    if (!bool) {
      this.storage.remove('userName');
    }
  }

  saveLastLogUser(userName) {
    console.log('storage_serv: saveLastLogUser: ', userName)
    this.storage.setItem('userName', userName)
  }

  getLastLogUserName() {
    console.log('getLastLogUserName')
    return this.storage.getItem('userName');
  }

  saveUser(userData) {
    console.log('storage_serv: saveUser: ', userData)
    this.storage.setItem(userData.userName, userData);
  }

  getUser(userName) {
    console.log('getuser')
    // this.storage.clear();
    return this.storage.getItem(userName);
  }

  saveFriends(friendsData, userName) {
    console.log('storage_serv: saveFriends: ', friendsData)
    console.log('storage_serv: saveFriends: ', userName)
    this.storage.setItem('friends-' + userName, friendsData);
  }

  async saveOtherFriendsHasMSG(friendData, userName) {
    console.log('storage_serv: saveOnlineFriends: ', friendData)
    console.log('storage_serv: saveOnlineFriends: ', userName)
    var savedData = friendData.filter(f => f.newMessege.length > 0)
    this.storage.setItem('OtherHasMSG--' + userName, savedData);

    // this.storage.getItem('OtherHasMSG--' + userName).then((data) => {
    //   if(data){
    //     var friend = data.find(f => f.userName == friendData.userName);
    //     if(friend ){
    //       friend.newMessege.push(...friendData.newMessege)
    //     }else{
    //       data.push(friendData);
    //     }
    //     this.storage.setItem('OtherHasMSG--' + userName,data);
    //   }
    // }).catch(err => {
    //   console.log('error in saveOtherFriendHasMSG: ',err);
    //   var arr = [];
    //   arr.push(friendData);
    //   this.storage.setItem('OtherHasMSG--' + userName,arr);
    // })
  }

  getOtherFriendsHasMSG(userName) {
    return this.storage.getItem('OtherHasMSG--' + userName);
  }

  getFriends(userName) {
    return this.storage.getItem('friends-' + userName);
  }
}

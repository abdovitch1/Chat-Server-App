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
    console.log('getuser')
    // this.storage.clear();
    return this.storage.getItem(userName);
  }

  saveFriends(friendsData, userName){
    this.storage.setItem('friends-' + userName, friendsData);
  }

  getFriends(userName){
    return this.storage.getItem('friends-' + userName);
  }
}

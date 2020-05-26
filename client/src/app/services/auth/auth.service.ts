import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import * as socketServEmit from '../socket/emit/auth.service';
import * as socketServListen from '../socket/listen/auth.service';

import * as storageServ from '../storage/storage.service';
import { AlertController, LoadingController } from '@ionic/angular';
import * as socketIndex from '../socket/socket.service'


@Injectable({
	providedIn: 'root'
})
export class AuthService {

	constructor(
		private socketServEmit: socketServEmit.AuthService,
		private socketServListen: socketServListen.AuthService,
		private storageServ: storageServ.StorageService,
		private socketServIndex: socketIndex.SocketService,
		private router: Router,
		private alertCtrl: AlertController,
		private loadingCtrl: LoadingController,
	) {
		this.deviceSTR = this.socketServIndex.getDeviceString();
		this.friends = [];
		this.OnlineNotFriends = [];
	}

	user: any;
	friends: Array<any>;
	OnlineNotFriends: Array<any>;
	deviceSTR;
	loading;

	login(userData?: any) {
		this.socketServListen.socketConnect();
		this.presentLoading()
		if (userData) {
			userData.deviceSTR = this.deviceSTR;
			this.socketServEmit.login(userData);
			return;
		}
		if (this.user) {
			this.router.navigate(['/app-home'], { replaceUrl: true });
			return;
		}

		this.storageServ.isLoged().then(isLoged => {
			if (isLoged) {
				this.storageServ.getLastLogUserName().then(userName => {
					this.storageServ.getUser(userName).then(user => {
						this.user = user;
						this.user.deviceSTR = this.deviceSTR;
						var userData = {
							userName: user.userName,
							id: user.id,
							name: user.name,
							deviceSTR: this.user.deviceSTR
						}
						this.socketServEmit.goOnline(userData);
						this.getFriendsFromStorage();
						this.getOtherFriendsFromStorage();
						this.router.navigate(['/app-home'], { replaceUrl: true });
					}).catch(err => {
						console.log('3-error: ', err)
						this.router.navigate(['/home'], { replaceUrl: true });
					})
				}).catch(err => {
					console.log('2-error: ', err)
					this.router.navigate(['/home'], { replaceUrl: true });
				})
			}
			else {
				this.router.navigate(['/home'], { replaceUrl: true });
			}
		}).catch(err => {
			console.log('1-error: ', err);
			this.router.navigate(['/home'], { replaceUrl: true });
		})
	}

	private getFriendsFromStorage() {
		this.storageServ.getFriends(this.user.userName).then(friends => {
			if (friends) {
				friends.map(f => this.addToFriends(f));
			}
		}).catch(err => {
			console.log('error in getFriendsFromStorage: ', err)
		})
	}

	private getOtherFriendsFromStorage() {
		this.storageServ.getOtherFriendsHasMSG(this.user.userName).then(friends => {
			if (friends) {
				friends.map(f => this.addToOnlineNotFriends(f));
			}
		}).catch(err => {
			console.log('error in getOtherFriendsFromStorage: ', err)
		})
	}

	signUp(userData: any) {
		this.presentLoading()
		userData.deviceSTR = this.deviceSTR;
		this.socketServEmit.signUp(userData);
	}

	logout(isLoged) {
		var copyUser = JSON.parse(JSON.stringify(this.user));
		this.socketServEmit.logout(copyUser.userName);

		this.storageServ.saveUser(copyUser);
		this.storageServ.saveIsLoged(isLoged);
		this.storageServ.saveLastLogUser(this.user.userName)
		this.storageServ.saveFriends(this.friends, this.user.userName);
		this.storageServ.saveOtherFriendsHasMSG(this.OnlineNotFriends, this.user.userName)


		if (!isLoged) {
			this.user = undefined;
			this.friends = [];
			this.OnlineNotFriends = [];
		}
		this.router.navigate(['/home'], { replaceUrl: true });
		this.socketServListen.socketDisconnect();
	}

	checkUserName(userName: String) {
		var userData = {
			deviceSTR: this.deviceSTR,
			userName: userName
		}
		this.socketServEmit.checkUserName(userData);
	}

	getUser() {
		return this.user;
	}

	getFriends() {
		return this.friends;
	}

	addToFriends(friend: any) {
		var newUser = this.friends.find(f => f.userName == friend.userName);
		if (!newUser) {
			this.friends.push(friend);
		} else {
			newUser.deviceSTR = friend.deviceSTR;
			newUser.isActive = true;
		}
	}

	getOnlineNotFriends() {
		return this.OnlineNotFriends;
	}

	addToOnlineNotFriends(friend: any) {
		var newUser = this.OnlineNotFriends.find(f => f.userName == friend.userName);
		if (!newUser) {
			friend.newMessege = [];
			friend.messeges = [];
			friend.isActive = true;
			this.OnlineNotFriends.push(friend);
		} else {
			newUser.isActive = true;
			newUser.deviceSTR = friend.deviceSTR;
		}
	}

	sendMessege(msg, friendDeviceStr) {
		var jsonData = {
			messege: msg,
			deviceSTR: friendDeviceStr,
			userName: this.user.userName
		}
		this.socketServEmit.sendMessege(jsonData);
	}

	loginListen() {
		this.socketServListen.login().subscribe((data: any) => {
			this.user = data.userData;

			this.storageServ.saveIsLoged(true)
			this.storageServ.saveUser(this.user)

			this.router.navigate(['/app-home'], { replaceUrl: true });

			this.getFriendsFromStorage();
			this.getOtherFriendsFromStorage();
		})
	}

	NewUserHasCome() {
		this.socketServListen.addMeToNewUsers().subscribe((data: any) => {
			if (data.userData.userName !== this.user.userName) {
				var newUser = this.friends.find(friend => friend.userName == data.userData.userName);
				if (!newUser) {
					this.addToOnlineNotFriends(data.userData);
				} else {
					newUser.deviceSTR = data.userData.deviceSTR;
					newUser.isActive = true;
				}
				var myData = {
					id: this.user.id,
					userName: this.user.userName,
					name: this.user.name,
					deviceSTR: this.deviceSTR
				}
				var hisName = data.userData.deviceSTR;
				this.socketServEmit.letNewKnowMe(myData, hisName)
			}
		})
	}

	addUsersToMe() {
		this.socketServListen.addUsersToMe().subscribe((data: any) => {
			var newUser: any = this.friends.find(item => item.userName == data.userName);
			if (!newUser) {
				this.addToOnlineNotFriends(data)
			} else {
				newUser.deviceSTR = data.deviceSTR;
				newUser.isActive = true;
			}
		})
	}

	FriendLogout() {
		this.socketServListen.logout().subscribe((data: any) => {
			let indFriend = this.friends.findIndex(d => d.userName == data.userName);
			if (indFriend != -1) this.friends[indFriend].isActive = false;

			let OtherFInd1 = this.OnlineNotFriends.findIndex(d => d.userName == data.userName);
			if (OtherFInd1 != -1) {
				if (this.OnlineNotFriends[OtherFInd1].newMessege.length == 0) {
					this.OnlineNotFriends.splice(OtherFInd1, 1);
				}
				else {
					this.OnlineNotFriends[OtherFInd1].isActive = false;
				}
			}
		})
	}

	checkUserNameResponse() {
		return this.socketServListen.checkUserName()
	}

	getMessege() {
		this.socketServListen.getMessege().subscribe((data: any) => {
			var messege = data.messege;
			var userName = data.userName;
			var createdDate = data.createdDate;

			let indFriend = this.friends.findIndex(d => d.userName == userName);
			if (indFriend !== -1) {
				this.friends[indFriend].newMessege.push({ messege, createdDate, owner: 'other' })
				this.friends[indFriend].messeges.push({ messege, createdDate, owner: 'other' })
			}

			let index = this.OnlineNotFriends.findIndex(d => d.userName == userName);
			if (index !== -1) {
				this.OnlineNotFriends[index].newMessege.push({ messege, createdDate, owner: 'other' })
				this.OnlineNotFriends[index].messeges.push({ messege, createdDate, owner: 'other' })
			}
		})
	}

	getError() {
		this.socketServListen.error().subscribe((data: any) => {
			this.presentAlert(data.msg, 'Error');
		})
	}

	chooseChat(friendData) {
		var ind = this.OnlineNotFriends.indexOf(friendData);
		if (ind != -1) {
			this.friends.push(friendData);
			this.OnlineNotFriends[ind] = undefined;
			this.OnlineNotFriends.splice(ind, 1);
		}
		return {
			friends: this.friends,
			OnlineNotFriends: this.OnlineNotFriends
		}
	}


	async presentLoading() {
		var loading = await this.loadingCtrl.create({
			message: 'Please wait...',
			duration: 2000
		});
		return await loading.present();
		this.loading.dismiss()
	}
	async presentAlert(msg, header) {
		const alert = await this.alertCtrl.create({
			header: header,
			// subHeader: 'Subtitle',
			message: msg,
			buttons: ['OK'],
		});

		await alert.present();
		let result = await alert.onDidDismiss();
	}
}

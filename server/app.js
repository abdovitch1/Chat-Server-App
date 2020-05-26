var app = require('express')();
var bodyParser = require('body-parser')
var server = require('http').Server(app);
var io = require('socket.io')(server);

const { User, Chat } = require('./DB')
const cors = require("cors");
const corsOptions = {
	origin: "*",
	credentials: true
};
app.use(cors(corsOptions));
server.listen(3000, function () {
	console.log('listening on port: ', 3000)
});

app.get('/', (req, res) => {
	res.send('asdj')
})
io.on('connection', function (socket) {

	socket.on('login', (userData) => {
		var userName = userData.userName;
		var password = userData.password;

		var deviceSTR = userData.deviceSTR;
		User.getUser(userName, password, (data, err) => {
			if (err) {
				io.emit('error' + deviceSTR, { msg: err });
				return;
			}
			if (data) {
				io.emit('login--' + deviceSTR, { userData: data })
				delete data.pass;
				data.deviceSTR = deviceSTR;
				io.emit('userOnline', { msg: 'Open', userData: data });
			}
			else {
				io.emit('error' + deviceSTR, { msg: 'Your user name or passwor are invalid!' });
			}
		})
	})

	socket.on('goOnline', (userData) => {
		io.emit('userOnline', { msg: 'Open', userData });
	})

	socket.on('signUp', (userData) => {
		var userName = userData.userName;
		var name = userData.name;
		var password = userData.password;

		var deviceSTR = userData.deviceSTR;

		var user = new User(userName, name, password);
		user.save((id, err) => {
			if (err) {
				io.emit('error' + deviceSTR, { msg: err });
				return;
			}
			userData.id = id;
			io.emit('login--' + deviceSTR, { userData })
			delete userData.password;

			io.emit('userOnline', { msg: 'Open', userData });

		})
	})

	socket.on('check-user-name', (userData) => {
		var userName = userData.userName;
		var deviceSTR = userData.deviceSTR;

		User.checkName(userName, (data, err) => {
			if (err) {
				io.emit('error' + deviceSTR, { msg: err });
				return;
			}
			if (data) {
				io.emit('check-user-name--' + deviceSTR, { msg: false })
			}
			else {
				io.emit('check-user-name--' + deviceSTR, { msg: true });
			}
		})
	})

	socket.on('addEachOther', (data) => {
		var oldUserData = data.myData; // old mean he is open the app and online
		var newUserName = data.hisName; // new mean he just open the app
		io.emit(String(newUserName), oldUserData);
	})

	socket.on('logout', (data) => {
		io.emit('logout', data);
	})

	socket.on('send-messege', (data) => {
		let deviceSTR = data.deviceSTR;
		data.createdDate = new Date();
		io.emit(String(deviceSTR) + '--Messege', data);
	});
});

var port = process.env.PORT || 3000;
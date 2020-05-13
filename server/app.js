var app = require('express')();
var bodyParser = require('body-parser')
var server = require('http').Server(app);
var io = require('socket.io')(server);

const {User,Chat} = require('./DB')
const cors = require("cors");
const corsOptions = { 
    origin: "*", 
    credentials: true 
}; 
app.use(cors(corsOptions));
server.listen(3000  , function () {
    console.log('listening on port: ', 3000)
});

// const io = require('socket.io')(server, {
//     path: '/chat/socket.io'
//   });


// app.use(bodyParser.urlencoded({ extended: false }))
// app.use(bodyParser.json())
// app.use(function (req, res, next) {
//     res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    // res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    // res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers,X-Access-Token,XKey,Authorization');


    //  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

    // Pass to next layer of middleware
//     next();
// });
// app.post('/login', (req, res) => {
//     console.log('body:');
//     res.header("Access-Control-Allow-Origin", "*");
//     res.end();
// })

app.get('/',(req,res) => {
    res.send('asdj')
})
io.on('connection', function (socket) {
    // socket.on('disconnect', function () {
    //     io.emit('users-changed', { user: socket.username, event: 'left' });
    // });

    // socket.on('set-name', (name) => {
    //     // console.log('name: ', name)
    //     socket.username = name;
    //     io.emit('users-changed', { user: name, event: 'joined' });
    // });

    // socket.on('send-message', (message) => {
    //     io.emit('message', { msg: message.text, user: socket.username, createdDate: new Date() });
    // });

    socket.on('login', (userData) => {
        // console.log('Login: userData: ',userData)
        var userName = userData.userName;
        var password = userData.password;

        var deviceSTR = userData.deviceSTR;
        User.getUser(userName, password, (data,err) => {
            // console.log('data from login: ', data);
            if(err){
                io.emit( 'error'+deviceSTR, {msg: err});
                return;
            }
            if(data){
                io.emit( 'login--'+deviceSTR, { userData: data } )
                delete data.pass;
                data.deviceSTR = deviceSTR;
                io.emit( 'userOnline', { msg: 'Open', userData: data});
            }
            else{
                io.emit( 'error'+deviceSTR, {msg: 'Your user name or passwor are invalid!'});
            }
        })
    })

    socket.on('goOnline', (userData) => {
        io.emit( 'userOnline', { msg: 'Open', userData});
    })

    socket.on('signUp', (userData) => {
        // console.log('userData in signup: ',userData)
        var userName = userData.userName;
        var name     = userData.name;
        var password = userData.password;
        
        var deviceSTR = userData.deviceSTR;

        var user = new User(userName, name, password);
        user.save((id,err) => {
            if(err){
                io.emit( 'error'+deviceSTR, {msg: err});
                return;
            }
            userData.id = id;
            io.emit( 'login--'+deviceSTR, { userData } )
            delete userData.password;

            io.emit( 'userOnline', { msg: 'Open', userData});

        })
    })

    socket.on('check-user-name', (userData) => {
        // console.log('check: ',userData)
        var userName = userData.userName;

        var deviceSTR = userData.deviceSTR;

        User.checkName(userName, (data, err) => {
            if(err){
                io.emit( 'error'+deviceSTR, {msg: err});
                return;
            }
            if(data){
                io.emit( 'check-user-name--'+deviceSTR, {msg: false} )
            }
            else{
                io.emit( 'check-user-name--'+deviceSTR, {msg: true});
            }
        })
    })

    socket.on('addEachOther', (data) =>{
        // console.log('add each other: ',data)
        var oldUserData = data.myData; // old mean he is open the app and online
        var newUserName = data.hisName; // new mean he just open the app
        // console.log('newUserName',newUserName)
        // console.log('newUserName',newUserName.length)
        io.emit(String(newUserName), oldUserData);
    })

    socket.on('logout', (data) =>{
        // console.log('in logout:', data)
        io.emit('logout', data);
    })

    socket.on('send-messege', (data) => {
        console.log('send-messege: ',data)
        let deviceSTR = data.deviceSTR;
        data.createdDate = new Date();
        io.emit(String(deviceSTR) + '--Messege', data);
    });
});

var port = process.env.PORT || 3000;

// io.listen(port, function () {
//     console.log('listening on port: ', port)
// });


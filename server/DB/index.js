const sqlite3 = require('sqlite3').verbose();

function openDB(){
    //return new sqlite3.Database('../database/crm_ass.db',(err) => {
    return new sqlite3.Database('./Db/chat.db',(err) => {
        if (err) {
            console.error('0 ',err.message);
        }
      });

}

function closeDB(db){
    db.close((err) => {
        if (err) {
           console.error(err.message);
        }
      });
}

class User{
  constructor(userName, name, pass, id = -1){
      this.userName = userName
      this.name     = name;
      this.pass     = pass;
      this.id       = id;
  }

  save(callback){
      const db = openDB();
      var id = -1;
      db.serialize(()=>{
          var stmt ="insert into user(userName,name,pass) values('"+this.userName+"','"+this.name+"', '"+this.pass+"')";
          db.run(stmt, function(err) {
              if (err) {console.log(err.message);callback(null, err);}
              else{
                  id = this.lastID;
                  callback(id);
              }
          });
      });
      closeDB(db);
  }

  static getUser(userName, pass, callback){
      const db = openDB();
      db.serialize(()=>{
          
          db.get("select * from user where userName= '"+userName + "' and pass = '" + pass+ "'",(err,row) => {
              if(err){
                  console.log('1 ',err);
                  callback(null,err);
                  return;
              }
              callback(row);
          });
      });
      closeDB(db);
  }


  static checkName(userName, callback){
    const db = openDB();
    db.serialize(()=>{
        
        db.get("select userName from user where userName= '"+userName + "'",(err,row) => {
            if(err){
                console.log('1 ',err);
                callback(null,err);
                return;
            }
            callback(row);
        });
    });
    closeDB(db);
}
}

class Chat{
  constructor(userId, chatId){
      this.userId = userId
      this.chatId = chatId;
  }

  save(callback){
      const db = openDB();
      var id = -1;
      db.serialize(()=>{
          var stmt ="insert into chat(userId,chatId) values("+this.userId+","+this.chatId+")";
          db.run(stmt, function(err) {
              if (err) {console.log(err.message);callback(null,err);}
              else{
                  id = this.lastID;
                  callback(id);
              }
          });
      });
      closeDB(db);
  }

  static getUserChats(userId, callback){
      const db = openDB();
      db.serialize(()=>{
          
          db.get("select * from chat where userId= "+userId,(err,row) => {
              if(err){
                  console.log('1 ',err);
                  callback(null, err);
                  return;
              }
              callback(row);
          });
      });
      closeDB(db);
  }

  static getChatUsers(chatId, callback){
    const db = openDB();
    db.serialize(()=>{
        
        db.get("select * from chat where chatId= "+chatId,(err,row) => {
            if(err){
                console.log('1 ',err);
                callback(null, err);
                return;
            }
            callback(row);
        });
    });
    closeDB(db);
}
}

module.exports = {
  User : User,
  Chat : Chat
}
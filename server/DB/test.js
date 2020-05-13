const { User, Chat} = require('./index');

let u = new User("user nam12e", "name", "pass")

u.save(id => {
  console.log(id);
});
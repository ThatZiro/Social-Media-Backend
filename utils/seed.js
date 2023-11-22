const connection = require('../config/connection');
const {User} = require('../models')
const users = require("./data");

connection.on('error', (err) => err);

connection.once('open', async() => {
  console.log('Connected!');
  let userCheck = await connection.db.listCollections({name : 'users'}).toArray();
  if(userCheck.length) await connection.dropCollection('users');
  
  let thoughtCheck = await connection.db.listCollections({name : 'thoughts'}).toArray();
  if(thoughtCheck.length) await connection.dropCollection('thoughts');
  
  await User.collection.insertMany(users);

})
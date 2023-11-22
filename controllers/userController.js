const { User} = require('../models');

module.exports = {
  async getUsers(req, res) {
    try{
      const users = await User.find();
      const userObj = {
        users,
      }
      
      return res.json(userObj);
    } catch (err){
      console.log(err);
      return res.status(500).json(err);
    }
  },
  async getUserById(req, res) {
    const params = req.params[0];
    try{
      const user = await User.findOne({_id: params[0]})
        .select('-__v')
        .lean();
      
      if(!user) res.status(404).json({message: `No user found with the ID : ${params[0]}`})
      
      const userObj = {
        user,
      }
      return res.json(userObj);
    } catch (err){
      console.log(err);
      return res.status(500).json(err);
    }
  },
  async createUser(req, res) {
    try {
      const user = await User.create(req.body);
      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  async deleteUserById(req, res) {
    const params = req.params[0];
    try{
      const user = await User.findOneAndRemove({_id: params[0]});
      
      if(!user) res.status(404).json({message: `No user found with the ID : ${params[0]}`})
      
      //TODO Remove Thoughts and Reactions on delete
      return res.json({message: `User ${user.username} successfully deleted`});
    } catch (err){
      console.log(err);
      return res.status(500).json(err);
    }
  },
  //TODO Add Thoughts and Reactions
}
const { User, Thought} = require('../models');

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
    const { userId } = req.params;
    try{
      const user = await User.findOne({_id: userId})
        .select('-__v')
        .populate({
          path: 'thoughts',
          select: '-__v',
        })
        .populate({
          path: 'friends',
          select: 'username',
        })
        .lean();
      
      if(!user) return res.status(404).json({message: `No user found with the ID : ${userId}`})
      
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
    const { userId } = req.params;
    try{
      const user = await User.findOneAndRemove({_id: userId});
      
      if(!user) res.status(404).json({message: `No user found with the ID : ${userId}`})
      
      await Thought.deleteMany({ _id: { $in: user.thoughts } }); //BONUS
      return res.json({message: `User ${user.username} successfully deleted`});
    } catch (err){
      console.log(err);
      return res.status(500).json(err);
    }
  },
  async updateUserById(req, res) {
    const { userId } = req.params;
    try{
      const user = await User.findOneAndUpdate(
      { _id: userId},
      { $set: req.body },
      {runValidators: true, new: true}
      );
      
      if(!user) return res.status(404).json({message: `No user found with the ID : ${userId}`})
      
      const userObj = {
        user,
      }
      return res.status(200).json(userObj);
    } catch (err){
      console.log(err);
      return res.status(500).json(err);
    }
  },
  async addFriend(req, res) {
    const { userId, friendId} = req.params;
    try {
      const user = await User.findOneAndUpdate(
        { _id: userId},
        { $addToSet: friendId},
        {new: true}
      );
      
      if(!user) return res.status(404).json({message: `No user found with the ID : ${userId}`})
      
      const userObj = {
        user,
      }
      return res.status(200).json(userObj);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  async removeFriend(req, res) {
    const { userId, friendId} = req.params;
    try {
      const user = await User.findOneAndUpdate(
        { _id: userId},
        { $pull: friendId},
        {new: true}
      );
      
      if(!user) return res.status(404).json({message: `No user found with the ID : ${userId}`})
      
      const userObj = {
        user,
      }
      return res.status(200).json(userObj);
    } catch (err) {
      res.status(500).json(err);
    }
  },
}
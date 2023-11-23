const { Thought, User} = require('../models');

module.exports = {
  async getThoughts(req, res) {
    try{
      const thoughts = await Thought.find();
      const thoughtObj = {
        thoughts,
      }
      
      return res.json(thoughtObj);
    } catch (err){
      console.log(err);
      return res.status(500).json(err);
    }
  },
  async getThoughtsByID(req, res) {
    const {thoughtId} = req.params;
    try{
      const thought = await Thought.findOne({_id: thoughtId})
      .select('-__v')
      .lean();
      
      if(!thought) return res.status(404).json({message: `No thought found with the ID : ${thoughtId}`})
      
      const thoughtObj = {
        thought,
      }
      
      return res.json(thoughtObj);
    } catch (err){
      console.log(err);
      return res.status(500).json(err);
    }
  },
  async createThought(req, res) {
    try {
      const thought = await Thought.create(req.body);
      
      const user = await User.findOneAndUpdate(
        { _id: req.body.userId },
        { $push: { thoughts: thought._id } },
        { new: true }
      );
      
      if(!user) return res.status(404).json({message: `No user found with the ID : ${req.body.userId}`})
      
      res.json({ message: 'Thought successfully created!' });
    } catch (err) {
      res.status(500).json(err);
    }
  },
  async deleteThoughtById(req, res) {
    const {thoughtId} = req.params;
    try{
      const thought = await Thought.findOneAndRemove({_id: thoughtId});
      
      if(!thought) return res.status(404).json({message: `No thought found with the ID : ${thoughtId}`})
      
      return res.json({message: `User ${thought.username} successfully deleted`});
    } catch (err){
      console.log(err);
      return res.status(500).json(err);
    }
  },
  async updateThoughtsById(req, res) {
    const {thoughtId} = req.params;
    try{
      const thought = await Thought.findOneAndUpdate(
        { _id: thoughtId},
        { $set: req.body },
        {runValidators: true, new: true}
      );
      
      if(!thought) res.status(404).json({message: `No thought found with the ID : ${thoughtId}`})
      
      const thoughtObj = {
        thought,
      }
      return res.status(200).json(thoughtObj);
    } catch (err){
      console.log(err);
      return res.status(500).json(err);
    }
  },
  async addReaction(req, res) {
    const {thoughtId} = req.params;
    try {
      const thought = await Thought.findOneAndUpdate(
        { _id: thoughtId },
        { $addToSet: { reactions: req.body } },
        { runValidators: true, new: true }
      );
      
      if(!thought) return res.status(404).json({message: `No thought found with the ID : ${thoughtId}`})
      
      const thoughtObj = {
        thought,
      }
      return res.status(200).json(thoughtObj);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  async removeReaction(req, res) {
    const {thoughtId, reactionId} = req.params;
    try {
      const thought = await Thought.findOneAndUpdate(
        { _id: thoughtId },
        { $pull: { reactions: { _id: reactionId} } },
        { runValidators: true, new: true }
      );
      
      console.log('thoughtId:', thoughtId);
      console.log('reactionId:', reactionId);
      console.log('Updated Thought:', thought);
      
      if(!thought) return res.status(404).json({message: `No thought found with the ID : ${thoughtId}`})
      
      const thoughtObj = {
        thought,
      }
      return res.status(200).json(thoughtObj);
    } catch (err) {
      res.status(500).json(err);
    }
  },
}
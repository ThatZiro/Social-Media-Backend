const { Thought} = require('../models');

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
    const params = req.params[0];
    try{
      const thought = await Thought.findOne({_id: params[0]})
      .select('-__v')
      .lean();
      
      if(!thought) res.status(404).json({message: `No thought found with the ID : ${params[0]}`})
      
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
      const user = await Thought.create(req.body);
      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  async deleteThoughtById(req, res) {
    const params = req.params[0];
    try{
      const thought = await Thought.findOneAndRemove({_id: params[0]});
      
      if(!thought) res.status(404).json({message: `No thought found with the ID : ${params[0]}`})
      
      return res.json({message: `User ${thought.username} successfully deleted`});
    } catch (err){
      console.log(err);
      return res.status(500).json(err);
    }
  },
  async updateThoughtsById(req, res) {
    const params = req.params[0];
    try{
      const thought = await Thought.findOneAndUpdate(
        { _id: params[0]},
        { $set: req.body },
        {runValidators: true, new: true}
      );
      
      if(!thought) res.status(404).json({message: `No thought found with the ID : ${params[0]}`})
      
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
    try {
      res.status(404).json({message: 'Coming Soon'}); //TODO Adding Friend Logic
    } catch (err) {
      res.status(500).json(err);
    }
  },
  async removeReaction(req, res) {
    try {
      res.status(404).json({message: 'Coming Soon'}); //TODO Adding Friend Logic
    } catch (err) {
      res.status(500).json(err);
    }
  },
}
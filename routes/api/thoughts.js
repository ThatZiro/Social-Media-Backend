//api/thoughts
const router = require('express').Router();

// example data
// {
//   "thoughtText": "Here's a cool thought...",
//   "username": "lernantino",
//   "userId": "5edff358a0fcb779aa7b118b"
// }

const {
  getThoughts, getThoughtsByID, createThought, updateThoughtsById, deleteThoughtById, addReaction, removeReaction,
} = require('../../controllers/thoughtcontroller');

// /api/thoughts
//GET to get all thoughts
//Post to create a new thought
router.route('/').get(getThoughts).post(createThought);

// /api/users/:thoughtId
//GET to get a single thought by its _id
//PUT to update a thought by its _id
//DELETE to remove a thought by its _id
router.route('/:thoughtId').get(getThoughtsByID).put(updateThoughtsById).delete(deleteThoughtById)

//api/thoughts/:thoughtId/reactions
//POST to create a reaction stored in a sing;e thought's reactions array field
router.route('/:thoughtId/reactions').post(addReaction)

//api/thoughts/:thoughtId/reactions/:reactionId
//DELETE to pull and remove a reaction by the reacts reactionId value
router.route('/:thoughtId/reactions/:reactionId').delete(removeReaction)

module.exports = router;
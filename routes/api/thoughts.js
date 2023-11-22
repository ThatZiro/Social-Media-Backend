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
router.route('/').get(getThoughts)

// /api/users/:thoughtId
//GET to get a single thought by its _id
router.route('/:thoughtId').get(getThoughtsByID)

// /api/users/ POST
//Post to create a new thought
router.route('/:thoughtId').post(createThought)
// TODO (Don't forget to push the created thought's _id to the associate user's thoughts array field)

// /api/users/:thoughtId
//PUT to update a thought by its _id
router.route('/:thoughtId').put(updateThoughtsById)


// /api/users/:thoughtId
//DELETE to remove a thought by its _id
router.route('/:thoughtId').delete(deleteThoughtById)

//api/thoughts/:thoughtId/reactions
//POST to create a reaction stored in a sing;e thought's reactions array field
router.route('/:thoughtId/reactions').post(addReaction)

//api/thoughts/:thoughtId/reactions/:reactionId
//DELETE to pull and remove a reaction by the reacts reactionId value
router.route('/:thoughtId/reactions').delete(removeReaction)

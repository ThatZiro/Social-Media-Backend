//api/thoughts
const router = require('express').Router();

//TODO Add User Controller

// /api/thoughts
router.route('/') //GET to get all thoughts

// /api/users/:thoughtId
router.route('/:thoughtId') //GET to get a single thoguth by it's _id

// /api/users/ POST
// example data
// {
//   "thoughtText": "Here's a cool thought...",
//   "username": "lernantino",
//   "userId": "5edff358a0fcb779aa7b118b"
// }
router.route('/:thoughtId') //Post to create a new thought
//  (Don't forget to push the created thought's _id to the associate user's thoughts array field)

// /api/users/:thoughtId
router.route('/:thoughtId') //PUT to update a thought by its _id

// /api/users/:thoughtId
router.route('/:thoughtId') //DELETE to remove a thought by its _id

//api/thoughts/:thoughtId/reactions
router.route('/:thoughtId/reactions') //POST to create a reaction stored in a sing;e thought's reactions array field

//api/thoughts/:thoughtId/reactions/:reactionId
router.route('/:thoughtId/reactions') //DELETE to pull and remove a reaction by the react's reactionId value

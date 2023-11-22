const router = require('express').Router();

//TODO Add User Controller

// /api/users
router.route('/') //Get to get all Users

// /api/users/:userId
router.route('/:userId') //Get a single user populate thought and friend data

// /api/users POST
// ==== example data ====
// {
//   "username": "lernantino",
//   "email": "lernantino@gmail.com"
// }
router.route('/') //Post a new user

// /api/users/:userId PUT
// ==== example data ====
// {
//   "username": "lernantino",
//   "email": "lernantino@gmail.com"
// }
router.route('/:userId') //PUT to update a user by its _id

// api/users/:userId DELETE
router.route('/:userId') //DELETE to remove user by its _id
//TODO Bonus Remove a users associated thoughts when deleted

// api/users/:userId/friends/:friendId
router.route('/:userId/friends/:friendId') //Post to add a new friend to a user's friends list

//api/users/:userId/friends/:friendId
router.route('/:userId/friends/:friendId') //DELETE to remove a friend from a users friends list


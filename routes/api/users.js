const router = require('express').Router();

const {
  getUsers, createUser, getUserById, deleteUserById,
} = require('../../controllers/userController');
// ==== example data ====
// {
//   "username": "lernantino",
//   "email": "lernantino@gmail.com"
// }

// /api/users
//GET all users
//POST create new user
router.route('/').get(getUsers).post(createUser)

// /api/users/:userId
//Get a single user
router.route('/:userId').get(getUserById)//TODO populate thought and friend data

// /api/users/:userId PUT
router.route('/:userId') //TODO PUT to update a user by its _id

// api/users/:userId
//DELETE to remove user by its _id
router.route('/:userId').delete(deleteUserById)
//TODO Bonus Remove a users associated thoughts when deleted

// api/users/:userId/friends/:friendId
router.route('/:userId/friends/:friendId') //TODO Post to add a new friend to a user's friends list

//api/users/:userId/friends/:friendId
router.route('/:userId/friends/:friendId') //TODO DELETE to remove a friend from a users friends list


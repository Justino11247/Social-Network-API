const router = require('express').Router();
const {
  getUsers,
  getSingleUser,
  createUser,
  deleteUser,
  updateUser,
  addFriend,
  removeFriend
} = require('../../controllers/userController');

// /api/users
router.route('/').get(getUsers).post(createUser);

// /api/users/:userId
router.route('/:userId').get(getSingleUser).delete(deleteUser).patch(updateUser);

// /api/users/:userId/friend
router.route('/:userId/friend').post(addFriend);

// /api/users/:userId/friend/:friendId
router.route('/:userId/friend/:friendId').delete(removeFriend);

module.exports = router;

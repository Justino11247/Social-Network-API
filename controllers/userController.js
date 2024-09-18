const { User, Thoughts } = require('../models');

module.exports = {
  // Get all users
  async getUsers(req, res) {
    try {
      const users = await User.find();
      res.json(users);

    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },
  // Get a single user
  async getSingleUser(req, res) {
    try {
      const user = await User.findOne({ _id: req.params.userId })
      .populate('thoughts')
      .populate('friends')
        .select('-__v');

      if (!user) {
        return res.status(404).json({ message: 'No user with that ID' })
      }

      res.json(user);

    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },
  // create a new user
  async createUser(req, res) {
    try {
      const user = await User.create(req.body);
      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // Delete a user and remove them from the thoughts
  async deleteUser(req, res) {
    try {
      const user = await User.findOneAndDelete({ _id: req.params.userId });
  
      if (!user) {
        return res.status(404).json({ message: 'No such user exists' });
      }
  
      console.log(`Deleting user: ${JSON.stringify(user)}`);
      const deletedThought = await Thoughts.deleteMany({username: user.username});
      console.log(`Deleted associated thoughts`);
  
      res.status(200).json({ 
        message: 'User successfully deleted',
        deletedThoughts: deletedThought
      });
  
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },

  async updateUser(req, res) {
    try {
      const user = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $set: req.body },
        { runValidators: true, new: true }
      );
      res.json(user);

    } catch (err) {
      console.log(err)
      res.status(500).json(err);
    }
  },

  // Add an friend to a user
  async addFriend(req, res) {
    console.log('You are adding a friend');
    console.log(req.body);
  
    try {
      // Ensure the friendId is provided in the request body
      if (!req.body.friendId) {
        return res.status(400).json({ message: 'Friend ID is required' });
      }
  
      const user = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $addToSet: { friends: req.body.friendId } },
        { runValidators: true, new: true }
      );
  
      if (!user) {
        return res
          .status(404)
          .json({ message: 'No user found with that ID :(' });
      }
  
      res.json(user);
    } catch (err) {
      console.error('Error adding friend:', err);
      res.status(500).json({ message: 'Error adding friend', error: err.message });
    }
  },

  // Remove friend from a user
  async removeFriend(req, res) {
  try {
    const user = await User.findOneAndUpdate(
      { _id: req.params.userId },
      { $pull: { friends: req.params.friendId } },
      { runValidators: true, new: true }
    );

    if (!user) {
      return res.status(404).json({ message: 'No user found with that ID :(' });
    }

    res.json(user);
  } catch (err) {
    console.error('Error removing friend:', err);
    res.status(500).json({ message: 'Error removing friend', error: err.message });
  }
  }
}

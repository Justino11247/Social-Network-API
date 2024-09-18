const { Thoughts, User, } = require('../models');

module.exports = {
  // Get all thoughtss
  async getThoughts(req, res) {
    try {
      const thoughts = await Thoughts.find();
      res.status(200).json(thoughts);
    } catch (err) {
      console.error('Error in getThoughts:', err);
      res.status(500).json({ message: 'Server error', error: err.message });
    }
  },

  // Get a thoughts
  async getSingleThought(req, res) {
    try {
      const thoughts = await Thoughts.findOne({ _id: req.params.thoughtsId })
        .populate('users');

      if (!thoughts) {
        return res.status(404).json({ message: 'No thoughts with that ID' });
      }

      res.json(thoughts);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  
  // Create a thoughts
  async createThoughts(req, res) {
    try {
      const thoughts = await Thoughts.create(req.body);
      res.status(200).json(thoughts);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },
  // Delete a thoughts
  async deleteThoughts(req, res) {
    try {
      const thoughts = await Thoughts.findOneAndDelete({ _id: req.params.thoughtsId });

      if (!thoughts) {
        res.status(404).json({ message: 'No thoughts with that ID' });
      }

      await User.deleteMany({ _id: { $in: thoughts.users } });
      res.json({ message: 'Thoughts and users deleted!' });
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // Update a thoughts
  async updateThoughts(req, res) {
    try {
      const thoughts = await Thoughts.findOneAndUpdate(
        { _id: req.params.thoughtsId },
        { $set: req.body },
        { runValidators: true, new: true }
      );

      if (!thoughts) {
        res.status(404).json({ message: 'No thoughts with this id!' });
      }

      res.json(thoughts);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  async createReaction(req, res) {
    try {

      const thought = await Thought.findByIdAndUpdate(
        req.params.thoughtId,
        { $addToSet: { reactions: req.body} },
        { runValidators: true, new: true }
      );

      if (!thought){
        return res.status(404).json({ message: 'No such thought exists' });
      }

      res.status(201).json(thought);
    } catch (err) {
      console.log(err)
      res.status(500).json(err);
    }
  },

  async deleteReaction(req, res) {
    try {
      const thought = await Thoughts.findByIdAndUpdate(
        req.params.thoughtId,
        { $pull: { reactions: {reactionId : req.params.reactionId}} },
        { runValidators: true, new: true}
      )

      if (!thought){
        return res.status(404).json({ message: 'No such user exists' });
      }

      res.status(200).json({ message: 'Reaction successfully deleted' });
    } catch (err) {
      console.log(err);
      res.status(500).json(err)
    }
  }
};

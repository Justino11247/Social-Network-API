const {Thought, User} = require('../models');

module.exports = {
  // Get all thoughts
  async getThoughts(req, res) {
    try {
      const thoughts = await Thought.find();
      res.status(200).json(thoughts);
    } catch (err) {
      console.error('Error in getThoughts:', err);
      res.status(500).json({ message: 'Server error', error: err.message });
    }
  },

  // Get a single thought
  async getSingleThought(req, res) {
    try {
      const thought = await Thought.findById(req.params.thoughtId);
      if (!thought) {
        return res.status(404).json({ message: 'No thought with that ID' });
      }
      res.json(thought);
    } catch (err) {
      console.error('Error in getSingleThought:', err);
      res.status(500).json({ message: 'Server error', error: err.message });
    }
  },

  // Create a thought
  async createThought(req, res) {
    try {
      const thought = await Thought.create(req.body);
      res.status(201).json(thought);
    } catch (err) {
      console.error('Error creating thought:', err);
      res.status(500).json({ message: 'Error creating thought', error: err.message });
    }
  },

  // Update a thought
  async updateThought(req, res) {
    try {
      const thought = await Thought.findByIdAndUpdate(
        req.params.thoughtId,
        { $set: req.body },
        { runValidators: true, new: true }
      );
      if (!thought) {
        return res.status(404).json({ message: 'No thought with this id!' });
      }
      res.json(thought);
    } catch (err) {
      console.error('Error updating thought:', err);
      res.status(500).json({ message: 'Error updating thought', error: err.message });
    }
  },

  // Delete a thought
  async deleteThought(req, res) {
    try {
      const thought = await Thought.findByIdAndDelete(req.params.thoughtId);
      if (!thought) {
        return res.status(404).json({ message: 'No thought with that ID' });
      }
      res.json({ message: 'Thought deleted successfully' });
    } catch (err) {
      console.error('Error deleting thought:', err);
      res.status(500).json({ message: 'Error deleting thought', error: err.message });
    }
  },

  // Create a reaction
  async createReaction(req, res) {
    try {
      const thought = await Thought.findByIdAndUpdate(
        req.params.thoughtId,
        { $push: { reactions: req.body } },
        { runValidators: true, new: true }
      );
      if (!thought) {
        return res.status(404).json({ message: 'No thought with that ID' });
      }
      res.status(201).json(thought);
    } catch (err) {
      console.error('Error creating reaction:', err);
      res.status(500).json({ message: 'Error creating reaction', error: err.message });
    }
  },

  // Delete a reaction
  async deleteReaction(req, res) {
    try {
      const thought = await Thought.findByIdAndUpdate(
        req.params.thoughtId,
        { $pull: { reactions: { _id: req.params.reactionId } } },
        { runValidators: true, new: true }
      );
  
      if (!thought) {
        return res.status(404).json({ message: 'No thought found with this id' });
      }
  
      res.json(thought);
    } catch (err) {
      console.error('Error deleting reaction:', err);
      res.status(500).json({ message: 'Error deleting reaction', error: err.message });
    }
  }
};
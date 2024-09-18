const router = require('express').Router();
const {
  getThoughts,
  getSingleThought,
  createThoughts,
  updateThoughts,
  deleteThoughts,
  deleteReaction,
  createReaction,
} = require('../../controllers/thoughtsController.js');

// /api/Thoughtss
router.route('/').get(getThoughts).post(createThoughts);

// /api/Thoughtss/:ThoughtsId
router
  .route('/:ThoughtsId')
  .get(getSingleThought)
  .put(updateThoughts)
  .delete(deleteThoughts);

// /api/thoughts/:thoughtId/reactions/:reactionId
router
  .route('/:thoughtsId/reactions/:reactionId')
  .delete(deleteReaction);

// /api/thoughts/:thoughtId/reactions/
router
  .route('/:thoughtsId/reactions/')
  .post(createReaction)

module.exports = router;

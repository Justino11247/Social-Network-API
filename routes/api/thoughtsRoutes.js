const router = require('express').Router();
const {
  getThoughts,
  getSingleThought,
  createThoughts,
  updateThoughts,
  deleteThoughts,
} = require('../../controllers/thoughtsController.js');

// /api/Thoughtss
router.route('/').get(getThoughts).post(createThoughts);

// /api/Thoughtss/:ThoughtsId
router
  .route('/:ThoughtsId')
  .get(getSingleThought)
  .put(updateThoughts)
  .delete(deleteThoughts);

router
  .route('/reactions/:reactionId')
  .post(createReaction)
  .delete(deleteReaction)

module.exports = router;

const router = require('express').Router({ mergeParams: true });
const reviewController = require('../controllers/reviewController');
const authController = require('../controllers/authController');
const UserRole = require('./../utils/UserRole');

router.use(authController.protect);

router.route('/')
  .get(reviewController.getAllReviews)
  .post(authController.restrictTo(UserRole.USER), reviewController.setTourUserIds, reviewController.createReview);

router.route('/:id')
  .get(reviewController.getReview)
  .patch(authController.restrictTo(UserRole.USER, UserRole.ADMIN),
    reviewController.updateReview)
  .delete(authController.restrictTo(UserRole.USER, UserRole.ADMIN),
    reviewController.deleteReview);

module.exports = router;
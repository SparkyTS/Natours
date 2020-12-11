const router = require('express').Router();

const tourController = require('./../controllers/tourController');
const authController = require('./../controllers/authController');
const reviewRouter = require('./../routes/reviewRoute');
const UserRole = require('./../utils/UserRole');


router.use('/:tourId/reviews', reviewRouter);

// router.param('id', tourController.checkID);

router.route('/top-5-cheap').get(tourController.aliasTopTours, tourController.getAllTours);
router.route('/tour-stats').get(tourController.getTourStats);
router.route('/monthly-plan/:year').get(authController.protect,
  authController.restrictTo(UserRole.ADMIN, UserRole.LEAD_GUIDE, UserRole.GUIDE),
  tourController.getMonthlyPlan);

router.route('/tours-within/:distance/center/:latlng/unit/:unit').get(tourController.getToursWithin);

router
  .route('/')
  .get(tourController.getAllTours)
  .post(authController.protect,
    authController.restrictTo(UserRole.ADMIN, UserRole.LEAD_GUIDE),
    tourController.createTour);

router
  .route('/:id')
  .get(tourController.getTourById)
  .patch(authController.protect,
    authController.restrictTo(UserRole.ADMIN, UserRole.LEAD_GUIDE),
    tourController.updateTour)
  .delete(authController.protect,
    authController.restrictTo(UserRole.ADMIN, UserRole.LEAD_GUIDE),
    tourController.deleteTour);

module.exports = router;
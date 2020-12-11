const router = require('express').Router();

const userController = require('./../controllers/userController');
const authController = require('./../controllers/authController');
const UserRole = require('./../utils/UserRole');

router.post('/signup', authController.signup);
router.post('/login', authController.login);
router.post('/forgotPassword', authController.forgotPassword);
router.patch('/resetPassword/:token', authController.resetPassword);

// Protecting all the routes configured after this line
// Only logged in user will be able to access the routes after the below line
router.use(authController.protect);

router.patch('/updateMyPassword', authController.updatePassword);
router.get('/me', userController.getMe, userController.getUser);
router.patch('/updateMe', userController.updateMe);
router.delete('/deleteMe', userController.deleteMe);

// Restricting the routes after the following line to admin only.
router.use(authController.restrictTo(UserRole.ADMIN));

router
  .route('/')
  .get(userController.getAllUser)
  .post(userController.createUser);

router
  .route('/:id')
  .get(userController.getUser)
  .patch(userController.updateUser)
  .delete(userController.deleteUser);

module.exports = router;
const User = require('./../models/userModel');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/AppError');
const factory = require('./handlerFactory');

exports.getMe = (req, res, next) => {
  req.params.id = req.user.id;
  next();
};

exports.updateMe = catchAsync(async (req, res, next) => {

  if (req.body.password || req.body.passwordConfirm)
    return next(new AppError('This route is not for password updates. Please use /updateMyPassword.', 400));

  const { name, email } = req.body;
  const updatedUser = await User.findByIdAndUpdate(req.user._id, { name, email }, {
    new: true,
    runValidators: true
  });

  res.status(200).json(
    {
      status: 'success',
      user: updatedUser
    });
});

exports.deleteMe = catchAsync(async (req, res, next) => {
  await User.findByIdAndUpdate(req.user._id, { active: false });
  res.status(204).json(
    {
      status: 'success',
      data: null
    });
});

exports.createUser = (req, res) => {
  res.status(500).json(
    {
      status: 'error',
      message: 'This route is not defined! please use /signUp instead.'
    });
};

exports.getAllUser = factory.getAll(User);
exports.getUser = factory.getOne(User);
//Do not user this method to update USER password
exports.updateUser = factory.updateOne(User);
exports.deleteUser = factory.deleteOne(User);
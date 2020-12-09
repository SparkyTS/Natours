const Review = require('./../models/reviewModel');
const catchAsync = require('./../utils/catchAsync');
const APIFeatures = require('./../utils/apiFeatures');
const factory = require('./handlerFactory');

exports.createReview = catchAsync(async (req, res, next) => {

  if (!req.body.tour) req.body.tour = req.params.tourId;
  req.body.user = req.user.id;

  const newReview = await Review.create(req.body);
  res.status(200).json({
    status: 'success',
    data: newReview
  });
});

exports.getAllReviews = catchAsync(async (req, res, next) => {

  const features = new APIFeatures(Review.find(), req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate();

  const reviews = await features.mQuery;
  res.status(200).json({
    status: 'success',
    results: reviews.length,
    data: { reviews }
  });
});

exports.deleteReview = factory.deleteOne(Review);
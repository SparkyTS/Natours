const Tour = require('./../models/tourModel');

const tours = [];
//writing actual handlers
exports.getAllTours = (req, res) => {
  res.status(200).json(
    {
      status: 'success',
      requestedAt: req.requestTime,
      results: tours.length,
      data: { tours }
    });
};

exports.getTourById = (req, res) => {
  res.status(200).json(
    {
      status: 'success',
      data: req.tour // filtered tour from the check id middleware
    });
};

exports.createTour = async (req, res) => {
  try {
    const newTour = await Tour.create(req.body);
    res.status(201)
      .json({
        status: 'success',
        data: {
          tour: newTour
        }
      });
  } catch (err) {
    res
      .status(400)
      .json({
        status: 'fail',
        message: 'Invalid data sent!'
      });
  }
};

exports.updateTour = (req, res) => {
  // const id = req.params.id * 1;
  // // tour filtered from the check id middleware
  // const tour = req.tour;
  // // removing the tour which needs to be updated
  // tours = tours.filter(t => t.id !== id);
  // // updating the tour and adding back to tours
  // const newTour = Object.assign(tour, req.body);
  // tours.push(newTour);
  // // sorting the tours based on tour id before saving to the file ( not sorting the data would break the code for creating tour )
  // tours.sort((t1, t2) => t1.id - t2.id);
  // // finally storing updated tours in the file and returning the response
  // fs.writeFile(`${__dirname}/dev-data/data/tours-simple.json`, JSON.stringify(tours), err => {
  //   res.status(201).json({
  //     status: 'success',
  //     data: {
  //       tour: newTour
  //     }
  //   });
  // });
};

exports.deleteTour = (req, res) => {
  // const id = req.params.id * 1;
  // tours = tours.filter(t => t.id !== id);
  res.status(204).json({
    status: 'success',
    data: null
  });
  // commenting out the code which preform actual changes to the file to preserve the data
  /*fs.writeFile(`${__dirname}/dev-data/data/tours-simple.json`, JSON.stringify(tours), err => {
    res.status(204).json({
      status: 'success',
      data: null
    });
  });*/
};
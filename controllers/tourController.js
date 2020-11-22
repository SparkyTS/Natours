const fs = require('fs');

let tours = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
);

exports.checkID = (req, res, next, val) => {
  const id = val * 1;
  const tour = tours.find(t => t.id === id);

  if (!tour) {
    return res.status(400).json(
      {
        status: 'fail',
        message: 'Invalid ID'
      });
  }
  next();
};

exports.getAllTours = (req, res) => {
  res.status(200).json(
    {
      status: 'success',
      requestedAt: req.requestTime,
      results: tours.length,
      data: { tours }
    });
};

exports.getTourByID = (req, res) => {
  const id = req.params.id * 1;
  res.status(200).json(
    {
      status: 'success',
      data: tours.find(t => t.id === id)
    });
};

exports.createTour = (req, res) => {
  const newId = tours[tours.length - 1].id + 1;
  const newTour = Object.assign({ id: newId }, req.body);

  tours.push(newTour);
  fs.writeFile(`${__dirname}/dev-data/data/tours-simple.json`, JSON.stringify(tours), err => {
    res.status(201).json({
      status: 'success',
      data: {
        tour: newTour
      }
    });
  });
};

exports.updateTour = (req, res) => {
  const id = req.params.id * 1;
  // finding the tour with id equals to the tour id passed in request
  const tour = tours.find(t => t.id === id);
  // removing the tour which needs to be updated
  tours = tours.filter(t => t.id !== id);
  // updating the tour and adding back to tours
  const newTour = Object.assign(tour, req.body);
  tours.push(newTour);
  // sorting the tours based on tour id before saving to the file ( not sorting the data would break the code for creating tour )
  tours.sort((t1, t2) => t1.id - t2.id);
  // finally storing updated tours in the file and returning the response
  fs.writeFile(`${__dirname}/dev-data/data/tours-simple.json`, JSON.stringify(tours), err => {
    res.status(201).json({
      status: 'success',
      data: {
        tour: newTour
      }
    });
  });
};

exports.deleteTour = (req, res) => {
  const id = req.params.id * 1;
  tours = tours.filter(t => t.id !== id);
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
const fs = require('fs');

let tours = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
);


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
  const tour = tours.find(t => t.id === id);

  if (!tour) {
    return res.status(400).json(
      {
        status: 'fail',
        message: 'Invalid ID'
      });
  }

  res.status(200).json(
    {
      status: 'success',
      data: tour
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
  const tour = tours.find(t => t.id === id);
  if (!tour) {
    return res.status(400).json(
      {
        status: 'fail',
        message: 'Invalid ID'
      });
  }

  tours = tours.filter(t => t.id !== id);
  const newTour = Object.assign(tour, req.body);
  tours.push(newTour);
  tours.sort((t1, t2) => t1.id - t2.id);
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
  const tour = tours.find(t => t.id === id);
  if (!tour) {
    return res.status(400).json(
      {
        status: 'fail',
        message: 'Invalid ID'
      });
  }

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
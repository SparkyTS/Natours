const express = require('express');
const fs = require('fs');

const app = express();

app.use(express.json());

let tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);

app.get('/api/v1/tours', (req, res) => {
  res.status(200).json(
    {
      status: 'success',
      results: tours.length,
      data: { tours }
    });
});

app.get('/api/v1/tours/:id', (req, res) => {
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
});

app.post('/api/v1/tours', (req, res) => {
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
});

app.patch('/api/v1/tours/:id', (req, res) => {

  const id = req.params.id * 1;
  const tour = tours.find(t => t.id === id);
  if (!tour) {
    return res.status(400).json(
      {
        status: 'fail',
        message: 'Invalid ID'
      });
  }

  tours = tours.filter(t => t.id !== id)
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
});

const port = 3000;
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
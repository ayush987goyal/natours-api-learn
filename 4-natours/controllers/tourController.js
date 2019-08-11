const Tour = require('../models/tourModel');

exports.checkBody = (req, res, next) => {
  const {
    body: { name, price }
  } = req;

  if (!name || !price) {
    return res.status(400).json({
      status: 'fail',
      message: 'Missing name or price'
    });
  }

  next();
};

exports.getAllTours = (req, res) => {
  res.status(200).json({
    status: 'success',
    requestedAt: req.requestTime
    // results: tours.length,
    // data: {
    //   tours
    // }
  });
};

exports.getTour = (req, res) => {
  // const id = +req.params.id;

  res.status(200).json({
    status: 'success'
    // results: tours.length,
    // data: {
    //   tour
    // }
  });
};

exports.createTour = (req, res) => {
  res.status(201).json({
    status: 'success',
    data: {
      // tour: newTour
    }
  });
};

exports.updateTour = (req, res) => {
  res.status(200).json({
    status: 'success',
    data: {
      tour: '<Updated Tour Here>'
    }
  });
};

exports.deleteTour = (req, res) => {
  res.status(204).json({
    status: 'success',
    data: null
  });
};

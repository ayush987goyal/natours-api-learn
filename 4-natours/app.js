const express = require('express');
const morgan = require('morgan');

const tourRouter = require('./Routes/tourRoutes');
const userRouter = require('./Routes/userRoutes');

const app = express();

// Middlewares
app.use(morgan('dev'));
app.use(express.json());

app.use((req, res, next) => {
  console.log('Hello from middle');
  next();
});

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

// Routes
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

module.exports = app;

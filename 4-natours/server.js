require('dotenv').config({ path: './config.env' });
const mongoose = require('mongoose');

process.on('uncaughtException', err => {
  console.log('UNCAUGHT EXCEPTION! Shutting down...');
  console.log(err.name, err.message);

  process.exit(1);
});

const app = require('./app');

const DB = process.env.DB_URL.replace('<PASSWORD>', process.env.DB_PASSWORD);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
  })
  .then(() => console.log('DB connection successful!'));

const PORT = process.env.PORT || 3000;
const server = app.listen(PORT, () => {
  console.log(`App running on port http://localhost:${PORT} ...`);
});

process.on('unhandledRejection', err => {
  console.log('UNHANDLED REJECTION! Shutting down...');
  console.log(err.name, err.message);

  server.close(() => {
    process.exit(1);
  });
});

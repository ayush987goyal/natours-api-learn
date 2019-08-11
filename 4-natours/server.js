require('dotenv').config({ path: './config.env' });
const mongoose = require('mongoose');

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
app.listen(PORT, () => {
  console.log(`App running on port http://localhost:${PORT} ...`);
});

const express = require('express');

const app = express();

app.get('/', (req, res) => {
  res.status(200).json({ message: 'Hello world!', app: 'Natours' });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`App running on port http://localhost:${PORT} ...`);
});

require('dotenv').config();
const express = require('express');

const app = express();

app.get('/', (req, res) => {
  res.json({ message: 'hello there!' });
});

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server run on http://localhost:${port}/`));

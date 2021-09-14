const express = require('express');
const morgan = require('morgan');

require('dotenv').config();
// require('express-async-errors');

const app = express();

// routes
const userRoutes = require('./routes/userRoutes');

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan('dev'));

// routes
app.use('/api/users', userRoutes);

// 404 endpoint
app.all('*', (req, res) => {
  res.status(404).json({ message: `${req.originalUrl} not found!` });
});

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server run on http://localhost:${port}/`));

const mongoSanitize = require('express-mongo-sanitize');
const mongoose = require('mongoose');
const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const xss = require('xss-clean');

const ErrorHandler = require('./utils/ErrorHandler');

require('dotenv').config();
require('express-async-errors');

const app = express();
const port = process.env.PORT || 5000;
const host = process.env.HOST || 'localhost';

// set up database
mongoose
  .connect(process.env.DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('database connected');
    app.listen(port, () => console.log(`Server run on http://${host}:${port}/`));
  })
  .catch((err) => console.log(err));

// routes
const userRoutes = require('./routes/userRoutes');

// middleware
app.use(morgan('dev'));
app.use(cors());
app.use(helmet());
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: false, limit: '10kb' }));
app.use(mongoSanitize());
app.use(xss());
// routes
app.use('/api/users', userRoutes);

// 404 endpoint
app.all('*', (req, res) => {
  res.status(404).json({ message: `${req.originalUrl} not found!` });
});

// error handler
app.use(ErrorHandler);

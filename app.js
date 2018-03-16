const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');

const app = express();

// Only log error responses
app.use(morgan('dev'));

// Cross-Origin Resource Sharing
// Enable All CORS Requests
app.use(cors());

const products = require('./api/routes/products/index');
const orders = require('./api/routes/orders/index');

// Parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// Parse application/json
app.use(bodyParser.json());

// Routes which should handle request
app.use('/products', products);
app.use('/orders', orders);

app.use((req, res, next) => {
  const error = new Error('Not found');
  error.status = 404;
  next(error);
});

app.use((error, req, res) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message,
    },
  });
});

module.exports = app;

const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');

const app = express();

// Only log error responses
morgan('combined', {
  skip(req, res) { return res.statusCode < 400; },
});

const products = require('./api/routes/products/index');
const orders = require('./api/routes/orders/index');

// Parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// Parse application/json
app.use(bodyParser.json());

app.use('/products', products);
app.use('/orders', orders);

module.exports = app;

const express = require('express');
const bodyParser = require('body-parser');

const app = express();

const products = require('./api/routes/products/index');
const orders = require('./api/routes/orders/index');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/products', products);
app.use('/orders', orders);

module.exports = app;

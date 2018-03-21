const express = require('express');
const mongoose = require('mongoose');

const router = express.Router();
const Order = require('../../model/order');
const Product = require('../../model/product');

router.get('/', (req, res) => {
  res.status(200).json({
    message: '/GET orders',
  });
});

router.get('/:id', (req, res) => {
  const { id } = req.params;
  res.status(200).json({
    id,
    message: `/GET orders by ID: ${id}`,
  });
});

router.post('/', (req, res) => {
  const { productId, quantity } = req.body;
  const order = new Order({
    _id: new mongoose.Types.ObjectId(),
    productId,
    quantity,
    // name: [{ type: mongoose.Schema.Types.String, ref: 'Product' }],
    // price: [{ type: mongoose.Schema.Types.Number, ref: 'Product' }],
  });

  order.save()
    .then((result) => {
      res.status(201).json({
        _id: result.id,
        Order: {
          // name: result.name,
          // price: result.price,
          quantity: result.quantity,
        },
      });
    })
    .catch(err => res.status(500).json({ error: err }));
});

router.delete('/:id', (req, res) => {
  const { id } = req.params;
  res.status(200).json({
    message: `/DELETE delete order by ID: ${id}`,
  });
});

module.exports = router;

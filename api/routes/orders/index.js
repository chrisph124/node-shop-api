const express = require('express');

const router = express.Router();

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
  const order = {
    productId: req.body.productId,
    quantity: req.body.quantity,
  };
  res.status(201).json(order);
});

router.delete('/:id', (req, res) => {
  const { id } = req.params;
  res.status(200).json({
    message: `/DELETE delete order by ID: ${id}`,
  });
});

module.exports = router;

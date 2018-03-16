const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
  res.status(200).json({
    message: '/GET products',
  });
});

router.get('/:id', (req, res) => {
  const { id } = req.params;
  res.status(200).json({
    message: `/GET products by ID: ${id}`,
  });
});

router.post('/', (req, res) => {
  const product = {
    name: req.body.name,
    price: req.body.price,
  };
  res.status(200).json({
    createdProduct: { product },
  });
});

router.patch('/:id', (req, res) => {
  const { id } = req.params;
  res.status(200).json({
    message: `/PATCH update products by ID: ${id}`,
  });
});

router.delete('/:id', (req, res) => {
  const { id } = req.params;
  res.status(200).json({
    message: `/DELETE delete products by ID: ${id}`,
  });
});

module.exports = router;

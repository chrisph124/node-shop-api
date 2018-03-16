const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
  res.status(200).json({
    message: '/GET products',
  });
});

router.get('/:id', (req, res) => {
  res.status(200).json({
    message: '/GET products by ID',
  });
});

router.post('/', (req, res) => {
  res.status(201).json({
    message: '/POST products',
  });
});

router.patch('/:id', (req, res) => {
  res.status(200).json({
    message: '/PATCH update products by ID',
  });
});

router.delete('/:id', (req, res) => {
  res.status(200).json({
    message: '/DELETE delete products by ID',
  });
});

module.exports = router;

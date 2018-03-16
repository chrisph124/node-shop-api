const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
  res.status(200).json({
    message: '/GET orders',
  });
});

router.get('/:id', (req, res) => {
  res.status(200).json({
    message: '/GET orders by ID',
  });
});

router.post('/', (req, res) => {
  res.status(201).json({
    message: '/POST orders',
  });
});

router.delete('/:id', (req, res) => {
  res.status(200).json({
    message: '/DELETE delete order by ID',
  });
});

module.exports = router;

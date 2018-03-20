const express = require('express');
const mongoose = require('mongoose');

const router = express.Router();
const Product = require('../../model/product');

router.get('/', (req, res) => {
  Product.find().exec()
    .then((docs) => {
      if (docs.length >= 0) {
        res.status(200).json({ docs });
      } else {
        res.status(404).json({
          message: 'No entries found',
        });
      }
    })
    .catch(err => res.status(500).json({ error: err }));
});

router.get('/:id', (req, res) => {
  const { id } = req.params;
  Product.findById(id)
    .exec()
    .then((doc) => {
      if (doc) {
        res.status(200).json(doc);
      } else {
        res.status(400).json('Invalid ID');
      }
    })
    .catch(err => res.status(500).json({ error: err }));
});

router.post('/', (req, res) => {
  const { name, price } = req.body;
  const product = new Product({
    _id: new mongoose.Types.ObjectId(),
    name,
    price,
  });
  product.save()
    .then(result => res.status(200).json({
      createdProduct: { result },
    }))
    .catch(err => res.status(500).json({ error: err }));
});

router.patch('/:id', (req, res) => {
  const { id } = req.params;
  Product.findByIdAndUpdate({ _id: id }, { $set: req.body }).exec()
    .then(result => res.status(200).json(result))
    .catch(err => res.status(404).json({ error: err }));
});

router.delete('/:id', (req, res) => {
  const { id } = req.params;
  Product.remove({ _id: id })
    .exec()
    .then(result => res.status(200).json(result))
    .catch(err => res.status(500).json({ error: err }));
});

module.exports = router;

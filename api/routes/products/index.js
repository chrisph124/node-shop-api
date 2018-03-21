const express = require('express');
const mongoose = require('mongoose');

const router = express.Router();
const Product = require('../../model/product');

router.get('/', (req, res) => {
  Product.find().select('name price _id').exec()
    .then((docs) => {
      if (docs.length >= 0) {
        const response = {
          count: docs.length,
          products: docs.map(doc => ({
            _id: doc.id,
            name: doc.name,
            price: doc.price,
            request: {
              type: 'GET',
              url: `localhost:3000/product/${doc.id}`,
            },
          })),
        };
        res.json(response);
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
  Product.findById(id).select('_id name price')
    .exec()
    .then((doc) => {
      if (doc) {
        res.status(200).json({
          product: doc,
          request: {
            type: 'GET',
            url: `localhost:3000/products/${doc.id}`,
          },
        });
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
      message: 'Created product successfully',
      createdProduct: {
        _id: result.id,
        name: result.name,
        price: result.price,
        request: {
          type: 'GET',
          url: `localhost:3000/products/${result.id}`,
        },
      },
    }))
    .catch(err => res.status(500).json({ error: err }));
});

router.patch('/:id', (req, res) => {
  const { id } = req.params;
  Product.findByIdAndUpdate({ _id: id }, { $set: req.body }).exec()
    .then(() => res.status(200).json({
      message: 'Product updated',
      request: {
        type: 'GET',
        url: `localhost:3000/products/${id}`,
      },
    }))
    .catch(err => res.status(404).json({ error: err }));
});

router.delete('/:id', (req, res) => {
  const { id } = req.params;
  Product.remove({ _id: id })
    .exec()
    .then(() => res.status(200).json({
      message: 'Product deleted',
      request: {
        type: 'POST',
        url: 'localhost:3000/products',
        body: { name: 'String', price: 'Number' },
      },
    }))
    .catch(err => res.status(500).json({ error: err }));
});

module.exports = router;

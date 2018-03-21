const mongoose = require('mongoose');

const orderSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  name: { type: mongoose.Schema.Types.String, ref: 'Product' },
  price: { type: mongoose.Schema.Types.Number, ref: 'Product' },
  quantity: { type: mongoose.Schema.Types.Number, default: 1, required: true },
});

module.exports = mongoose.model('Order', orderSchema);

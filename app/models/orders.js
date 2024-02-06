const { Timestamp } = require('mongodb');
const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const orderItemSchema = new Schema({
    bookId: { type: Schema.Types.ObjectId, ref: 'Book', required: true },
    amount: { type: Number, required: true }
});
const orderSchema = new Schema({
    items: [OrderItwem],
    totalPrice: Number,
    date: { type: Timestamp, default: Date.now },
});

const OrderItem = model('OrderItem', orderItemSchema);
const Order = model('Order', orderSchema);
module.exports = Order;
const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const bookSchema = new Schema({
    title: { type: String, unique: true},
    publishingYear: Number,
    genres: [String],
    authors: { type: [Schema.Types.ObjectId], ref: 'Author' },
    quantity: Number,
    price: Number
});

const Book = model('Book', bookSchema);
module.exports = Book;
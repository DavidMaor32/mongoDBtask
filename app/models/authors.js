const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const authorSchema = new Schema({
    name: {type:String, unique:true, required:true},
    country: String,
});

const Author = model('Author', authorSchema);
module.exports = Author;
const bodyParser = require("body-parser");
const express = require('express');
const authorsRouter = require("./routes/authors");
const booksRouter = require("./routes/books");


const app = express();
app.use(bodyParser.json());
app.use('/api/authors', authorsRouter);
app.use('/api/books', booksRouter);

module.exports = app;



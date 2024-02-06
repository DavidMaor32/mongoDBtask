const Book = require("../models/books");
const Author = require("../models/authors");
/**
 * props may have the following properties:
 * - author
 * - searchInTitle
 * - genre
 * - minPublishingYear
 * - maxPublishingYear
 * - publishingYear
 * - country
 *  pagination offset start from 1, not 0
 */
module.exports = {
    getAllBooks: async (filterObj) => {
        const pagination = filterObj.pagination;
        const page = filterObj.page;
        const allBooks = await Book.find(filterObj.filter).limit(pagination).skip((page - 1) * pagination);
        return allBooks.map(p => ({
            id: p._id,
            title: p.title,
            publishingYear: p.publishingYear,
            authors: p.authors,
            genres: p.genres,
            quantity: p.quantity,
            price: p.price
        }));
    },
    deleteBook: async (strId) => {
        const deletCount = await Book.deleteOne({ _id: strId });
        return deletCount;
    },
    createBook: async (book) => {
        let authorExists = Author.exists({ _id: book.authors });
        if (!authorExists) {
            return {code: 400, message: "Author does not exist"};
        }
        const newBook = new Book({ ...book });
        return newBook.save();
    },
    createManyBooks: async (books) => {

        return Book.insertMany(books);
    
    }

}

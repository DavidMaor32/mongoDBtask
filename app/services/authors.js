const { default: mongoose } = require('mongoose');
const Author = require('../models/authors');
const Books = require('../models/books');
const { ObjectId } = require('mongodb');

module.exports = {
    createAuthor: async (name,country) => {
        const newAuthor = new Author({name,country});
        return newAuthor.save();
    },
    updateAuthor: async ({strId,newName, newCountry}) => {
        const update = {};
        if (newName !== undefined && newName !== null) {
            update.name = newName;
        }
        if (newCountry !== undefined && newCountry !== null) {
            update.country = newCountry;
        }

        const updatedAuthor = await Author.findOneAndUpdate(
            {
                _id:strId
            },
            update,
            {
                new: true
            }
        );
        
        return updatedAuthor;
    },
    getAllBooks: async (authorId,paging,offset) => {
        const allBooks = await Books.find({ authors: new ObjectId(authorId)})
                                    .limit(paging).skip((offset - 1) * paging);
        
        return allBooks.map(book => 
            ({
                title:book.title,
                publishingYear:book.publishingYear,
                genres:book.genres,
                quantity:book.quantity,
                price:book.price
            })
        );
    },
    getAuthors(paging,offset){
        return Author.find({}).limit(paging).skip((offset - 1) * paging);
    }
    
}
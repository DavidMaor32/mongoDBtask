const {getAllBooks, deleteBook, createBook, createManyBooks} = require("../services/books");

module.exports = {
    createBook: async (req, res) => {
        try{
            if(Array.isArray(req.body))
            {
                const newBooks = await createManyBooks(req.body);
                res.json(newBooks);
                return;
            }

            const {title, publishingYear, genres, authors, quantity, price} = req.body;
            const newBook = await createBook({
                title,
                publishingYear,
                genres,
                authors,
                quantity,
                price
            });
            res.json(newBook);
        }
        catch(err){
            console.log(err);
            res.status(500).send(err);
        }
    },
    deleteBook: async (req, res) => {
        try{
            const {id} = req.params;
            const deletedBook = await deleteBook(id);
            res.json(deletedBook);
        }
        catch(err){
            res.status(500).send(err);
        }
    },
    getAllBooks: async (req, res) => {
        try{
            const paging = req.query.paging || 10;
            const offset = req.query.offset || 1;
            const books = await getAllBooks({
                pagination:paging,
                page:offset,
                filter:getFilter(req.query)
            });
            res.json(books);
        }
        catch(err){
            res.status(500).send(err);
        }
    },
}


function getFilter(props){
    const filter = {};
    if(props.author){//check
        filter.author = new RegExp(props.author.replace('+', ' '), 'i');
    }
    if(props.searchInTitle){
        filter.title = new RegExp(props.searchInTitle.replace('+', ' '), 'i');
    }
    if(props.genres){//check
        filter.genres = new RegExp(props.genres.replace('+', ' '), 'i');
    }
    if(props.country){//check
        filter.country = new RegExp(props.country.replace('+', ' '), 'i');
    }

    
    const pubYear = {$or: []};
    if(props.publishingYear){
        pubYear.$or.push(props.publishingYear);
    }
    if(props.minPublishingYear && props.maxPublishingYear){
        const yearRange = {$and: []};
            yearRange.$and.push({$gte: props.minPublishingYear});
            yearRange.$and.push({$lte: props.maxPublishingYear});
        pubYear.$or.push(yearRange);
    }
    else if(props.minPublishingYear ^ props.maxPublishingYear){
        if(props.minPublishingYear)
            pubYear.$or.push({$gte: props.minPublishingYear});
        else
            pubYear.$or.push({$lte: props.maxPublishingYear});
        pubYear.$or.push(yearRange);
    }
    if(pubYear.$or.length > 0){
        filter.publishingYear = pubYear;
    }
    console.log(JSON.stringify(filter));
    return filter;
}
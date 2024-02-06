const {createAuthor, updateAuthor, getAllBooks,getAuthors} = require("../services/authors");

module.exports = {
    createAuthor: async (req, res) => {
        try{
            const {name, country} = req.body;
            const newAuthor = await createAuthor(name, country)
            res.json(newAuthor);
        }
        catch(err){
            res.status(500).send(err);
        }
    },
    updateAuthor: async (req, res) => {
        try{
            const id = req.params.id;
            const {name, country } = req.body;
            const updatedAuthor = await updateAuthor({
                strId:id,
                newCountry:country,
                newName:name
            });
            res.json(updatedAuthor);
        }
        catch(err){
            res.status(500).send(err);
        }
    },
    getAllBooks: async (req, res) => {
        try{
            const authorId = req.params.id;
            const paging = req.query.paging || 10;
            const offset = req.query.offset || 1;
            const books = await getAllBooks(authorId,paging,offset);
            res.json(books);
        }
        catch(err){
            console.log(err);
            res.status(500).send(err);
        }
    },
    getAuthors: async (req, res) => {
        try{
            const paging = req.query.paging || 10;
            const offset = req.query.offset || 1;
            const authors = await getAuthors(paging,offset);
            res.json(authors);
        }
        catch(err){
            res.status(500).send(err);
        }
    }

    
}

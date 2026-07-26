const Book = require('../model/Book');

module.exports = {
    async index(req, res) {
        const books = await Book.find({}, function (err, name) {
            return (null, name)
        });
        return res.status(200).send(books);
    },

    async store(req, res) {
        try {
            const newBook = await Book.create(req.body);
            return res.status(200).send({ newBook });
        } catch (err) {
            return res.status(400).send({ error: 'Book registration failed' });
        }
    }
};
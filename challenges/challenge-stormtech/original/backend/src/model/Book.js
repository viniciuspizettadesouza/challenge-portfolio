const { Schema, model } = require('mongoose');

const BookSchema = new Schema({
    id: {
        type: String,
    },
    title: {
        type: String,
    },
    author: {
        type: String,
    },
    edition_year: {
        type: String,
    },
}, {
    timestamps: true,
});

module.exports = model('book', BookSchema);
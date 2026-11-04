const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    stock: { type: Number, default: 0 },
    categories: { type: [String] },
    author: {
        name: { type: String, required: true },
        phone: { type: String },
        email: { type: String }
    }
});

module.exports = mongoose.model('Book', bookSchema);
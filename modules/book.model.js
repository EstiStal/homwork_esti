const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'שם הספר הוא שדה חובה'],
        unique: true,
        trim: true,
        minlength: [2, 'שם הספר חייב להכיל לפחות 2 תווים'],
        maxlength: [20, 'שם הספר יכול להכיל עד 20 תווים']
    },
    price: {
        type: Number,
        required: [true, 'מחיר הספר הוא שדה חובה'],
        min: [0, 'המחיר לא יכול להיות שלילי']
    },
    stock: {
        type: Number,
        default: 1,
        min: [0, 'המלאי לא יכול להיות שלילי']
    },
    isLent: {
        type: Boolean,
        default: false // כברירת מחדל הספר פנוי להשאלה
    },
    categories: {
        type: [String],
        enum: {
            values: ['מתח', 'היסטוריה', 'ביוגרפיה', 'ילדים', 'מדע', 'יהדות'],
            message: 'הקטגוריה {VALUE} אינה חוקית'
        }
    },
    author: {
        name: { type: String, required: true, trim: true },
        phone: { type: String, trim: true },
        email: { type: String, lowercase: true, trim: true }
    }
});

module.exports = mongoose.model('Book', bookSchema);
const { lends } = require('../db')
const { users } = require('../user')
const Book=require('../modules/book.model')

// GET /books - קבלת ספרים (עם אפשרות לסינון לפי קטגוריה)
exports.getAllBooks =async (req, res, next) => {
    try {
        const category = req.query.category || null
        if (category !== null) {
            const filteredBooks = await Book.find({ category: category })
            return res.json(filteredBooks)
        }
        const books = await Book.find()
        res.json(books)
    } catch (error) {
        next(error)
    }
}

// GET /books/:id - קבלת ספר לפי מזהה
exports.getBookById = async (req, res, next) => {
    try {
        const bookid = +req.params.id
        const book = await Book.findById(bookid)
        if (book) {
            res.json(book)
        } else {
            res.status(404)
            throw new Error('book not found')
        }
    } catch (error) {
        next(error)
    }
}

// POST /books - הוספת ספר
exports.addBook = async (req, res, next) => {
    try {
        const book = new Book(req.body)
        await book.save()
        res.status(201).json(book)
    } catch (error) {
        next(error)
    }
}

// PUT /books/:id - עדכון ספר
exports.updateBook = async (req, res, next) => {
    try {
        const bookid = +req.params.id
        const book = await Book.findByIdAndUpdate(bookid, req.body, { new: true })
        if (book) {
            res.json(book)
        } else {
            res.status(404)
            throw new Error('book not found')
        }
    } catch (error) {
        next(error)
    }
}

// POST /lends - השאלת ספר
exports.lendBook = async (req, res, next) => {
    try {
        const bookId = +req.body.bookId
        const userId = +req.body.userId
        const book = await Book.findById(bookId)
        if (book) {
            if (book.isFinite) {
                res.status(400)
                throw new Error("הספר מושאל")
            } else {
                users.forEach(user => {
                    if (user.id === userId) {
                        user.booksLent.push(bookId)
                    }
                })
                const lend = { id: 5, bookId: book.id, userId: userId, lendDate: "25/07/2033" }
                lends.push(lend)
                res.json(lends)
            }
        } else {
            res.status(404)
            throw new Error('book not found')
        }
    } catch (error) {
        next(error)
    }
}

// PUT /books/:id/lend - עדכון סטטוס השאלה
exports.updateLendStatus = async (req, res, next) => {
    try {
        const bookid = +req.params.id
        const book = await Book.findById(bookid)
        if (book) {
            book.isFinite = false
            await book.save()
            res.json(book)
        } else {
            res.status(404)
            throw new Error('book not found')
        }
    } catch (error) {
        next(error)
    }
}

// DELETE /books/:id - מחיקת ספר
exports.deleteBook = async (req, res, next) => {
    try {
        const bookid = +req.params.id
        const book = await Book.findByIdAndDelete(bookid)
        if (book) {
            res.json(book)
        } else {
            res.status(404)
            throw new Error('book not found')
        }
    } catch (error) {
        next(error)
    }
}
const { books, lends } = require('../db')
const { users } = require('../user')

// GET /books - קבלת ספרים (עם אפשרות לסינון לפי קטגוריה)
exports.getAllBooks = (req, res, next) => {
    try {
        const category = req.query.category || null
        if (category !== null) {
            const filteredBooks = books.filter(b => b.category.toLowerCase() === category.toLowerCase())
            return res.json(filteredBooks)
        }
        res.json(books)
    } catch (error) {
        next(error)
    }
}

// GET /books/:id - קבלת ספר לפי מזהה
exports.getBookById = (req, res, next) => {
    try {
        const bookid = +req.params.id
        const book = books.find(b => b.id === bookid)
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
exports.addBook = (req, res, next) => {
    try {
        const book = { id: 6, bookId: 4, userId: 104, lendDate: "2023-04-05" }
        books.push(book)
        res.status(201).json(book)
    } catch (error) {
        next(error)
    }
}

// PUT /books/:id - עדכון ספר
exports.updateBook = (req, res, next) => {
    try {
        const bookid = +req.params.id
        const book = books.find(b => b.id === bookid)
        if (book) {
            const { name, category, price } = req.body
            if (name) book.name = name
            if (category) book.category = category
            if (price) book.price = price
            res.json(books)
        } else {
            res.status(404)
            throw new Error('book not found')
        }
    } catch (error) {
        next(error)
    }
}

// POST /lends - השאלת ספר
exports.lendBook = (req, res, next) => {
    try {
        const bookId = +req.body.bookId
        const userId = +req.body.userId
        const book = books.find(b => b.id === bookId)
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
exports.updateLendStatus = (req, res, next) => {
    try {
        const bookid = +req.params.id
        const book = books.find(b => b.id === bookid)
        if (book) {
            book.isFinite = false
            res.json(books)
        } else {
            res.status(404)
            throw new Error('book not found')
        }
    } catch (error) {
        next(error)
    }
}

// DELETE /books/:id - מחיקת ספר
exports.deleteBook = (req, res, next) => {
    try {
        const bookid = +req.params.id
        const bookIndex = books.findIndex(b => b.id === bookid)
        if (bookIndex !== -1) {
            books.splice(bookIndex, 1)
            res.json(books)
        } else {
            res.status(404)
            throw new Error('book not found')
        }
    } catch (error) {
        next(error)
    }
}
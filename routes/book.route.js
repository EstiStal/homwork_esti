const express = require('express')
const router = express.Router()
const bookController = require('../controllers/book.controlles')

router.get('/', bookController.getAllBooks)
router.get('/:id', bookController.getBookById)
router.post('/', bookController.addBook)
router.put('/:id', bookController.updateBook)
router.post('/lends', bookController.lendBook)
router.put('/:id/lend', bookController.updateLendStatus)
router.delete('/:id', bookController.deleteBook)

module.exports = router
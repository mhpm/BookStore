const { Router } = require('express')
const router = Router()
const fs = require('fs-extra')
const path = require('path')

const Book = require('../models/Book')

router.get('/', async (req, res) => {
  const books = await Book.find()
  res.json(books)
})

router.post('/', async (req, res) => {
  const { title, author, isbn } = req.body
  const imagePath = 'uploads/' + req.file.filename
  let book = new Book({ title, author, isbn, imagePath })
  await book.save()
  res.json({ message: 'Book saved' })
})

router.delete('/:id', async (req, res) => {
  let book = await Book.findByIdAndDelete(req.params.id)
  if (book.imagePath)
    fs.unlink(path.resolve('./backend/public/' + book.imagePath))
  res.json({ message: 'Book deleted' })
})

module.exports = router

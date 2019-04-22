if (process.env.NODE_ENV !== 'production') require('dotenv').config() // for read .env files and enviroment vars

const express = require('express')
const chalk = require('chalk')
const morgan = require('morgan') // for whatch all server request
const multer = require('multer') // image processor
const path = require('path') // for easy get path sistem
const cors = require('cors')

// Initializations
const app = express()
require('./database/index')

// Settings
app.set('port', process.env.PORT || 3000)

// Middlewares
app.use(morgan('dev'))
const storage = multer.diskStorage({
  destination: path.join(__dirname, 'public/uploads'),
  filename(req, file, cb) {
    cb(null, new Date().getTime() + path.extname(file.originalname))
  }
})
app.use(multer({ storage }).single('image'))
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(cors())

// Routes
app.use('/api/books', require('./routes/books'))

// Static files
app.use(express.static(path.join(__dirname, 'public')))

// Start server
app.listen(app.get('port'), () => {
  console.log('Server started on port:', app.get('port'))
  console.log('Mode: ' + process.env.NODE_ENV)

  console.log('url: ' + chalk.cyan('http://localhost:' + app.get('port')))
})

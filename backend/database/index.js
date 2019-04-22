const mongoose = require('mongoose')

mongoose
  .connect(
    'mongodb+srv://mhpm:mhpm1055@cluster0-rlsow.mongodb.net/test?retryWrites=true',
    {
      useNewUrlParser: true
    }
  )
  .then(db => console.log('Database is connected'))
  .catch(err => console.log(err))

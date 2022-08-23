require('dotenv').config()
const mongoose = require('mongoose')
const express = require('express')
const cpdRoutes = require('./routes/cpdEvents')
const userRoutes = require('./routes/user')

// express app
const app = express()

// middleware
app.use(express.json())

app.use((req, res, next) => {
  console.log(req.path, req.method)
  next()
})

// routes
app.use('/api/cpdEvents', cpdRoutes)
app.use('/api/user', userRoutes)

//connect to db
mongoose.connect(process.env.MONGO_URI, { 
  useNewUrlParser: true, useUnifiedTopology: true 
  })
    .then(() => {
        console.log('Connected to db...')
        // listen for requests
        app.listen(process.env.PORT, () => {
          console.log('listening on port', process.env.PORT)
        })
    })
    .catch((error) => {
        console.log(error)
    })

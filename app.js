const express = require('express')
const exphbs = require('express-handlebars')
const mongoose = require('mongoose')

const app = express()

mongoose.connect('mongodb://localhost:27017/todo-list')
  .then(() => {
    console.log('CONNECTION OPEN!!!')
  })
  .catch(error => {
    console.log('OH NO ERROR!!!')
    console.log(error)
  })



app.get('/', (req, res) => {
  res.send('I am exhausted...')
})

app.listen(3000, () => {
  console.log('The server is running on htpp://localhost:3000')
})
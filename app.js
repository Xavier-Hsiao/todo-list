const express = require('express')
const app = express()
const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/todo-list')
  .then(() => {
    console.log('CONNECTION OPEN!!!')
  })
  .catch(error => {
    console.log('OH NO ERROR!!!')
    console.log(error)
  })

const exphbs = require('express-handlebars')

app.engine('hbs', exphbs({defaultLayout: 'main', extname: 'hbs'}))
app.set('view engine', 'hbs')


app.get('/', (req, res) => {
  res.render('index')
})

app.listen(3000, () => {
  console.log('The server is running on htpp://localhost:3000')
})
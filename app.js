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

const Todo = require('./models/todo')

const exphbs = require('express-handlebars')

app.engine('hbs', exphbs({defaultLayout: 'main', extname: 'hbs'}))
app.set('view engine', 'hbs')


app.get('/', (req, res) => {
  Todo.find() //取出所有todo資料
    .lean() //將 Mongoose物件轉換成 JavaScrript陣列，這樣就不會再有save()之類的 Mongoose方法
    .then(todos => res.render('index', {todos}))
    .catch(err => console.error(err))
})

app.listen(3000, () => {
  console.log('The server is running on htpp://localhost:3000')
})
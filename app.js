const express = require('express')
const app = express()
const bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({ extended: true }))

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

app.get('/todos/new', (req, res) => {
  res.render('new')
})

app.post('/todos', (req, res) => {
  const name = req.body.name //將使用者透過表單輸入的資料存進變數 name
  Todo.create({name}) //將資料傳給 model，透過 Mongoose提供的方法新增 instance並請求存入資料庫；資料庫回傳結果後，model檢查是否成成功，再回報給controller。 
    .then(() => res.redirect('/'))
    .catch(err => console.error(err))
})

app.get('/todos/:id', (req, res) => {
  const id = req.params.id
  Todo.findById(id)
    .lean()
    .then(todo => res.render('detail', {todo}))
    .catch(err => console.error(err))
})

app.get('/todos/:id/edit', (req, res) => {
  const id = req.params.id
  Todo.findById(id)
    .lean()
    .then(todo => res.render('edit', {todo}))
    .catch(err => console.error(err))
})

app.post('/todos/:id/edit', (req, res) => {
  const id = req.params.id
  const name = req.body.name
  Todo.findById(id)
    .then(todo => {
      todo.name = name
      todo.save()
    })
    .then(() => res.redirect(`/todos/${id}`))
    .catch(err => console.error(err))
})

app.post('/todos/:id/delete', (req, res) => {
  const id = req.params.id
  Todo.findById(id)
    .then(todo => todo.remove())
    .then(() => res.redirect('/'))
    .catch(err => console.error(err))
})

app.listen(3000, () => {
  console.log('The server is running on htpp://localhost:3000')
})
const express = require('express')
const router = express.Router()
const Todo = require('../../models/todo')

router.get('/new', (req, res) => {
  res.render('new')
})

router.post('/', (req, res) => {
  const name = req.body.name //將使用者透過表單輸入的資料存進變數 name
  Todo.create({name}) //將資料傳給 model，透過 Mongoose提供的方法新增 instance並請求存入資料庫；資料庫回傳結果後，model檢查是否成成功，再回報給controller。 
    .then(() => res.redirect('/'))
    .catch(err => console.error(err))
})

router.get('/:id', (req, res) => {
  const id = req.params.id
  Todo.findById(id)
    .lean()
    .then(todo => res.render('detail', {todo}))
    .catch(err => console.error(err))
})

router.get('/:id/edit', (req, res) => {
  const id = req.params.id
  Todo.findById(id)
    .lean()
    .then(todo => res.render('edit', {todo}))
    .catch(err => console.error(err))
})

router.put('/:id', (req, res) => {
  const id = req.params.id
  const {name, isDone} = req.body
  Todo.findById(id)
    .then(todo => {
      todo.name = name
      todo.isDone = isDone === 'on'
      // if(isDone === 'on') {
      //   todo.isDone = true
      // } else {
      //   todo.isDone = false
      // }
      todo.save()
    })
    .then(() => res.redirect(`/todos/${id}`))
    .catch(err => console.error(err))
})

router.delete('/:id', (req, res) => {
  const id = req.params.id
  Todo.findById(id)
    .then(todo => todo.remove())
    .then(() => res.redirect('/'))
    .catch(err => console.error(err))
})

module.exports = router
const express = require('express')
const router = express.Router()
const Todo = require('../../models/todo')

router.get('/', (req, res) => {
  Todo.find() //取出所有todo資料
    .lean() //將 Mongoose物件轉換成 JavaScrript陣列，這樣就不會再有save()之類的 Mongoose方法
    .sort({_id: 'asc'})
    .then(todos => res.render('index', {todos}))
    .catch(err => console.error(err))
})

module.exports = router
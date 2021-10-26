const mongoose = require('mongoose')
const Todo = require('../todo')

mongoose.connect('mongodb://localhost:27017/todo-list')
  .then(() => {
    console.log('CONNECTION OPEN!!!')

    for(let i = 0; i < 10; i++) {
      Todo.create({name: `todo-${i}`})
    }
  })
  .catch(error => {
    console.log('OH NO ERROR!!!')
    console.log(error)
  })
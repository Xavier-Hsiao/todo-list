const express = require('express')
const router = express.Router()
const home = require('./modules/home')
const todos = require('./modules/todos')

router.use('/', home) //網址結構符合 / 的request就導向 home 模組
router.use('/todos', todos)

module.exports = router
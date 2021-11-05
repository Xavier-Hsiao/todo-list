const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const exphbs = require('express-handlebars')
const methodOverride = require('method-override')

const routes = require('./routes/index')
require('./config/mongoose')

app.engine('hbs', exphbs({defaultLayout: 'main', extname: 'hbs'}))
app.set('view engine', 'hbs')

app.use(bodyParser.urlencoded({ extended: true }))
app.use(methodOverride('_method'))

app.use(routes)


app.get('/', (req, res) => {
  Todo.find() //取出所有todo資料
    .lean() //將 Mongoose物件轉換成 JavaScrript陣列，這樣就不會再有save()之類的 Mongoose方法
    .sort({_id: 'asc'})
    .then(todos => res.render('index', {todos}))
    .catch(err => console.error(err))
})


app.listen(3000, () => {
  console.log('The server is running on htpp://localhost:3000')
})
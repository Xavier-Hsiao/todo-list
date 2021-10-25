const express = require('express')
const exphbs = require('express-handlebars')
const app = express()

app.get('/', (req, res) => {
  res.send('I am exhausted...')
})

app.listen(3000, () => {
  console.log('The server is running on htpp://localhost:3000')
})
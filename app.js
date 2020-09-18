const express = require('express')
const app = express()

const routes = require('./routes/index')

app.use(express.json({ limit: '50mb' }))
app.use(express.urlencoded({ extended: false }))

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', '*')
  res.header('Access-Control-Allow-Methods', '*')
  res.header('Allow', '*')
  next()
})

app.use('/api', routes)

module.exports = app

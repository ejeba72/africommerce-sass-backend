const createError = require('http-errors')
const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const logger = require('morgan')
const passport = require('passport')

const indexRouter = require('../routes/index')
const bodyParser = require('body-parser')
const { connectToDatabase } = require('./db')

connectToDatabase()
const app = express()

// view engine setup
app.set('views', path.join(__dirname, '../views'))
app.set('view engine', 'jade')

app.use(logger('dev'))
// app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(cookieParser())
app.use(express.static(path.join(__dirname, '../public')))

app.use(passport.initialize())

app.use('/', indexRouter)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404))
})

// error handler
app.use(function (err, req, res) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render('error', { title: 'Error Details' })
})

module.exports = app

var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var proxy = require('http-proxy-middleware')

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var proxyTable = {
    '/api/**':{
        target:'http://127.0.0.1:8000/',
        changeOrigin:true
    }
}

var app = express();
Object.keys(proxyTable).forEach(function(key){
    app.use(proxy(key,proxyTable[key]));
})
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

module.exports = app;

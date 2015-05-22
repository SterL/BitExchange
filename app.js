var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var request = require('request');

var routes = require('./routes/index');
//var users = require('./routes/users');

var app = express();


var urlBTCE_BTC = "https://btc-e.com/api/3/ticker/btc_usd"
request({
    url: urlBTCE_BTC,
    json: true
}, function (error, response, body) {
    if (!error && response.statusCode === 200) {
       app.locals.btce_btc = body;
    }
  })


var urlBTCE_LTC = "https://btc-e.com/api/3/ticker/ltc_usd"
request({
    url: urlBTCE_LTC,
    json: true
}, function (error, response, body) {

    if (!error && response.statusCode === 200) {
       app.locals.btce_ltc = body;
    }
})


var urlBTCE_PPC = "https://btc-e.com/api/3/ticker/ppc_usd"
request({
    url: urlBTCE_PPC,
    json: true
}, function (error, response, body) {

    if (!error && response.statusCode === 200) {
       app.locals.btce_ppc = body;
    }
})


var urlCryptsy_BTC = "https://www.cryptsy.com/api/v2/markets/2/ticker"
request({
    url: urlCryptsy_BTC,
    json: true
}, function (error, response, body) {

    if (!error && response.statusCode === 200) {
       app.locals.cryptsy_btc = body;
    }
})


var urlCryptsy_LTC = "https://www.cryptsy.com/api/v2/markets/1/ticker"
request({
    url: urlCryptsy_LTC,
    json: true
}, function (error, response, body) {

    if (!error && response.statusCode === 200) {
       app.locals.cryptsy_ltc = body;
    }
})


var urlCryptsy_PPC = "https://www.cryptsy.com/api/v2/markets/305/ticker"
request({
    url: urlCryptsy_PPC,
    json: true
}, function (error, response, body) {

    if (!error && response.statusCode === 200) {
       app.locals.cryptsy_ppc = body;
    }
})


var urlCryptsy_DASH = "https://www.cryptsy.com/api/v2/markets/213/ticker"
request({
    url: urlCryptsy_DASH,
    json: true
}, function (error, response, body) {

    if (!error && response.statusCode === 200) {
       app.locals.cryptsy_dash = body;
    }
})


var urlCryptonator_BTC = "https://www.cryptonator.com/api/ticker/btc-usd"
request({
    url: urlCryptonator_BTC,
    json: true
}, function (error, response, body) {

    if (!error && response.statusCode === 200) {
       app.locals.cryptonator_btc = body;
    }
})


var urlCryptonator_LTC= "https://www.cryptonator.com/api/ticker/ltc-usd"
request({
    url: urlCryptonator_LTC,
    json: true
}, function (error, response, body) {

    if (!error && response.statusCode === 200) {
       app.locals.cryptonator_ltc = body;
    }
})



var urlCryptonator_PPC = "https://www.cryptonator.com/api/ticker/ppc-usd"
request({
    url: urlCryptonator_PPC,
    json: true
}, function (error, response, body) {

    if (!error && response.statusCode === 200) {
       app.locals.cryptonator_ppc = body;
    }
})


var urlCryptonator_DASH = "https://www.cryptonator.com/api/ticker/dash-usd"
request({
    url: urlCryptonator_DASH,
    json: true
}, function (error, response, body) {

    if (!error && response.statusCode === 200) {
       app.locals.cryptonator_dash = body;
    }
})



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hjs');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(require('less-middleware')(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
//app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;

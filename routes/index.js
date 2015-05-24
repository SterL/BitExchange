var express = require('express');
var request = require('request');
var router = express.Router();


/**
 *  The code for calling BTC-E's API to grab the ticker price of
 *  bitcoins, litecoins, peercoins. It apears as though the BTC-E
 *  API does not support dash coins.
**/
var urlBTCE_USD = "https://btc-e.com/api/3/ticker/btc_usd-ltc_usd-ppc_usd";
var BTCE_USD = {
	btc: "",
	ltc: "",
	ppc: "",
	dash: ""
};
request({
    url: urlBTCE_USD,
    json: true
}, function (error, response, body) {
    if (!error && response.statusCode === 200) {
       BTCE_USD.btc = body.btc_usd.sell;
       BTCE_USD.ltc = body.ltc_usd.sell;
       BTCE_USD.ppc = body.ppc_usd.sell;
    }
  })


/**
 *  The code for calling Cryptsy's API to grab the ticker price of
 *  bitcoins, litecoins, peercoins, and dashcoins. 
**/
var urlCryptsy_USD = "https://www.cryptsy.com/api/v2/markets/ticker";
var cryptsy_USD = {
	btc: "",
	ltc: "",
	ppc: "",
	dash: ""
};
request({
    url: urlCryptsy_USD,
    json: true
}, function (error, response, body) {
    if (!error && response.statusCode === 200) {

    	for (var i = 0; i < body.data.length; i++) {
    		if (body.data[i].id == 2) {
    			cryptsy_USD.btc = body.data[i].bid;
    		}
    		if (body.data[i].id == 1) {
    			cryptsy_USD.ltc = body.data[i].bid;
    		}
    		if (body.data[i].id == 305) {
    			cryptsy_USD.ppc = body.data[i].bid;
    		}
    		if (body.data[i].id == 213) {
    			cryptsy_USD.dash = body.data[i].bid;
    		}
    	}
    }
  })



/**
 *  The code for calling Cryptonator's API to grab the ticker price of
 *  bitcoins, litecoins, peercoins, and dashcoins. This API does not
 *  support chaining so multiple requests were made.
**/

var urlCryptonator_BTC = "https://www.cryptonator.com/api/ticker/btc-usd";
var cryptonator_USD = {
	btc: "",
	ltc: "",
	ppc: "",
	dash: ""
};
request({
    url: urlCryptonator_BTC,
    json: true
}, function (error, response, body) {

    if (!error && response.statusCode === 200) {
       cryptonator_USD.btc = body.ticker.price;
    }
})

var urlCryptonator_LTC= "https://www.cryptonator.com/api/ticker/ltc-usd";
request({
    url: urlCryptonator_LTC,
    json: true
}, function (error, response, body) {

    if (!error && response.statusCode === 200) {
       cryptonator_USD.ltc = body.ticker.price;
    }
})

var urlCryptonator_PPC = "https://www.cryptonator.com/api/ticker/ppc-usd";
request({
    url: urlCryptonator_PPC,
    json: true
}, function (error, response, body) {

    if (!error && response.statusCode === 200) {
       cryptonator_USD.ppc = body.ticker.price;
    }
})

var urlCryptonator_DASH = "https://www.cryptonator.com/api/ticker/dash-usd";
request({
    url: urlCryptonator_DASH,
    json: true
}, function (error, response, body) {

    if (!error && response.statusCode === 200) {
       cryptonator_USD.dash = body.ticker.price;
    }
})


/**
 *  This object holds the BTCE_USD, cryptsy_USD, and cryptonator_USD objects
 *  so that we only have to pass this single object to our view.
**/
var exchanges = {
  BTCEExchange: BTCE_USD,
  cryptsyExchange: cryptsy_USD,
  cryptonatorExchange: cryptonator_USD
};


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Bit Exchange', ex: exchanges });
});



module.exports = router;

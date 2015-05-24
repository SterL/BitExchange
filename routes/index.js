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
	dash: "",
	ltcPerbtc: "",
	ppcPerbtc: "",
	dashPerbtc: "",
	btcColor: "",
	ltcColor: "",
	ppcColor: "",
	dashColor: ""
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
	dash: "",
	ltcPerbtc: "",
	ppcPerbtc: "",
	dashPerbtc: "",
	btcColor: "",
	ltcColor: "",
	ppcColor: "",
	dashColor: ""
};
request({
    url: urlCryptsy_USD,
    json: true
}, function (error, response, body) {
    if (!error && response.statusCode === 200) {

    	for (var i = 0; i < body.data.length; i++) {
    		if (body.data[i].id == 2) {
    			cryptsy_USD.btc = body.data[i].ask;
    		}
    		if (body.data[i].id == 1) {
    			cryptsy_USD.ltc = body.data[i].ask;
    		}
    		if (body.data[i].id == 305) {
    			cryptsy_USD.ppc = body.data[i].ask;
    		}
    		if (body.data[i].id == 213) {
    			cryptsy_USD.dash = body.data[i].ask;
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
	dash: "",
	ltcPerbtc: "",
	ppcPerbtc: "",
	dashPerbtc: "",
	btcColor: "",
	ltcColor: "",
	ppcColor: "",
	dashColor: ""
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
 *
 *  foo is a function for the logic that appends the proper color for each cell.
**/
var exchanges = {
  BTCEExchange: BTCE_USD,
  cryptsyExchange: cryptsy_USD,
  cryptonatorExchange: cryptonator_USD,
  setColors: function() {
  	if (exchanges.BTCEExchange.btc < exchanges.cryptsyExchange.btc && exchanges.BTCEExchange.btc < exchanges.cryptonatorExchange.btc) {
		exchanges.BTCEExchange.btcColor = "#00FF00";
		exchanges.cryptsyExchange.btcColor = "#FF0000";
		exchanges.cryptonatorExchange.btcColor = "#FF0000";
	}
	else if (exchanges.cryptsyExchange.btc < exchanges.BTCEExchange.btc && exchanges.cryptsyExchange.btc < exchanges.cryptonatorExchange.btc) {
		exchanges.cryptsyExchange.btcColor = "#00FF00";
		exchanges.BTCEExchange.btcColor = "#FF0000";
		exchanges.cryptonatorExchange.btcColor = "#FF0000";
	}
	else if (exchanges.cryptonatorExchange.btc < exchanges.BTCEExchange.btc && exchanges.cryptonatorExchange.btc < exchanges.cryptsyExchange.btc) {
		exchanges.cryptonatorExchange.btcColor = "#00FF00";
		exchanges.cryptsyExchange.btcColor = "#FF0000";
		exchanges.BTCEExchange.btcColor = "#FF0000";
	}

	if (exchanges.BTCEExchange.ltc < exchanges.cryptsyExchange.ltc && exchanges.BTCEExchange.ltc < exchanges.cryptonatorExchange.ltc) {
		exchanges.BTCEExchange.ltcColor = "#00FF00";
		exchanges.cryptsyExchange.ltcColor = "#FF0000";
		exchanges.cryptonatorExchange.ltcColor = "#FF0000";
	}
	else if (exchanges.cryptsyExchange.ltc < exchanges.BTCEExchange.ltc && exchanges.cryptsyExchange.ltc < exchanges.cryptonatorExchange.ltc) {
		exchanges.cryptsyExchange.ltcColor = "#00FF00";
		exchanges.BTCEExchange.ltcColor = "#FF0000";
		exchanges.cryptonatorExchange.ltcColor = "#FF0000";
	}
	else if (exchanges.cryptonatorExchange.ltc < exchanges.BTCEExchange.ltc && exchanges.cryptonatorExchange.ltc < exchanges.cryptsyExchange.ltc) {
		exchanges.cryptonatorExchange.ltcColor = "#00FF00";
		exchanges.cryptsyExchange.ltcColor = "#FF0000";
		exchanges.BTCEExchange.ltcColor = "#FF0000";
	}

	if (exchanges.BTCEExchange.ppc < exchanges.cryptsyExchange.ppc && exchanges.BTCEExchange.ppc < exchanges.cryptonatorExchange.ppc) {
		exchanges.BTCEExchange.ppcColor = "#00FF00";
		exchanges.cryptsyExchange.ppcColor = "#FF0000";
		exchanges.cryptonatorExchange.ppcColor = "#FF0000";
	}
	else if (exchanges.cryptsyExchange.ppc < exchanges.BTCEExchange.ppc && exchanges.cryptsyExchange.ppc < exchanges.cryptonatorExchange.ppc) {
		exchanges.cryptsyExchange.ppcColor = "#00FF00";
		exchanges.BTCEExchange.ppcColor = "#FF0000";
		exchanges.cryptonatorExchange.ppcColor = "#FF0000";
	}
	else if (exchanges.cryptonatorExchange.ppc < exchanges.BTCEExchange.ppc && exchanges.cryptonatorExchange.ppc < exchanges.cryptsyExchange.ppc) {
		exchanges.cryptonatorExchange.ppcColor = "#00FF00";
		exchanges.cryptsyExchange.ppcColor = "#FF0000";
		exchanges.BTCEExchange.ppcColor = "#FF0000";
	}

	if (exchanges.cryptsyExchange.dash < exchanges.cryptonatorExchange.dash) {
		exchanges.cryptsyExchange.dashColor = "#00FF00";
		exchanges.BTCEExchange.dashColor = "#FF0000";
		exchanges.cryptonatorExchange.dashColor = "#FF0000";
	}
	else if (exchanges.cryptonatorExchange.dash < exchanges.cryptsyExchange.dash) {
		exchanges.cryptonatorExchange.dashColor = "#00FF00";
		exchanges.cryptsyExchange.dashColor = "#FF0000";
		exchanges.BTCEExchange.dashColor = "#FF0000";
	}
  }
};


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Bit Exchange', ex: exchanges });
});


module.exports = router;

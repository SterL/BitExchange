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
	btcPerbtc: "",
	ltcPerbtc: "",
	ppcPerbtc: "",
	dashPerbtc: "",
	btcUSDColor: "",
	ltcUSDColor: "",
	ppcUSDColor: "",
	dashUSDColor: "",
	btcConversionColor: "",
	ltcConversionColor: "",
	ppcConversionColor: "",
	dashConversionColor: ""
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
	btcPerbtc: "",
	ltcPerbtc: "",
	ppcPerbtc: "",
	dashPerbtc: "",
	btcUSDColor: "",
	ltcUSDColor: "",
	ppcUSDColor: "",
	dashUSDColor: "",
	btcConversionColor: "",
	ltcConversionColor: "",
	ppcConversionColor: "",
	dashConversionColor: ""
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
	btcPerbtc: "",
	ltcPerbtc: "",
	ppcPerbtc: "",
	dashPerbtc: "",
	btcUSDColor: "",
	ltcUSDColor: "",
	ppcUSDColor: "",
	dashUSDColor: "",
	btcConversionColor: "",
	ltcConversionColor: "",
	ppcConversionColor: "",
	dashConversionColor: ""
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
 *  setColors is a function for the logic that appends the proper color for each cell.
**/
var exchanges = {
  BTCEExchange: BTCE_USD,
  cryptsyExchange: cryptsy_USD,
  cryptonatorExchange: cryptonator_USD,
  setColors: function() {
  	if (exchanges.BTCEExchange.btc < exchanges.cryptsyExchange.btc && exchanges.BTCEExchange.btc < exchanges.cryptonatorExchange.btc) {
		exchanges.BTCEExchange.btcUSDColor = "#00FF00";
		exchanges.cryptsyExchange.btcUSDColor = "#FF0000";
		exchanges.cryptonatorExchange.btcUSDColor = "#FF0000";
	}
	else if (exchanges.cryptsyExchange.btc < exchanges.BTCEExchange.btc && exchanges.cryptsyExchange.btc < exchanges.cryptonatorExchange.btc) {
		exchanges.cryptsyExchange.btcUSDColor = "#00FF00";
		exchanges.BTCEExchange.btcUSDColor = "#FF0000";
		exchanges.cryptonatorExchange.btcUSDColor = "#FF0000";
	}
	else if (exchanges.cryptonatorExchange.btc < exchanges.BTCEExchange.btc && exchanges.cryptonatorExchange.btc < exchanges.cryptsyExchange.btc) {
		exchanges.cryptonatorExchange.btcUSDColor = "#00FF00";
		exchanges.cryptsyExchange.btcUSDColor = "#FF0000";
		exchanges.BTCEExchange.btcUSDColor = "#FF0000";
	}
	else {
		exchanges.cryptonatorExchange.btcUSDColor = "#00FF00";
		exchanges.cryptsyExchange.btcUSDColor = "#00FF00";
		exchanges.BTCEExchange.btcUSDColor = "#00FF00";
	}

	if (exchanges.BTCEExchange.ltc < exchanges.cryptsyExchange.ltc && exchanges.BTCEExchange.ltc < exchanges.cryptonatorExchange.ltc) {
		exchanges.BTCEExchange.ltcUSDColor = "#00FF00";
		exchanges.cryptsyExchange.ltcUSDColor = "#FF0000";
		exchanges.cryptonatorExchange.ltcUSDColor = "#FF0000";
	}
	else if (exchanges.cryptsyExchange.ltc < exchanges.BTCEExchange.ltc && exchanges.cryptsyExchange.ltc < exchanges.cryptonatorExchange.ltc) {
		exchanges.cryptsyExchange.ltcUSDColor = "#00FF00";
		exchanges.BTCEExchange.ltcUSDColor = "#FF0000";
		exchanges.cryptonatorExchange.ltcUSDColor = "#FF0000";
	}
	else if (exchanges.cryptonatorExchange.ltc < exchanges.BTCEExchange.ltc && exchanges.cryptonatorExchange.ltc < exchanges.cryptsyExchange.ltc) {
		exchanges.cryptonatorExchange.ltcUSDColor = "#00FF00";
		exchanges.cryptsyExchange.ltcUSDColor = "#FF0000";
		exchanges.BTCEExchange.ltcUSDColor = "#FF0000";
	}
	else {
		exchanges.cryptonatorExchange.btcUSDColor = "#00FF00";
		exchanges.cryptsyExchange.btcUSDColor = "#00FF00";
		exchanges.BTCEExchange.btcUSDColor = "#00FF00";
	}

	if (exchanges.BTCEExchange.ppc < exchanges.cryptsyExchange.ppc && exchanges.BTCEExchange.ppc < exchanges.cryptonatorExchange.ppc) {
		exchanges.BTCEExchange.ppcUSDColor = "#00FF00";
		exchanges.cryptsyExchange.ppcUSDColor = "#FF0000";
		exchanges.cryptonatorExchange.ppcUSDColor = "#FF0000";
	}
	else if (exchanges.cryptsyExchange.ppc < exchanges.BTCEExchange.ppc && exchanges.cryptsyExchange.ppc < exchanges.cryptonatorExchange.ppc) {
		exchanges.cryptsyExchange.ppcUSDColor = "#00FF00";
		exchanges.BTCEExchange.ppcUSDColor = "#FF0000";
		exchanges.cryptonatorExchange.ppcUSDColor = "#FF0000";
	}
	else if (exchanges.cryptonatorExchange.ppc < exchanges.BTCEExchange.ppc && exchanges.cryptonatorExchange.ppc < exchanges.cryptsyExchange.ppc) {
		exchanges.cryptonatorExchange.ppcUSDColor = "#00FF00";
		exchanges.cryptsyExchange.ppcUSDColor = "#FF0000";
		exchanges.BTCEExchange.ppcUSDColor = "#FF0000";
	}
	else {
		exchanges.cryptonatorExchange.btcUSDColor = "#00FF00";
		exchanges.cryptsyExchange.btcUSDColor = "#00FF00";
		exchanges.BTCEExchange.btcUSDColor = "#00FF00";
	}

	if (exchanges.cryptsyExchange.dash < exchanges.cryptonatorExchange.dash) {
		exchanges.cryptsyExchange.dashUSDColor = "#00FF00";
		exchanges.BTCEExchange.dashUSDColor = "#FF0000";
		exchanges.cryptonatorExchange.dashUSDColor = "#FF0000";
	}
	else if (exchanges.cryptonatorExchange.dash < exchanges.cryptsyExchange.dash) {
		exchanges.cryptonatorExchange.dashUSDColor = "#00FF00";
		exchanges.cryptsyExchange.dashUSDColor = "#FF0000";
		exchanges.BTCEExchange.dashUSDColor = "#FF0000";
	}
	else {
		exchanges.cryptonatorExchange.btcUSDColor = "#00FF00";
		exchanges.cryptsyExchange.btcUSDColor = "#00FF00";
		exchanges.BTCEExchange.btcUSDColor = "#00FF00";
	}
  },

  calculateConversion: function() {
  	exchanges.BTCEExchange.btcPerbtc = 1;
  	exchanges.cryptsyExchange.btcPerbtc = 1;
  	exchanges.cryptonatorExchange.btcPerbtc = 1;

  	exchanges.BTCEExchange.ltcPerbtc = exchanges.BTCEExchange.btc / exchanges.BTCEExchange.ltc;
  	exchanges.cryptsyExchange.ltcPerbtc = exchanges.cryptsyExchange.btc / exchanges.cryptsyExchange.ltc;
  	exchanges.cryptonatorExchange.ltcPerbtc = exchanges.cryptonatorExchange.btc / exchanges.cryptonatorExchange.ltc;

  	exchanges.BTCEExchange.ppcPerbtc = exchanges.BTCEExchange.btc / exchanges.BTCEExchange.ppc;
  	exchanges.cryptsyExchange.ppcPerbtc = exchanges.cryptsyExchange.btc / exchanges.cryptsyExchange.ppc;
  	exchanges.cryptonatorExchange.ppcPerbtc = exchanges.cryptonatorExchange.btc / exchanges.cryptonatorExchange.ppc;

  	exchanges.BTCEExchange.dashPerbtc = exchanges.BTCEExchange.btc / exchanges.BTCEExchange.dash;
  	exchanges.cryptsyExchange.dashPerbtc = exchanges.cryptsyExchange.btc / exchanges.cryptsyExchange.dash;
  	exchanges.cryptonatorExchange.dashPerbtc = exchanges.cryptonatorExchange.btc / exchanges.cryptonatorExchange.dash;

	if (exchanges.BTCEExchange.btcPerbtc > exchanges.cryptsyExchange.btcPerbtc && exchanges.BTCEExchange.btcPerbtc > exchanges.cryptonatorExchange.btcPerbtc) {
		exchanges.BTCEExchange.btcConversionColor = "#00FF00";
		exchanges.cryptsyExchange.btcConversionColor = "#FF0000";
		exchanges.cryptonatorExchange.btcConversionColor = "#FF0000";
	}
	else if (exchanges.cryptsyExchange.btcPerbtc > exchanges.BTCEExchange.btcPerbtc && exchanges.cryptsyExchange.btcPerbtc > exchanges.cryptonatorExchange.btcPerbtc) {
		exchanges.cryptsyExchange.btcConversionColor = "#00FF00";
		exchanges.BTCEExchange.btcConversionColor = "#FF0000";
		exchanges.cryptonatorExchange.btcConversionColor = "#FF0000";
	}
	else if (exchanges.cryptonatorExchange.btcPerbtc > exchanges.BTCEExchange.btcPerbtc && exchanges.cryptonatorExchange.btcPerbtc > exchanges.cryptsyExchange.btcPerbtc) {
		exchanges.cryptonatorExchange.btcConversionColor = "#00FF00";
		exchanges.cryptsyExchange.btcConversionColor = "#FF0000";
		exchanges.BTCEExchange.btcConversionColor = "#FF0000";
	}
	else {
		exchanges.cryptonatorExchange.btcConversionColor = "#00FF00";
		exchanges.cryptsyExchange.btcConversionColor = "#00FF00";
		exchanges.BTCEExchange.btcConversionColor = "#00FF00";
	}

	if (exchanges.BTCEExchange.ltcPerbtc > exchanges.cryptsyExchange.ltcPerbtc && exchanges.BTCEExchange.ltcPerbtc > exchanges.cryptonatorExchange.ltcPerbtc) {
		exchanges.BTCEExchange.ltcConversionColor = "#00FF00";
		exchanges.cryptsyExchange.ltcConversionColor = "#FF0000";
		exchanges.cryptonatorExchange.ltcConversionColor = "#FF0000";
	}
	else if (exchanges.cryptsyExchange.ltcPerbtc > exchanges.BTCEExchange.ltcPerbtc && exchanges.cryptsyExchange.ltcPerbtc > exchanges.cryptonatorExchange.ltcPerbtc) {
		exchanges.cryptsyExchange.ltcConversionColor = "#00FF00";
		exchanges.BTCEExchange.ltcConversionColor = "#FF0000";
		exchanges.cryptonatorExchange.ltcConversionColor = "#FF0000";
	}
	else if (exchanges.cryptonatorExchange.ltcPerbtc > exchanges.BTCEExchange.ltcPerbtc && exchanges.cryptonatorExchange.ltcPerbtc > exchanges.cryptsyExchange.ltcPerbtc) {
		exchanges.cryptonatorExchange.ltcConversionColor = "#00FF00";
		exchanges.cryptsyExchange.ltcConversionColor = "#FF0000";
		exchanges.BTCEExchange.ltcConversionColor = "#FF0000";
	}
	else {
		exchanges.cryptonatorExchange.btcConversionColor = "#00FF00";
		exchanges.cryptsyExchange.btcConversionColor = "#00FF00";
		exchanges.BTCEExchange.btcConversionColor = "#00FF00";
	}

	if (exchanges.BTCEExchange.ppcPerbtc > exchanges.cryptsyExchange.ppcPerbtc && exchanges.BTCEExchange.ppcPerbtc > exchanges.cryptonatorExchange.ppcPerbtc) {
		exchanges.BTCEExchange.ppcConversionColor = "#00FF00";
		exchanges.cryptsyExchange.ppcConversionColor = "#FF0000";
		exchanges.cryptonatorExchange.ppcConversionColor = "#FF0000";
	}
	else if (exchanges.cryptsyExchange.ppcPerbtc > exchanges.BTCEExchange.ppcPerbtc && exchanges.cryptsyExchange.ppcPerbtc > exchanges.cryptonatorExchange.ppcPerbtc) {
		exchanges.cryptsyExchange.ppcConversionColor = "#00FF00";
		exchanges.BTCEExchange.ppcConversionColor = "#FF0000";
		exchanges.cryptonatorExchange.ppcConversionColor = "#FF0000";
	}
	else if (exchanges.cryptonatorExchange.ppcPerbtc > exchanges.BTCEExchange.ppcPerbtc && exchanges.cryptonatorExchange.ppcPerbtc > exchanges.cryptsyExchange.ppcPerbtc) {
		exchanges.cryptonatorExchange.ppcConversionColor = "#00FF00";
		exchanges.cryptsyExchange.ppcConversionColor = "#FF0000";
		exchanges.BTCEExchange.ppcConversionColor = "#FF0000";
	}
	else {
		exchanges.cryptonatorExchange.btcConversionColor = "#00FF00";
		exchanges.cryptsyExchange.btcConversionColor = "#00FF00";
		exchanges.BTCEExchange.btcConversionColor = "#00FF00";
	}

	if (exchanges.cryptsyExchange.dashPerbtc > exchanges.cryptonatorExchange.dashPerbtc) {
		exchanges.cryptsyExchange.dashConversionColor = "#00FF00";
		exchanges.BTCEExchange.dashConversionColor = "#FF0000";
		exchanges.cryptonatorExchange.dashConversionColor = "#FF0000";
	}
	else if (exchanges.cryptonatorExchange.dashPerbtc > exchanges.cryptsyExchange.dashPerbtc) {
		exchanges.cryptonatorExchange.dashConversionColor = "#00FF00";
		exchanges.cryptsyExchange.dashConversionColor = "#FF0000";
		exchanges.BTCEExchange.dashConversionColor = "#FF0000";
	}
	else {
		exchanges.cryptonatorExchange.btcConversionColor = "#00FF00";
		exchanges.cryptsyExchange.btcConversionColor = "#00FF00";
		exchanges.BTCEExchange.btcConversionColor = "#00FF00";
	}

  }
};


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Bit Exchange', ex: exchanges });
});


module.exports = router;

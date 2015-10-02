'use strict';

var Twitter = require('twitter');

try {
  var config = require( './config.json');
  var envars = {
    consumer_key: config.cKey,
    consumer_secret: config.cSecret,
    access_token_key: config.atKey,
    access_token_secret: config.atSecret
  };
}

catch(err) {
    client = new Twitter({
      consumer_key: process.env.C_KEY,
      consumer_secret: process.env.C_SECRET,
      access_token_key: process.env.AT_KEY,
      access_token_secret: process.env.AT_SECRET
    });
}

module.exports = {
  twitterRequest: function(req, res) {
    var params = req;
    client.get('statuses/user_timeline', params, function(error, tweets, response){
      if (error) {
        console.log(error);
      }
      if (!error) {
        return res(tweets);
      }
    });
  }
};

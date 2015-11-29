'use strict';

var Twitter = require('twitter');

function tryRequire(module) {
  try {
    return require(module);
  } catch (error) { }
}

var config = tryRequire('./config.json') || {};

var client = new Twitter({
    consumer_key: config.cKey || process.env.C_KEY,
    consumer_secret: config.cSecret || process.env.C_SECRET,
    access_token_key: config.atKey || process.env.AT_KEY,
    access_token_secret: config.atSecret || process.env.AT_SECRET
  });

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

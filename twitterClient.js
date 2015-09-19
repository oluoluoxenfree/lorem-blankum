var Twitter = require('twitter'),
    config = require( './config.json'),
    client = new Twitter({
      consumer_key: config.cKey,
      consumer_secret: config.cSecret,
      access_token_key: config.atKey,
      access_token_secret: config.atSecret
    });

module.exports = {
  twitterRequest: function(req) {
    var params = req;
    params.include_rts = 'false';
    client.get('statuses/user_timeline', params, function(error, tweets, response){
      if (error) {
        console.log(error);
      }
      if (!error) {
        return tweets;
      }
    });
  }
};
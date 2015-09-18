var words = [],
    envVars,
    client,
    Twitter = require('twitter'),
    config = require( './config.json');

var client = new Twitter({
  consumer_key: config.cKey,
  consumer_secret: config.cSecret,
  access_token_key: config.atKey,
  access_token_secret: config.atSecret
});

$(document).ready(function() {

  $(function(){
    $(".examples").typed({
    strings: ["First sentence.", "Second sentence.", "Click me"],
    typeSpeed: 0
    });
  });

  $('span').click(function() {
    $('span').remove();
    $('input').show();
  });

  $( ".search-term" ).keypress(function( event ) {
    var searchTerm = $('.search-term').val();
    if ( event.which == 13 ) {
      var params = {screen_name: searchTerm};
      client.get('statuses/user_timeline', params, function(error, tweets, response){
        if (!error) {
          console.log(tweets);
        }
      });
    }
  });
});

var words = [],
    envVars,
    client,
    fs,
    apiConfig = require( './config.json');

envVars= {
  consumer_key: apiConfig.cKey,
  consumer_secret: apiConfig.cSecret,
  access_token_key: apiConfig.atKey,
  access_token_secret: apiConfig.atSecret
};

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
     console.log(searchTerm);
    }
  });
});

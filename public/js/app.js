$(document).ready(function() {

  $( ".search-term" ).keypress(function( event ) {
    var searchTerm = $('.search-term').val();
    if ( event.which == 13 ) {
      $.ajax({
        type: 'GET',
        data: {screen_name: searchTerm},
        url: './' + searchTerm
      });
    }
  });

  $('.ipsum-area').text(tweets[0].text);
});

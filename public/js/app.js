$(document).ready(function() {

  $( ".search-term" ).keypress(function( event ) {
    //remove # and @ from the search string
    var searchTerm = $('.search-term').val();
    if ( event.which == 13 ) {
      $.ajax({
        type: 'GET',
        data: {screen_name: searchTerm, include_rts: false},
        url: './' + searchTerm
      }).done(function(tweets) {
        $('.ipsum-area').text(JSON.stringify(tweets));
      });
    }
  });
});

$(document).ready(function() {
var sentences = [];
  $( ".search-term" ).keypress(function( event ) {
    //remove # and @ from the search string
    var searchTerm = $('.search-term').val();
    if ( event.which == 13 ) {
      $.ajax({
        type: 'GET',
        data: {screen_name: searchTerm, include_rts: false},
        url: './' + searchTerm
      }).done(function(tweets) {
        $('.ipsum-area').text(sortWords(tweets));
      });
    }
  });
});

function sortWords(tweets) {
  for(var i = 0; i++; i < tweets.length) {
    sentences.push(tweets[i].text);
    console.log(sentences);
    return sentences;
  }
}

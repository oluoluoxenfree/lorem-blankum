'use strict';

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
        $('.ipsum-area').text(filterSentences(tweets));
      });
    }
  });
});

var sentences = [];
function filterSentences(tweets) {
  for(var i = 0; i < tweets.length; i++) {
    sentences.push(tweets[i].text);
  }
   console.log(sentences);
   return sentences;
}

function removeHyperlinks() {}

function collectAllTheWords() {}

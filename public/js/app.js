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
        var AllSentences = filterSentences(tweets);
        var AllWords = collectAllTheWords(sentences);
        var wantedWords = removeUndesirables(AllWords);
        $('.ipsum-area').text(wantedWords);
      });
    }
  });
});

var sentences = [];
function filterSentences(tweets) {
  for(var i = 0; i < tweets.length; i++) {
    sentences.push(tweets[i].text);
  }
   return sentences;
}

function collectAllTheWords(sentences) {
  var words = sentences.toString().split(' ');
  return words;
}

var ipsumIngredients = [];
function removeUndesirables(words) {
  words.map(function (str) {
    ipsumIngredients.push(str.replace(/([#@]|http)\S+\s*/, ''));
    console.log(str);
  });
  return ipsumIngredients;
}

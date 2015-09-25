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
        var allSentences = filterSentences(tweets);
        var allWords = collectAllTheWords(allSentences);
        var wantedWords = removeUndesirables(allWords);
        var withoutEmpties = removeEmptyStrings(wantedWords);
        $('.ipsum-area').text(withoutEmpties);
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
  });
  return ipsumIngredients;
}


function removeEmptyStrings(words) {
  for(var i = words.length -1; i > -1; i--) {
    if (words[i].substring(0) === "") {
      words.splice(i, 1);
    }
  }
  return words;
}

'use strict';

$(document).ready(function() {
  $( ".search-term" ).keypress(function( event ) {
    //remove # and @ from the search string
    var searchTerm = $('.search-term').val();
    if ( event.which == 13 ) {
      $.ajax({
        type: 'GET',
        data: {screen_name: searchTerm, include_rts: false, count: 200},
        url: './' + searchTerm
      }).done(function(tweets) {
        var allSentences = filterSentences(tweets);
        var allWords = collectAllTheWords(allSentences);
        var wantedWords = removeUndesirables(allWords);
        var withoutEmpties = removeEmptyStrings(wantedWords);
        var finishedIpsum = constructIpsum(withoutEmpties);
        $('.ipsum-area').text(finishedIpsum);
      });
      $(".main-text").addClass('bounceOutRight');
      $('.main-text').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function() {
        $('.main-text').hide();
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

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function constructIpsum(words) {
  var ipsumArray = [];
  for(var i = 0; i < 51; i++) {
    ipsumArray.push(words[getRandomInt(0, (words.length -1))]);
  }
  return ipsumArray.join(' ');
}

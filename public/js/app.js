'use strict';

$(document).ready(function() {
  $('.options').hide();

  var optionsNumber = $('.options-number').val();

  $( ".search-term" ).keypress(function( event ) {
    //remove # and @ from the search string
    var searchTerm = $('.search-term').val();
    $('.search-term').keypress(function (e) {
      if (e.keyCode == 13) {
        $(".main-text").addClass('bounceOutRight');
        $('.main-text').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function() {
        $('.main-text').hide();
        $('.options').show().addClass('animated bounceInLeft');
        });
      }
    });
    return searchTerm;
  });

  $('.options-number').keypress(function (e) {
    if (e.keyCode == 13) {
      $('.options').addClass('bounceOutRight');
      $('.main-text').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function() {
        $('.main-text').hide();
      $.ajax({
        type: 'GET',
        data: {screen_name: searchTerm, include_rts: false, count: optionsNumber},
        url: './' + searchTerm
      }).done(function(tweets) {
        var allSentences = filterSentences(tweets);
        var allWords = collectAllTheWords(allSentences);
        var wantedWords = removeUndesirables(allWords);
        var withoutEmpties = removeEmptyStrings(wantedWords);
        var finishedIpsum = constructIpsum(withoutEmpties);
        $('.ipsum-area').text(finishedIpsum);
      });
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

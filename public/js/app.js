'use strict';

$(document).ready(function() {
  $('.options').hide();
  $('.ipsum-area').hide();

  var $optionsNumber = $('.options-number');
  var $searchTerm = $('.search-term');

  //remove # and @ from the search string
  $searchTerm.keypress(function (e) {
    if (e.keyCode == 13) {
      $(".main-text").addClass('bounceOutRight');
      $('.main-text').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function() {
        $('.main-text').hide();
        $('.options').show().addClass('animated bounceInLeft');
      });
    }
  });

  $optionsNumber.keypress(function (e) {
    var newFieldVal =$optionsNumber.val();
    if (e.keyCode == 13) {
      $.ajax({
        type: 'GET',
        data: {screen_name: $searchTerm.val(), include_rts: false, count: newFieldVal},
        dataType: 'json',
        url: './' + $searchTerm.val(),
        success: function(response, textStatus, jqXHR) {
          console.log("Yay!");
        },
        error: function(jqXHR, textStatus, errorThrown){
         console.log(textStatus, errorThrown);
        }
      }).done(function(tweets) {
        var allSentences = filterSentences(tweets);
        var allWords = collectAllTheWords(allSentences);
        var wantedWords = removeUndesirables(allWords);
        var withoutEmpties = removeEmptyStrings(wantedWords);
        var finishedIpsum = constructIpsum(withoutEmpties);
        $('.ipsum-area').text(finishedIpsum).prepend('<h3>Here you go:</h3>');
        $('.ipsum-area').show();
      });
    $('.options').addClass('bounceOutRight');
    $('.options').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function() {
      $('.options').remove();
    });
    }
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
  for(var i = 0; i <= (Number($optionsNumber.val()) + 1); i++) {
    console.log($optionsNumber.val());
    ipsumArray.push(words[getRandomInt(0, (words.length -1))]);
  }
  return ipsumArray.join(' ');
}
});

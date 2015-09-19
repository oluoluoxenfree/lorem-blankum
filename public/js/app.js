$(document).ready(function() {

  $(function(){
    $(".examples").typed({
    strings: ["@twitter", "#cheese", "Click me"],
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
      $.ajax({
        type: 'GET',
        data: {screen_name: searchTerm},
        url: './',
        success: function(data) {
          console.log(data);
          return data;
        }
      });
    }
  });

  $('.ipsum-area').text(tweets.text);
});

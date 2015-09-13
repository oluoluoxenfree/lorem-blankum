var words = [];

$(document).ready(function() {

  $(function(){
    $(".examples").typed({
    strings: ["First sentence.", "Second sentence.", "Click me"],
    typeSpeed: 0
    });
  });

  $('span').click(function() {
    $('span').remove();
    $('input').show();
  });
});

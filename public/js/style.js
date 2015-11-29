$(document).ready(function() {

  $(function(){
    $(".examples").typed({
      strings: ["@katyperry", "@barackobama", "@you! ^500"],
      typeSpeed: 0,
      callback: function() {
                  $('span').remove();
                  $('input').show();
      }
    });
  });
});

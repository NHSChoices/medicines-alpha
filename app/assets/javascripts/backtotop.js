// quick and dirty back to top functionality
var btt = (function() {

  var $btt = $('.back-to-top'),
      offset = 250,
      duration = 300;

  $(window).scroll(function () {
    if ($(this).scrollTop() > offset) {
        $btt.fadeIn(duration);
    } else {
        $btt.fadeOut(duration);
    }
  });

  $btt.click(function (event) {
    event.preventDefault();
    $('html, body').animate({ scrollTop: 0 }, 500);
    return false;
  })
}());

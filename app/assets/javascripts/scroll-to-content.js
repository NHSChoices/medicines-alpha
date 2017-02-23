// scroll to internal content
var scrollToContent = (function() {

  $('.page-nav-list a[href^="#"], .link-internal').on('click', function(e) {
    e.preventDefault();
    var target = $(this.hash),
        $target = $(target),
        extraOffset = 15;

    // scroll to
    $('html, body').animate({
      scrollTop: target.offset().top - extraOffset
    }, 1000);
  });
}());

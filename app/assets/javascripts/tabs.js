// quick and dirty tabs functionality
var tabs = (function() {
  var $tabs = $('.tabs a');
      tabCurrent = 'tab__link--current',
      hidden = 'hidden';

  $tabs.on('click', function(e) {
    e.preventDefault();
    $tabs.removeClass(tabCurrent);
    $(this).addClass(tabCurrent);
    var contentID = $(this).attr('href');
    if ($(contentID).hasClass('hidden')) {
      $('.tabs-content').addClass('hidden');
      $(contentID).removeClass('hidden');
    }
    if ($(this).hasClass('tab1')) {
      $('.nav__list-wrap1').removeClass('hidden');
      $('.nav__list-wrap2').addClass('hidden');
    } else {
      $('.nav__list-wrap2').removeClass('hidden');
      $('.nav__list-wrap1').addClass('hidden');
    }

  });

}());

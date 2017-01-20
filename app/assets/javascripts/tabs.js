// quick and dirty tabs functionality
var tabs = (function() {
  var $tabs = $('.tabs a');
      tabCurrent = 'tab__link--current',
      hidden = 'hidden';

  $tabs.on('click', function(e) {

    module = new GOVUK.Modules.HighlightActiveSectionHeading();
    module.start($('.page-nav-tab2'));
    $('.js-page-contents').removeClass('content-fixed').css('width', 'auto');
    $('.page-nav-list a').removeClass('active');

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
      $('.page-nav-tab1').removeClass('hidden');
      $('.page-nav-tab2').addClass('hidden');
    } else {
      $('.nav__list-wrap2').removeClass('hidden');
      $('.nav__list-wrap1').addClass('hidden');
      $('.page-nav-tab2').removeClass('hidden');
      $('.page-nav-tab1').addClass('hidden');
    }

  });

}());


// scroll to internal content
var scrollToContent = (function() {

  var navSticky = '.nav--sticky',
      $navListWrap = $('.nav__list-wrap');

  $('.page-nav-list a[href^="#"]').on('click', function(e) {
    e.preventDefault();
    var target = $(this.hash);
    var $target = $(target);

    if ($target.hasClass('noborder')) {
      extraOffset = 15;
    } else {
      extraOffset = -20;
    }

    // scroll to
    $('html, body').animate({
      scrollTop: target.offset().top - extraOffset
    }, 1000);
  });
}());

var init = (function() {

  // Move 'more' items
  if ( ($(window).width() >= 1024) && ($(window).width() <= 1279) ) {

    if ( ($('.content1').length) && ($('.content2').length) ) {
      $('.nav__list-wrap1 .nav__list-more-item1').appendTo($('.nav__list-wrap1 .nav__list-more'));
      $('.nav--injected .nav__list-wrap1 .nav__list-more-item').appendTo($('.nav--injected .nav__list-wrap1 .nav__list-more'));
      $('.nav__list-wrap2 .nav__list-more-item2').appendTo($('.nav__list-wrap2 .nav__list-more'));
      $('.nav--injected .nav__list-wrap2 .nav__list-more-item').appendTo($('.nav--injected .nav__list-wrap2 .nav__list-more'));
    } else {
      $('.nav .nav__list-more-item').appendTo($('.nav .nav__list-more'));
      $('.nav--injected .nav__list-more-item').appendTo($('.nav--injected .nav__list-more'));
    }

  }

  // duplicate nav for sticky version
  var $navInjected = $('.nav').clone().addClass('nav--injected').removeClass('nav').insertAfter('.nav');

  // change tracking string for sticky nav for userzoom
  $navInjected.html(function(index, html) {
      return html.replace(/top nav/g, 'sticky nav');
  });

  // show nav at bigger screen size
  if ($(window).width() >= 1280) {
    if (!($('.nav .nav__list-wrap').hasClass('hidden'))) {
      $('.nav .nav__list-wrap').show();
    }
  }

}());


// toggle the dropdown menu from the burger menu
var toggleMenu = (function() {

  var $navToggle = $('.nav__toggle'),
      navSticky = '.nav--sticky';

  $navToggle.on('click', function() {
    if ($(navSticky).length) {

      if ( ($('.content1').length) && ($('.content2').length) ) {
        if ($('.content2').hasClass('hidden')) {
          $navWrap = $('.nav--sticky .nav__list-wrap1');
        } else {
          $navWrap = $('.nav--sticky .nav__list-wrap2');
        }
      } else {
        $navWrap = $('.nav--sticky .nav__list-wrap');
      }

    } else {
      if ( ($('.content1').length) && ($('.content2').length) ) {
        if ($('.content2').hasClass('hidden')) {
          $navWrap = $('.nav .nav__list-wrap1');
        } else {
          $navWrap = $('.nav .nav__list-wrap2');
        }
      } else {
        $navWrap = $('.nav .nav__list-wrap');
      }
    }
    $navWrap.slideToggle();
  });

  $(window).resize(function() {

    // Move 'more' items
    if ( ($(window).width() >= 1024) && ($(window).width() <= 1279) ) {

      // non sticky, move items from first list to more list
      if ($('.nav .nav__list-nomore .nav__list-more-item').length) {
        $('.nav .nav__list-nomore .nav__list-more-item').appendTo($('.nav .nav__list-more'));
      }

      // injected menu, move items from first list to more list
      if ($('.nav--injected .nav__list-nomore .nav__list-more-item').length) {
        $('.nav--injected .nav__list-more-item').appendTo($('.nav--injected .nav__list-more'));
      }

      // if menu is sticky, move items from first list to more list
      if ($('.nav--sticky .nav__list-nomore .nav__list-more-item').length) {
        $('.nav--sticky .nav__list-nomore .nav__list-more-item').appendTo($('.nav--sticky .nav__list-more'));
      }

    } else {

      // non sticky, move items from more list to the first list
      if ($('.nav .nav__list-more .nav__list-more-item').length) {
        $('.nav .nav__list-more .nav__list-more-item').appendTo($('.nav .nav__list-nomore'));
      }

      // injected menu, move items from more menu to the first list
      if ($('.nav--injected .nav__list-more .nav__list-item').length) {
        $('.nav--injected .nav__list-more .nav__list-item').appendTo($('.nav--injected .nav__list-nomore'));
      }

      // if menu is sticky, more items from more menu to the first list
      if ($('.nav--sticky .nav__list-more .nav__list-more-item').length) {
        $('.nav--sticky .nav--list-more .nav__list-more-item').appendTo($('.nav--sticky .nav__list-nomore'));
        $('.nav--sticky .nav__list-wrap').hide();
      }

      // reset the more/less link
      if ($('.nav__more').hasClass('arrow-up')) {
        $('.nav__more').removeClass('arrow-up').addClass('arrow-down').find('.nav__more-link').text('More');
      }

      // hide the more list
      $('.nav__list-more').hide();
    }


    // if resizing menu
    if ($(window).width() < 1024) {
      if ( ($('.nav__list-more-item').css('display') === 'none') || ($('.nav__list-more-item').css('display') == 'inline') ) {
        $('.nav__list-more-item').css('display', 'block');
      }
    }
    if ($(window).width() >= 1280) {
      if ( ($('.nav__list-more-item').css('display') === 'none') || ($('.nav__list-more-item').css('display') == 'block') ) {
        $('.nav__list-more-item').css('display', 'inline');
      }
    }


    // show nav at bigger screen size
    if ($(window).width() >= 1024) {

      if (!($('.nav__list-wrap').hasClass('hidden'))) {
        $('.nav__list-wrap').show();
      }

    }
  });

}());


// scroll to internal content
var scrollToContent = (function() {

  var navSticky = '.nav--sticky',
      $navListWrap = $('.nav__list-wrap');

  $('a.nav__list-link[href^="#"]').on('click', function(e) {
    e.preventDefault();
    var target = $(this.hash);
    var $target = $(target);

    if ($target.hasClass('noborder')) {
      extraOffset = 55;
    } else {
      extraOffset = 20;
    }

    if ( ($(navSticky).length) && ($(window).width() < 1024) ) {
      $navListWrap.hide();
    }

    // scroll to
    $('html, body').animate({
      scrollTop: target.offset().top - extraOffset
    }, 1000);
  });
}());


// make the nav sticky
var stickyNav = (function() {
  var $navToggle = $('.nav__toggle'),
      $navListWrapNonSticky  = $('.nav .nav__list-wrap'),
      $navInjected = $('.nav--injected'),
      navStickyClass = 'nav--sticky',
      headerNavContainer = '.header__nav-container',
      headerDislaimerHeights = $('header').height() + $('.disclaimer').height();
      topOffset = headerDislaimerHeights  + $(headerNavContainer).height();

  $navToggle.on('click', function() {
    // reset offset height if menu has been toggled. Need to let the animation finish first before measuring heights
    interval = setTimeout(function() {
      topOffset = headerDislaimerHeights  + $(headerNavContainer).height();
    }, 1000);
  });

  $(window).resize(function() {
    // reset offset height if window has been resized
    topOffset = headerDislaimerHeights  + $(headerNavContainer).height();
  });


  $(window).scroll(function() {

    // reset offset height if menu has been opened
    if ($navListWrapNonSticky.css('display') === 'block') {
      topOffset = headerDislaimerHeights  + $(headerNavContainer).height();
    }

    if( $(this).scrollTop() > topOffset ) {
      $navInjected.addClass(navStickyClass);
    } else {
      $navInjected.removeClass(navStickyClass);
    }

  });

}());

// Show/hide more menu at tablet landscape/small desktop view (1024-1279px)
var moreNav = (function() {
  var navList = '.nav__list',
      $navMorelink = $('.nav__more-link'),
      arrowDownClass = 'arrow-down',
      arrowUpClass = 'arrow-up';

  $navMorelink.on('click', function(e) {
    e.preventDefault();
    if ($(this).text() === 'More') {
      $(this).closest(navList).next(navList).show();
      $(this).text('Less');
      $(this).parent().removeClass(arrowDownClass).addClass(arrowUpClass);
    } else {
      $(this).closest(navList).next(navList).hide();
      $(this).text('More');
      $(this).parent().removeClass(arrowUpClass).addClass(arrowDownClass);
    }

  });

}());


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

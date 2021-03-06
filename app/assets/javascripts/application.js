function ShowHideContent() {
  var self = this;

  self.escapeElementName = function(str) {
    result = str.replace('[', '\\[').replace(']', '\\]')
    return(result);
  };

  self.showHideRadioToggledContent = function () {
    $(".block-label input[type='radio']").each(function () {

      var $radio = $(this);
      var $radioGroupName = $radio.attr('name');
      var $radioLabel = $radio.parent('label');

      var dataTarget = $radioLabel.attr('data-target');

      // Add ARIA attributes

      // If the data-target attribute is defined
      if (dataTarget) {

        // Set aria-controls
        $radio.attr('aria-controls', dataTarget);

        $radio.on('click', function () {

          // Select radio buttons in the same group
          $radio.closest('form').find(".block-label input[name=" + self.escapeElementName($radioGroupName) + "]").each(function () {
            var $this = $(this);

            var groupDataTarget = $this.parent('label').attr('data-target');
            var $groupDataTarget = $('#' + groupDataTarget);

            // Hide toggled content
            $groupDataTarget.hide();
            // Set aria-expanded and aria-hidden for hidden content
            $this.attr('aria-expanded', 'false');
            $groupDataTarget.attr('aria-hidden', 'true');
          });

          var $dataTarget = $('#' + dataTarget);
          $dataTarget.show();
          // Set aria-expanded and aria-hidden for clicked radio
          $radio.attr('aria-expanded', 'true');
          $dataTarget.attr('aria-hidden', 'false');

        });

      } else {
        // If the data-target attribute is undefined for a radio button,
        // hide visible data-target content for radio buttons in the same group

        $radio.on('click', function () {

          // Select radio buttons in the same group
          $(".block-label input[name=" + self.escapeElementName($radioGroupName) + "]").each(function () {

            var groupDataTarget = $(this).parent('label').attr('data-target');
            var $groupDataTarget = $('#' + groupDataTarget);

            // Hide toggled content
            $groupDataTarget.hide();
            // Set aria-expanded and aria-hidden for hidden content
            $(this).attr('aria-expanded', 'false');
            $groupDataTarget.attr('aria-hidden', 'true');
          });

        });
      }

    });
  }
  self.showHideCheckboxToggledContent = function () {

    $(".block-label input[type='checkbox']").each(function() {

      var $checkbox = $(this);
      var $checkboxLabel = $(this).parent();

      var $dataTarget = $checkboxLabel.attr('data-target');

      // Add ARIA attributes

      // If the data-target attribute is defined
      if (typeof $dataTarget !== 'undefined' && $dataTarget !== false) {

        // Set aria-controls
        $checkbox.attr('aria-controls', $dataTarget);

        // Set aria-expanded and aria-hidden
        $checkbox.attr('aria-expanded', 'false');
        $('#'+$dataTarget).attr('aria-hidden', 'true');

        // For checkboxes revealing hidden content
        $checkbox.on('click', function() {

          var state = $(this).attr('aria-expanded') === 'false' ? true : false;

          // Toggle hidden content
          $('#'+$dataTarget).toggle();

          // Update aria-expanded and aria-hidden attributes
          $(this).attr('aria-expanded', state);
          $('#'+$dataTarget).attr('aria-hidden', !state);

        });
      }

    });
  }
}

$(document).ready(function() {

  module = new GOVUK.Modules.HighlightActiveSectionHeading();
  module.start($('.page-nav'));

  GOVUK.stickAtTopWhenScrolling.init();
  GOVUK.stopScrollingAtFooter.addEl($('.js-stick-at-top-when-scrolling'), $('.js-stick-at-top-when-scrolling').height());


  // Use GOV.UK selection-buttons.js to set selected
  // and focused states for block labels
  var $blockLabels = $(".block-label input[type='radio'], .block-label input[type='checkbox']");
  new GOVUK.SelectionButtons($blockLabels);

  // Show and hide toggled content
  // Where .block-label uses the data-target attribute
  var toggleContent = new ShowHideContent();
  toggleContent.showHideRadioToggledContent();
  toggleContent.showHideCheckboxToggledContent();


  // Sticky nav
  /*
  var mn = $('.main-nav-sticky'),
      mns = 'main-nav-scrolled',
      ms = 'main-nav-show',
      hdr = $('.header-sticky a'),
      hdrWrap = $('.header__wrap'),
      hdrHeight = $(hdrWrap).height(),
      hdrVal = $(hdr).text(),
      offset = 100;

  $(mn).scrollspy({ offset: -80 });

  $(window).scroll(function() {
    if( $(this).scrollTop() > hdrHeight ) {
      hdrWrap.addClass(mns);
      mn.addClass(ms);
      var text = $(mn).find('li.active a').text();
      if (text) {
        $(hdr).text(text);
      } else {
        $(hdr).text(hdrVal);
      }
      offset = 50;
    } else {
      hdrWrap.removeClass(mns);
      mn.removeClass(ms);
      $(mn).find('li').removeClass('active');
      $(hdr).text(hdrVal);
      offset = 100;
    }
  });
  */

  $('.toggle-nav').on('click', function() {
    $('.main-nav-sticky').slideToggle();
  });

  $(window).resize(function() {
    if ($('.dropdown-nav').css('display') === 'none') {
      $('.main-nav-sticky').show();
    }
  });

  $('.main-nav-sticky a[href^="#"]').on('click', function(e) {
    e.preventDefault();
    //$('.main-nav-sticky').hide();

    var target = $(this.hash);
    var $target = $(target);

    $('html, body').animate({
        scrollTop: target.offset().top
    }, 1000);

    // $(mn).find('li').removeClass('active');
    // $(this).parent().addClass('active');

  });

  $('summary').each(function(){
    var $this = $(this).find('span');
    $this.data('originalText',$this.html());
  });
  $('summary').click(function() {
    var $this = $(this).find('span');
    if ($this.text() === "Less information") {
      $this.html($this.data('originalText'));
    }
    else {
      $this.text("Less information");
    }
  });

});


// print for summary details

// Set up before/after handlers
var beforePrint = function() {
    // replace details elements with divs
    $('details').replaceWith(function(){
        return $("<div class='details' />").append($(this).contents());
    });

    $('summary').replaceWith(function(){
        return $("<div class='summary' />").append($(this).contents());
    });

};
var afterPrint = function() {
    //$("details").removeAttr('open');
    //$('.details').contents().unwrap().wrap('<details />');

    $('.details').replaceWith(function(){
        return $("<details />").append($(this).contents());
    });

    $('.summary').replaceWith(function(){
        return $("<summary />").append($(this).contents());
    });

};

if ('matchMedia' in window) {
    // Chrome, Firefox, and IE 10 support mediaMatch listeners
    window.matchMedia('print').addListener(function(media) {
        if (media.matches) {
            beforePrint();
        } else {
            // Fires immediately, so wait for the first mouse movement
            $(document).one('mouseover', afterPrint);
        }
    });
} else {
    // IE and Firefox fire before/after events
    $(window).on('beforeprint', beforePrint);
    $(window).on('afterprint', afterPrint);
}

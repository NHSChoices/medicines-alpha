$(".link-share").on('click', function(e) {
  e.preventDefault();

  var shareOptions = $(this).closest('ul').next('.share-options-wrap');

  if ($(shareOptions).css('display') === 'none') {
    $(shareOptions).show();
  } else {
    $(shareOptions).hide();
  }
})

$(".share-close").on('click', function(e) {
  e.preventDefault();
  $(this).parents('.share-options-wrap').hide();
})

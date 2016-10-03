(function(module) {
  var aboutController = {};

  aboutController.reveal = function() {
    $('.hero').slideUp('slow');
    $('.main-content').fadeOut('slow', function() {
      $('#about').fadeIn('slow');
    });
  };

  module.aboutController = aboutController;
})(window);

(function(module) {
  var homeController = {};

  homeController.reveal = function() {
    $('.hero').slideDown('slow', function() {
      $('.main-content').fadeIn(500);
    });
  };

  module.homeController = homeController;
})(window);

(function(module) {
  var projectsController = {};

  projectsController.reveal= function() {
    $('.hero').slideUp('slow');
    $('.main-content').fadeOut('slow', function() {
      $('#projects').fadeIn('slow');
    });
  };

  module.projectsController = projectsController;
})(window);

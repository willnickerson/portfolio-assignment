'use strict';
(function(module) {
  var projectView = {};

  projectView.hamburgerHover = function() {
    if($(window).width() < 640) {
      $('.icon-menu').on('click', function () {
        $('nav ul').slideToggle('slow');
      });
      $('main').on('mouseover', function() {
        $('nav ul').slideUp('slow');
      });
      $('nav li').on('click', function() {
        $('nav ul').slideUp('slow');
      });
    }
  };

  projectView.handleFilter = function() {
    $('#filter').on('change', function() {
      if($(this).val()) {
        $('.project-article').fadeOut(500);
        $('article[data-category="' + $(this).val() + '"]').fadeIn(500);
      } else {
        // TODO: Check why fadeOut seems to be skipped
        $('.project-article').fadeOut(500);
        $('.project-article').fadeIn(1000);
      }
    });
  };

  //this is used to hide the aricle text until the user clicks read-more
  projectView.preview = function() {
    $('.project-description *:nth-of-type(n+2)').hide();
    $('a[type="expand"]').on('click', function(e) {
      e.preventDefault();
      var $selectedParagraphs;
      if($(this).is('.read-more')) {
        $(this).prev().find('p').show(350);
        $(this).text('Show less');
        $(this).removeClass('read-more');
        // $(this).addClass('show-less');
      } else {
        $selectedParagraphs = $(this).prev().find('p:gt(0)');
        $selectedParagraphs.hide(350);
        $(this).text('Read-more');
        $(this).addClass('read-more');
      }
    });
  };

  projectView.renderToIndex = function() {
    //taking the elements from our newly populated Project.all array and converting them to html and appending them to the section with id="projects"

    Project.all.forEach(function(project){
      $('#projects').append(project.toHtml('#project-template'));
      if($('#filter option[value="' + project.category + '"]').length === 0) {
        $('#filter').append(project.toHtml('#filter-options'));
      };
    });
    projectView.hamburgerHover();
    projectView.handleFilter();
    projectView.preview();
  };

  //We will asynchronously render all the articles to index by calling the retrieveAll function here and passing it the render to index function.
  Project.retrieveAll(projectView.renderToIndex);

  module.projectView = projectView;
})(window);

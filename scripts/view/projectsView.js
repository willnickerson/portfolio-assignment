'use strict';
(function(module) {
  var projectView = {};

  //this takes user to part of desired part of the page via the nav bar
  projectView.handleNav = function() {
    $('nav').on('click', '.nav-tab', function(){
      var $selectedContent = $(this).attr('data-type');
      console.log($selectedContent);
      if($selectedContent === 'home') {
        $('.hero').slideDown('slow');
        $('.main-content').show();
      } else {
        $('.main-content').fadeOut();
        $('.hero').slideUp('slow');
        $('#' + $selectedContent).slideDown('slow');
      }
    });
  };

  projectView.hamburgerHover = function() {
    if($(window).width() < 640) {
      $('.icon-menu').on('click', function () {
        $('nav ul').slideDown('slow');
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
      if($(this).is('.read-more')) {
        $(this).prev().find('p').show(350);
        $(this).text('Show less');
        $(this).removeClass('read-more');
        // $(this).addClass('show-less');
      } else {
        var $selectedParagraphs = $(this).prev().find('p:gt(0)');
        $selectedParagraphs.hide(350);
        $(this).text('Read-more');
        $(this).addClass('read-more');
      }
    //TODO add code for show-less
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
    projectView.handleNav();
    projectView.hamburgerHover();
    projectView.handleFilter();
    projectView.preview();
  };

  //We will asynchronously render all the articles to index by calling the retrieveAll function here and passing it the render to index function.
  Project.retrieveAll(projectView.renderToIndex);

  module.projectView = projectView;
})(window);

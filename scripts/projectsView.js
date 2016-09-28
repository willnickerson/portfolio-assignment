'use strict';

var projectView = {};

//this takes user to part of desired part of the page via the nav bar
projectView.handleNav = function() {
  $('nav').on('click', '.nav-tab', function(){
    var $selectedContent = $(this).attr('data-type');
    console.log($selectedContent);
    $('.main-content').hide();
    $('.hero').slideUp('slow');
    $('#' + $selectedContent).show();
  });
};

projectView.handleFilter = function() {
  $('#filter').on('change', function() {
    if($(this).val()) {
      $('.project-article').fadeOut(500);
      $('article[data-category="' + $(this).val() + '"]').fadeIn(500);
    } else {
      // TODO: Check why fadeOut seems to be skipped
      $('.project-article').fadeOut(500).fadeIn(500);
    }
  });
};

//this is used to hide the aricle text until the user clicks read-more
projectView.preview = function() {
  $('.project-description *:nth-of-type(n+2)').hide();
  $('a[type="expand"]').on('click', function(e) {
    e.preventDefault();
    if($(this).is('.read-more')) {
      $(this).prev().find('p').show();
      console.log('test');
      $(this).text('Show less');
      $(this).removeClass('read-more');
      // $(this).addClass('show-less');
    } else {
      console.log('will show less');
      var $selectedParagraphs = $(this).prev().find('p:gt(0)');
      console.log($selectedParagraphs);
      $selectedParagraphs.hide();
      $(this).text('Read-more');
      $(this).addClass('read-more');
    }
  //TODO add code for show-less
  });
};

projectView.renderToIndex = function() {
  //taking the elements from our newly populated Project.all array and converting them to html and appending them to the section with id="projects"

  Project.all.forEach(function(project){
    $('#projects').append(project.toHtml());
  });

  // Loading filter option to filter. This really looks like a huge mess in comparison to the last version but it makes use of the functional array methods
  Project.all.map(function(project) {
    return project.category;
  }).reduce(function(acc, curr) {
    if(acc.indexOf(curr) === -1) {
      acc[acc.length] = curr;
    }
    return acc;
  }, []).map(function(opts) {
    var project = new Project;
    project.category = opts;
    return project;
  }).map(function(filterOption) {
    $('#filter').append(filterOption.toFilter());
  });

  projectView.handleNav();
  projectView.handleFilter();
  projectView.preview();
};

//We will asynchronously render all the articles to index by calling the retrieveAll function here.
Project.retrieveAll();

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


projectView.handleNav();
projectView.handleFilter();
projectView.preview();

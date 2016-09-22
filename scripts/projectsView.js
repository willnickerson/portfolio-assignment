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
    }
  });
};

//this is used to hide the aricle text until the user clicks read-more
projectView.preview = function() {
  $('.project-description *:nth-of-type(n+2)').hide();
  $('a.read-more').on('click', function(e) {
    e.preventDefault();
    $(this).prev().find('p').show();
    $(this).text('Show less');
    $(this).removeClass('read-more');
    $(this).addClass('show-less');
  //TODO add code for show-less
  });
};


projectView.handleNav();
projectView.handleFilter();
projectView.preview();

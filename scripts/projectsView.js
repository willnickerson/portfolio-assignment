'use strict';

var projectView = {};

projectView.handleNav = function() {
  $('nav').on('click', '.nav-tab', function(){
    var $selectedContent = $(this).attr('data-type');
    console.log($selectedContent);
    $('.main-content').hide();
    $('.hero').slideUp('slow');
    $('#' + $selectedContent).show();
  });
};

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
projectView.preview();

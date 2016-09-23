'use strict';
//This array will store our project objects.
var projects = [];

//Constructor function for Projects objects. Takes an object from userData array and makes it into new Project.
function Project(opts) {
  this.title = opts.title;
  this.category = opts.category;
  this.authors = opts.authors;
  this.projectUrl = opts.projectUrl;
  this.img = opts.img;
  this.description = opts.description;
}

//This function will take a Project object, convert it to Html using handlebars so that it can be appened to the projects section of our page.

Project.prototype.toHtml = function () {
  var source = $('#project-template').html();
  var template = Handlebars.compile(source);
  var html = template(this);
  return html;
};

Project.prototype.toFilter = function() {
  var source = $('#filter-options').html();
  var template = Handlebars.compile(source);
  var html = template(this);
  return html;
};

//this sorts the projects by their importance attributes
userData.sort(function(currentElement, nextElement) {
  return currentElement.importance - nextElement.importance;
});

//using the objects form the array in projectsSource to populate our projects array with new Project objects.
userData.forEach(function(p) {
  projects.push(new Project(p));
});

//taking the elements from our newly populated projects array and converting them to html and appending them to the section with id="projects"
projects.forEach(function(project){
  $('#projects').append(project.toHtml());
  // WILL ONLY POPULATE IF EMPTY
  if($('#filter option[value="' + project.category + '"]').length === 0) {
    $('#filter').append(project.toFilter());
  };
});

// When we have articles being added dynamically to the page, we will need to
// make a new function to populate the filters.

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

//This function will take a Project object, convert it to Html and append it to the projects section of our page.
Project.prototype.toHtml = function () {
  //cloning template article and converting to jQuery object.
  var $newProject = $('article.template').clone();

  //assigning Project attributes to their corresponing html elements in our cloned template.
  $newProject.attr('data-category', this.category);
  $newProject.find('h4 a').text(this.title).attr('href', this.projectUrl);
  $newProject.find('h5').text('By ' + this.authors);
  $newProject.find('img.project-img').attr('src', this.img);
  $newProject.find('section.project-description').html(this.description);

  //removing template class so that project will display
  $newProject.removeClass('template');
  $newProject.addClass('project-info');
  return $newProject;
};

//TODO make function to sort projects in order of importance

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
});

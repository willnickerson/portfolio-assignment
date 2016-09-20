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
  var $newProject = $('article.template').clone();
  return $newProject;
};

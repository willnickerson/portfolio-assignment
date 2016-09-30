'use strict';
//Constructor function for Projects objects. Takes an object from userData array and makes it into new Project.
(function(module) {
  function Project(opts) {
    for (var key in opts) {
      this[key] = opts[key];
    }
  }

  //This will be out array of projects
  Project.all = [];

  //This function will take a Project object, convert it to Html using handlebars so that it can be appened to a specified section of our page.
  Project.prototype.toHtml = function(templateId) {
    var source = $(templateId).html();
    var template = Handlebars.compile(source);
    var html = template(this);
    return html;
  };

  //This recieves data and converts it into a new project object.
  Project.loadAll = function(passedData) {
    //this sorts the projects by their importance attributes and then pushes them to Project.all array.
    passedData.sort(function(currentElement, nextElement) {
      return currentElement.importance - nextElement.importance;
    }).forEach(function(p) {
      Project.all.push(new Project(p));
    });
  };

  //This function will retrieve data from local storage or the json file and render it to index.html
  Project.retrieveAll = function(nextFunction) {
    //If there are projects saved in local storage retrieve them, then parse them and render to page.
    if(localStorage.projects) {
      // Template for checking if mods have been made to Json file
      $.ajax({
        type: 'HEAD',
        url: 'data/projects.json',
        success: function(data, messagem, request) {
          var eTag = request.getResponseHeader('Etag');
          if (!localStorage.eTag || eTag !== localStorage.eTag) {
            localStorage.eTag = eTag;
            Project.handleJsonProjects(nextFunction);
          } else {
            //we run this if the eTags match i.e. no changes have been made to the JSON.
            //we simply retrieve JSON from localStorage.
            var retrievedProjects = localStorage.getItem('projects');
            var parsedProjects = JSON.parse(retrievedProjects);
            Project.loadAll(parsedProjects);
            nextFunction();
          }
        },
        error: function(error) {
          console.log('ERROR', error);
        }
      });
    } else {
      Project.handleJsonProjects(nextFunction);
    }
  };

  //takes projects from projects.json, appends them to page and add them to local storage
  Project.handleJsonProjects = function(nextFunction) {
    $.ajax('data/projects.json', {
      method: 'GET',
      success: successHandler,
      error: errorHandler
    });
    function successHandler(data, textStatus, xhr) {
      //take the data from json file and load to Project.all
      Project.loadAll(data);
      //stringify data from JSON file and add to local storage
      var projectsString = JSON.stringify(data);
      localStorage.setItem('projects', projectsString);
      // addapted from http://stackoverflow.com/questions/1557602/jquery-and-ajax-response-header
      var eTag = xhr.getResponseHeader('Etag');
      localStorage.setItem('eTag', eTag);
      //render to index
      nextFunction();
    };
    function errorHandler(error) {
      console.log('ERROR', error);
    };
  };

  module.Project = Project;
})(window);

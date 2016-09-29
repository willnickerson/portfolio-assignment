'use strict';
//This array will store our project objects.
// var projects = [];

//Constructor function for Projects objects. Takes an object from userData array and makes it into new Project.
function Project(opts) {
  for (var key in opts) {
    this[key] = opts[key];
  }
}

Project.all = [];

//This function will take a Project object, convert it to Html using handlebars so that it can be appened to a specified section of our page.

Project.prototype.toHtml = function(templateId) {
  var source = $(templateId).html();
  var template = Handlebars.compile(source);
  var html = template(this);
  return html;
};

Project.loadAll = function(passedData) {
  //this sorts the projects by their importance attributes and then pushes them to Project.all array.
  passedData.sort(function(currentElement, nextElement) {
    return currentElement.importance - nextElement.importance;
  }).forEach(function(p) {
    Project.all.push(new Project(p));
  });
};

//This function will retrieve data from local storage or the json file and render it to index.html
Project.retrieveAll = function() {
  if(localStorage.projects) {
    //If there are projects saved in local storage retrieve them, then parse them and render to page.

    // Template for checking if mods have been made to Json file
    // $.ajax({
    //   type: 'HEAD',
    //   url: 'data/projects.json',
    //   success: function(data, messagem, xhr) {
    //     var eTag = xhr.getResponseHeader('Etag');
    //     if (!localStorage.eTag || etag !== localStorage.eTag) {
    //       localStorage.eTag = eTag;
    //     }
    //   }
    // });

    console.log('we found stuff');
    var retrievedProjects = localStorage.getItem('projects');
    var parsedProjects = JSON.parse(retrievedProjects);
    console.log(parsedProjects);
    Project.loadAll(parsedProjects);
    projectView.renderToIndex();
  } else {
    //take proejects from projects.json, append them to page and add them to local storage
    $.ajax('data/projects.json', {
      method: 'GET',
      success: successHandler,
      error: errorHandler
    });
    function successHandler(data, textStatus, request) {
      //take the data from json file and load to Project.all then render Project.all to index.html
      Project.loadAll(data);
      projectView.renderToIndex();
      //stringify data from JSON file and add to local storage
      var projectsString = JSON.stringify(data);
      localStorage.setItem('projects', projectsString);
      // addapted from http://stackoverflow.com/questions/1557602/jquery-and-ajax-response-header
      var eTag = request.getResponseHeader('Etag');
      var eTagString = JSON.stringify(eTag);
      console.log(eTagString);
      localStorage.setItem('lastEtag', eTagString);
    };
    function errorHandler(error) {
      console.log('ERROR', error);
    };
  }
};

(function(module) {
  var repoView = {};

  var repoCompiler = function(repo) {
    var template = Handlebars.compile($('#repo-template').text());
    return template(repo);
  };

  repoView.renderRepos = function() {
    $('#about ul').empty().append(
      reposObj.attributeFilter('name').map(repoCompiler)
    );
  };

  reposObj.fetchRepos(repoView.renderRepos);

  module.repoView = repoView;
})(window);

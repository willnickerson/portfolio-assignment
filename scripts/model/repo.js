(function(module){
  var reposObj = {};
  reposObj.allRepos = [];

  reposObj.fetchRepos = function(nextFunction) {
    $.ajax({
      url: 'https://api.github.com/users/willnickerson/repos',
      method: 'GET',
      headers: {
        Authorization: 'token ' + token,
      },
      success: successHandler,
      error: errorHandler
    });

    function successHandler(data) {
      reposObj.allRepos = data;
      console.log(reposObj.allRepos);
      nextFunction();
    }

    function errorHandler(error) {
      console.log('ERRORRR', error);
    }
  };

  reposObj.attributeFilter = function(attribute) {
    return reposObj.allRepos.filter(function(repo) {
      return repo[attribute];
    });
  };

  module.reposObj = reposObj;
})(window);

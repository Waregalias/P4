var app = angular.module('LoginModule', []);

app.controller('LoginController', function($scope, $http) {
  $scope.master = {};
  $scope.login = function(params) {
    $http({
      method: 'POST',
      url: '/auth/login',
      headers: {'Content-Type': 'application/x-www-form-urlencoded' },
      transformRequest: function(obj) {
          var str = [];
          for(var p in obj)
          str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
          return str.join("&");
      },
      data: {username: $scope.username, password: $scope.password}
    }).then(function successCallback(response) {
    });
  };
});

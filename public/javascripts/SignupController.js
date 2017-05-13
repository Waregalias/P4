var app = angular.module('SignupModule', []);

app.controller('SignupController', function($scope, $http) {
  $scope.master = {};
  $scope.signup = function(params) {
    $http({
      method: 'POST',
      url: '/auth/signup',
      headers: {'Content-Type': 'application/x-www-form-urlencoded' },
      transformRequest: function(obj) {
          var str = [];
          for(var p in obj)
          str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
          return str.join("&");
      },
      data: {username: $scope.username, password: $scope.password, password2: $scope.password2}
    }).then(function successCallback(response) {
    });
  };
});

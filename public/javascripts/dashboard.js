var socket = io.connect("http://localhost:3000/");
var app = angular.module('DashboardModule', ['ngCookies']);

app.controller('DashboardController', ['$scope', '$http', '$cookies', function($scope, $http, $cookies){
  $scope.master = {};

  $http({method: 'GET',url: '/list'}).then(
    function successCallback(response) {
      console.log(response);
  }, function errorCallback(response) {
      console.log(response);
  });

}]);

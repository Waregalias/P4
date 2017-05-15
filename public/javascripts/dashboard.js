/* jshint esversion:6*/
var socket = io.connect("http://localhost:3000/");
var app = angular.module('DashboardModule', ['ngCookies']);
app.config(function($interpolateProvider) {
  $interpolateProvider.startSymbol('{');
  $interpolateProvider.endSymbol('}');
});

app.controller('DashboardController', ['$scope', '$http', '$cookies', function($scope, $http, $cookies){
  $scope.master = [];
  $cookies.remove('connect.join');

  $http({method: 'GET', url: '/list'}).then(
    function successCallback(response) {
      console.log(response.data);
      for(var key in response.data) {
        if((key) !== (Object.keys(response.data[key].sockets)[0]))
          $scope.master.push(key);
      }
  });
  $scope.join = function(room) {
    $cookies.put('connect.join', room.rooms);
    window.location.href = '/game/join';
  };
}]);

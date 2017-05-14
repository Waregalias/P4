var socket = io.connect("http://localhost:3000/");
var app = angular.module('P4Module', ['ngCookies']);

app.controller('P4Controller', ['$scope', '$http', '$cookies', function($scope, $http, $cookies){
  $scope.master = {};
  $scope.currentusr = $cookies.get('connect.usr');

  socket.emit('create', $scope.currentusr);

  $scope.action = function() {
    socket.emit('action', "OK!");
  };
}]);

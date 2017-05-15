var socket = io.connect("http://localhost:3000/");
var app = angular.module('P4Module', ['ngCookies']);

app.controller('P4Controller', ['$scope', '$http', '$location', '$cookies', function($scope, $http, $location, $cookies){
  $scope.master = {};
  $scope.currentusr = $cookies.get('connect.usr');
  $scope.pId = $location.absUrl().split('/')[4];

  //console.log($cookies.get('connect.join'));

  if ($scope.pId === 'new') {
    socket.emit('create', $scope.currentusr);
  } else if ($scope.pId === 'join') {
    $scope.room = $cookies.get('connect.join');
    socket.emit('join', $scope.room);
  }


  console.log(socket);

  socket.on('action', function(msg){
      console.log(msg);
    });

  $scope.action = function() {
    socket.emit('action', "OK!");
  };
}]);

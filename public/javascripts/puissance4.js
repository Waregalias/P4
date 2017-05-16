/* jshint esversion:6*/
var socket = io.connect("http://localhost:3000/");
var app = angular.module('P4Module', ['ngCookies', 'ngSanitize']);
app.config(function($interpolateProvider) {
  $interpolateProvider.startSymbol('{');
  $interpolateProvider.endSymbol('}');
});

app.controller('P4Controller', ['$scope', '$http', '$window', '$location', '$cookies', '$sce', function($scope, $http, $window, $location, $cookies, $sce){
  $scope.master = {};
  $scope.grid = [];
  $scope.currentusr = $cookies.get('connect.usr');
  $scope.pId = $location.absUrl().split('/')[4];
  $scope.canplay = true;

  socket.on('action', function(msg){
    $scope.canplay = true;
    $scope.tour = 'C\'est à votre tour';
    $scope.$apply( function(){ $scope.grid = JSON.parse(msg); });
  });
  socket.on('leave', function(msg){
    $window.location.href = '/';
  });
  $scope.init = function() {
    if ($scope.pId === 'new') {
      socket.emit('create', $scope.currentusr);
      $scope.room = $scope.currentusr;
      $scope.pion = 'blue';
    } else if ($scope.pId === 'join') {
      $scope.room = $cookies.get('connect.join');
      socket.emit('join', $scope.room);
      $scope.pion = 'red';
    }
    for(x=0; x<6; x++) {
      $scope.grid[x] = [];
      for (y=0; y<7; y++) {
        $scope.grid[x][y] = '';
      }
    }
  };
  $scope.action = function(x) {
    let target;
    if($scope.canplay) {
      for(var i=0; i<=5; i++) {
        if($scope.grid[i][x]) {
          target = i-1;
          break;
        }
        if(i == 5) {
          target = 5;
        }
      }
      if(target >= 0) {
        //$scope.grid[target][x] = $scope.currentusr;
        $scope.grid[target][x] = $scope.pion;
        // $scope.grid[target][x] = $sce.trustAsHtml('<img src=\"/public/pictures/blue.png\" width=\"50\" height=\"50\">');
        socket.emit('action', JSON.stringify($scope.grid));
        $scope.tour = 'C\'est au tour de votre adversaire';
        $scope.canplay = false;
      }
    }
  };
  $scope.leave = function() {
    socket.emit('leave');
    socket.disconnect();
    $window.location.href = '/';
  };
}]);

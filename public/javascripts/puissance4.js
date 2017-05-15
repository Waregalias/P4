var socket = io.connect("http://localhost:3000/");
var app = angular.module('P4Module', ['ngCookies']);
app.config(function($interpolateProvider) {
  $interpolateProvider.startSymbol('{');
  $interpolateProvider.endSymbol('}');
});

app.controller('P4Controller', ['$scope', '$http', '$location', '$cookies', function($scope, $http, $location, $cookies){
  $scope.master = {};
  $scope.grid = [];
  for(x=0; x<6; x++) {
    $scope.grid[x] = [];
    for (y=0; y<7; y++) {
      $scope.grid[x][y] = false;
    }
  }
  //$scope.grid[4][4] = true;
  //console.log($scope.grid);
  var target;
  $scope.currentusr = $cookies.get('connect.usr');
  $scope.pId = $location.absUrl().split('/')[4];

  $scope.init = function() {
    if ($scope.pId === 'new') {
      socket.emit('create', $scope.currentusr);
    } else if ($scope.pId === 'join') {
      $scope.room = $cookies.get('connect.join');
      socket.emit('join', $scope.room);
    }
  };
  socket.on('action', function(msg){
    console.log(JSON.parse(msg));
    $scope.grid = JSON.parse(msg);
  });
  $scope.action = function(x) {
    // console.log(x);
    // console.log($scope.grid);
    for(var i=0; i<=5; i++) {
      // console.log(x, i);
      if($scope.grid[i][x]) {
        target = i-1;
        if(target < 0) target = 0;
        break;
      }
      if(i == 5) {
        target = 5;
      }
    }
    $scope.grid[target][x] = $scope.currentusr;
    console.log($scope.grid);
    socket.emit('action', JSON.stringify($scope.grid));
  };
}]);

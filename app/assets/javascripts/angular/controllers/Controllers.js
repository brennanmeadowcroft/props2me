props.controller('UsersController', function($scope, Restangular) {
  //$scope.users = UsersFactory.getAllUsers();
  var allUsers = Restangular.all('users');
  allUsers.getList().then(function(users) {
    $scope.users = users;
  });
});

props.controller('UserDetailController', function($scope, $routeParams, $location, Restangular) {
  var singleUser = Restangular.one('users', $routeParams.userId);
  singleUser.get().then(function(user) {
    $scope.user = user;
    $scope.goals = user.goals;
    $scope.badges = user.badges;
  });

  $scope.save = function() {
    $scope.user.put().then(function() {
      var user_path = '/users/'+$scope.user.id;
      $location.path(user_path);
    });
  };
});

props.controller('BadgesController', function($scope, $routeParams, $location) {
});

props.controller('BadgeDetailController', function($scope) {
  badge_id = $routeParams.bid-1;
  $scope.badge = badges_data[badge_id];
});

props.controller('AdminController', function($scope, $location) {
  $scope.badges = badges_data;
});

props.controller('PropsController', function($scope, $location) {

});

props.controller('PropsDetailController', function($scope, $routeParams) {
  $scope.prop = props_data[prop_id];

});

props.controller('PropsEditController', function($scope, $routeParams, Restangular) {
  var allUsers = Restangular.all('users');
  allUsers.getList().then(function(users) {
    $scope.users = users;
  });
});

props.controller('GoalsController', function($scope, $routeParams, GoalsFactory) {});

props.controller('GoalController', function($scope, $routeParams) {});

props.controller('SessionsController', function($scope, $rootScope, $location) {
  $scope.loginUser = function() {
    if($scope.credentials.user == 'brennan' && $scope.credentials.pass == 'meadowcroft') {
      $rootScope.token = '12345';
      $rootScope.permissions = 'Admin';
      $location.path('/');
    };
  };
  $scope.logoutUser = function() {
    $rootScope.token = null;
    $rootScope.permissions= null;
    $location.path('/');
  };
});

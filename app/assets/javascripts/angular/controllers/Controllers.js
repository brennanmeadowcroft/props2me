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

props.controller('PropsEditController', function($scope, $routeParams, $location, Restangular) {
  $scope.feedbackTip = false; // Set the feedbackTip to false to hide the content initially
  $scope.anonFlag = true;
  $scope.anonCheck = !$scope.anonFlag;
  $scope.formData = {};
  var allProps = Restangular.all('props');
  var oneUser = Restangular.one('users', $routeParams.uid);
  oneUser.get().then(function(user) {
    $scope.user = user;
  });
  var oneGoal = Restangular.one('goals', $routeParams.gid);
  oneGoal.get().then(function(goal) {
    $scope.goal = goal.goal;
  });
  $scope.create = function() {
//    if($scope.formData.anonymous_flag = true) { anon = 1 } else { anon = 0 }
    new_props = {
                  "goal_id": $scope.goal.id,
                  "user_id": $scope.user.id,
                  "email": $scope.formData.email,
                  "comments": $scope.formData.comments,
                  "anonymous_flag": $scope.formData.anonymous_flag
                };
    allProps.post(new_props);
    user_path = '/users/' + $scope.user.id;
    $location.path(user_path);
  };
  $scope.toggleAnon = function() {
    // Handles showing info based on user's choice of anonymity
    $scope.anonFlag = !$scope.anonFlag;
    $scope.anonCheck = !$scope.anonCheck;
  }
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

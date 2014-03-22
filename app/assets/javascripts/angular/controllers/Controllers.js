props.controller('UsersController', function($scope, Restangular) {
  //$scope.users = UsersFactory.getAllUsers();
  var allUsers = Restangular.all('users');
  allUsers.getList().then(function(users) {
    $scope.users = users;
  });
});

props.controller('UserDetailController', function($scope, $routeParams, $location, $modal, $log, Restangular) {
  var singleUser = Restangular.one('users', $routeParams.userId);

  $scope.refreshUser = function() {
    // Create this function so that I can refresh my user info at will rather than on load
    singleUser.get().then(function(user) {
      $scope.user = user;
      $scope.goals = user.goals;
      $scope.badges = user.badges;
    });
  };

  $scope.select_goal = function(goal_id) {
    $scope.selected_goal = goal_id;
  }

  $scope.open = function (goal_id) {
    var modalInstance = $modal.open({
      templateUrl: 'partials/goals/edit.html',
      controller: 'GoalDetailController',
      resolve: {
        goal: function () {
          $scope.selected_goal = goal_id;
          return $scope.selected_goal;
        }
      }
    });

    modalInstance.result.then(function () {
      // Modal closed with something returned so refresh the user information from the server
      $scope.refreshUser();
    });
  };
  $scope.save = function() {
    $scope.user.put().then(function() {
      var user_path = '/users/'+$scope.user.id;
      $location.path(user_path);
    });
  };
  // Todo: Get this working... it isn't recognizing custom put
  $scope.completeGoal = function(goal_id) {
    // Remove goal from goals and notify user

    // Mark it as complete in DB
    //var singleGoal = Restangular.one('goals', goal_id);
    //singleGoal.customPut(path='complete');
  };

  $scope.refreshUser();
});

props.controller('BadgesController', function($scope, $routeParams, $location) {
});

props.controller('BadgeDetailController', function($scope) {
  badge_id = $routeParams.bid-1;
  $scope.badge = badges_data[badge_id];
});

props.controller('PropsController', function($scope, $location) {

});

props.controller('PropsDetailController', function($scope, $routeParams) {
  $scope.prop = props_data[prop_id];

});

props.controller('PropsEditController', function($scope, $routeParams, $location, Restangular) {
  $scope.feedbackTip = false; // Set the feedbackTip to false to hide the content initially
  $scope.anonFlag = true; // Set the anonFlag to show the email form
  $scope.anonCheck = !$scope.anonFlag; // Invert the anonFlag to show a warning if the user goes anonymous
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

props.controller('GoalDetailController', function($scope, $routeParams, $location, $modalInstance, Restangular, goal) {
  $scope.goal_id = goal;
  var singleGoal = Restangular.one('goals', goal);
  singleGoal.get().then(function(goal) {
    $scope.goal = goal;
  });

  $scope.save = function() {
    $scope.goal.put().then(function() {
      $modalInstance.close($scope.goal);
    });
  };

  // Modal commands
  $scope.ok = function () {
    $modalInstance.close();
  };

  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };
});

props.controller('NewGoalController', function($scope, $routeParams, $location, Restangular) {
    $scope.user_id = $routeParams.uid;
    $scope.formData = {};
    var allGoals = Restangular.all('goals');
    $scope.create = function() {
      new_goal = {
                    "user_id": $scope.user_id,
                    "name": $scope.formData.name,
                    "description": $scope.formData.description
                  };
      allGoals.post(new_goal);
      user_path = '/users/' + $scope.user_id;
      $location.path(user_path);
    };

});

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

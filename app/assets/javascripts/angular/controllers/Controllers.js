props.controller('UsersController', function($scope, $location, Restangular, UserService, FlashService) {
  $scope.current_user = UserService.getCurrentUser();
  $scope.messages = FlashService.getMessages();
  $scope.new_user = {};
  $scope.form_submitted = false;

  var allUsers = Restangular.all('users');
  allUsers.getList().then(function(users) {
    $scope.users = users;
  });

  $scope.add = function() {
    if($scope.signup.$valid) {
      var user_params = {"user":$scope.new_user};
      allUsers.customPOST(elem=user_params).then(function(user) {
        var user_path = '/users/'+user.vanity_url;
        FlashService.flash('Welcome to Props2Me, ' + user.first_name + '!');

        UserService.setUserAuthentication(true);
        // Set the current user for use around the app
        console.log(user);
        UserService.setCurrentUser(user);
        $location.path(user_path);
      });
    }
    else {
      $scope.form_submitted = true;
    }
  };
});

props.controller('UserDetailController', function($scope, $routeParams, $location, $modal, $log, Restangular, UserService, FlashService) {
  $scope.credentials = {};
  $scope.messages = FlashService.getMessages();
  $scope.current_user = UserService.getCurrentUser();
  var singleUser = Restangular.one('users', $routeParams.userId);
  $scope.url_id = $routeParams.userId;
  $scope.form_submitted = false;

  $scope.refreshUser = function() {
    // Create this function so that I can refresh my user info at will rather than on load
    singleUser.get({'Authorization':'Token', 'access_token':$scope.current_user.api_token}).then(function(user) {
      $scope.user = user;
      $scope.goals = user.goals;
      $scope.badges = user.badges;
    });
  };

  $scope.isAllowed = function(permissions) {
    return UserService.isPermitted(permissions, $routeParams.userId);
  }

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
    if($scope.edit_user.$valid) {
      $scope.user.put({'Authorization':'Token', 'access_token':$scope.current_user.api_token}).then(function() {
        FlashService.flash('User Saved Successfully');
        var user_path = '/users/'+$scope.user.vanity_url;
        $location.path(user_path);
      });
    }
    else {
      $scope.form_submitted = true;
    }
  };
  $scope.changePassword = function() {
    if($scope.change_pass.$valid) {
      var new_creds = {"email":$scope.user.email,
                      "old_password":$scope.credentials.old_password,
                      "password":$scope.credentials.new_password,
                      "password_confirmation":$scope.credentials.new_password_confirmation};

      var password_path = 'change_password';
      console.log($scope.current_user.api_token);
      singleUser.customPUT(elem=new_creds, path=password_path, headers={'Authorization':'Token', 'access_token':$scope.current_user.api_token}).then(function() {
        FlashService.flash('Password Changed');
        var user_path = '/users/'+$scope.user.vanity_url;
        $location.path(user_path);
      });
    }
    else {
      $scope.form_submitted = true;
    }
  }
  // Todo: Get this working... it isn't recognizing custom put
  $scope.completeGoal = function(goal_id) {
    // Remove goal from goals and notify user

    // Mark it as complete in DB
    //var singleGoal = Restangular.one('goals', goal_id);
    //singleGoal.customPut(path='complete');
  };

  $scope.refreshUser();
});

props.controller('BadgesController', function($scope, $routeParams, $location, UserService, FlashService) {
  $scope.current_user = UserService.getCurrentUser();
});

props.controller('BadgeDetailController', function($scope, UserService, FlashService) {
  $scope.current_user = UserService.getCurrentUser();
  badge_id = $routeParams.bid-1;
  $scope.badge = badges_data[badge_id];
});

props.controller('PropsController', function($scope, $location, UserService, FlashService) {
  $scope.current_user = UserService.getCurrentUser();
});

props.controller('PropsDetailController', function($scope, $routeParams, UserService, FlashService) {
  $scope.current_user = UserService.getCurrentUser();
  $scope.prop = props_data[prop_id];
});

props.controller('PropsEditController', function($scope, $routeParams, $location, Restangular, UserService, FlashService) {
  $scope.current_user = UserService.getCurrentUser();
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
    $scope.goal = goal;
  });
  $scope.create = function(form_data) {
    new_props = {
                  "goal_id": $scope.goal.id,
                  "user_id": $scope.user.id,
                  "email": $scope.formData.email,
                  "comments": $scope.formData.comments,
                  "anonymous_flag": $scope.formData.anonymous_flag
                };
    allProps.post(new_props);
    FlashService.flash('Props Added!  Thanks!');
    user_path = '/users/' + $scope.user.vanity_url;
    $location.path(user_path);
  };
  $scope.toggleAnon = function() {
    // Handles showing info based on user's choice of anonymity
    $scope.anonFlag = !$scope.anonFlag;
    $scope.anonCheck = !$scope.anonCheck;
  }
});

props.controller('GoalDetailController', function($scope, $routeParams, $location, $modalInstance, Restangular, UserService, goal, FlashService) {
  $scope.current_user = UserService.getCurrentUser();
  // Goal is passed when the modal window is created
  $scope.goal_id = goal;
  var singleGoal = Restangular.one('goals', goal);
  singleGoal.get().then(function(goal) {
    $scope.goal = goal;
  });

  $scope.save = function() {
    $scope.goal.put({'Authorization':'Token', 'access_token':$scope.current_user.api_token}).then(function() {
      $modalInstance.close($scope.goal);
      FlashService.flash('Saved!')
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

props.controller('UserGoalDetailController', function($scope, $routeParams, $location, Restangular, UserService, FlashService) {
  $scope.current_user = UserService.getCurrentUser();
  var singleGoal = Restangular.one('goals', $routeParams.goalId);
  singleGoal.get().then(function(goal) {
    $scope.goal = goal;
  });

  $scope.isAllowed = function(permissions) {
    return UserService.isPermitted(permissions, $routeParams.userId);
  }

  $scope.save = function() {
    $scope.goal.put({'Authorization':'Token', 'access_token':$scope.current_user.api_token}).then(function() {
      FlashService.flash('Saved!')
    });
  };
});

props.controller('NewGoalController', function($scope, $routeParams, $location, Restangular, UserService, FlashService) {
    $scope.current_user = UserService.getCurrentUser();
    $scope.user_id = $routeParams.userId;
    $scope.formData = {};
    $scope.form_submitted = false;

    var singleUser = Restangular.one('users', $routeParams.userId);
    singleUser.get({'Authorization':'Token', 'access_token':$scope.current_user.api_token}).then(function(user) {
      $scope.user = user;
    });

    var allGoals = Restangular.all('goals');
    $scope.create = function() {
      if($scope.goal_form.$valid) {
        new_goal = {
                      "user_id": $scope.user.id,
                      "name": $scope.formData.name,
                      "description": $scope.formData.description
                    };
        allGoals.post(new_goal, headers={'Authorization':'Token', 'access_token':$scope.current_user.api_token});
        FlashService.flash('Goal Created Successfully!');
        user_path = '/users/' + $scope.current_user.vanity_url;
        $location.path(user_path);
      }
      else {
        $scope.form_submitted = true;
      }
    };

});

props.controller('LoginController', function($scope, $location, Restangular, UserService, FlashService) {
  $scope.messages = FlashService.getMessages();
  $scope.current_user = UserService.getCurrentUser();
  $scope.credentials = {};
  $scope.authenticated = function() {
    return UserService.getUserAuthentication();
  }
  $scope.admin = function() {
    return UserService.getUserAuthentication() && UserService.getUserAdmin();
  }
  $scope.loginUser = function() {
    var singleUser = Restangular.allUrl('users', '/login');
    singleUser.post({"email":$scope.credentials.email, "password":$scope.credentials.password}).then(function(user) {
      // Set the authentication
      UserService.setUserAuthentication(true);
      // Set the current user for use around the app
      UserService.setCurrentUser(user);
      $scope.current_user = user;
      FlashService.flash('Welcome Back, '+user.first_name);

      user_path = '/users/'+$scope.current_user.vanity_url
      $location.path(user_path);
    }, function(response) {
      // There was a problem logging in... notify the user
      if(response.status == 401) {
        alert("That email/password combo is incorrect.  Please try again.");
      }
    });
  };
  $scope.logoutUser = function() {
    UserService.logoutUser();
    FlashService.flash('Logged Out!  See you later!');
    $location.path('/');
  };
});

//props.controller('SessionsController', function($scope) {});

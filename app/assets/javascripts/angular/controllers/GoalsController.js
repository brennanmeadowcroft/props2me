props.controller('GoalsController', function($scope, $routeParams, GoalsFactory) {
  $scope.userGoals = function(user_id) {
    revised_id = user_id-1;  // This will change with an actual DB
    return GoalsFactory.userGoals(revised_id);
  };
});

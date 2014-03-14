props.controller('UsersController', function($scope, $routeParams, UsersFactory) {
//  $scope.users = user_data;
  $scope.users = UsersFactory.query();
  $scope.user = UsersFactory.get({'id':$routeParams.userId});
//  $scope.user = user_data[user_id];
//  $scope.goals = goals_data[user_id];
});

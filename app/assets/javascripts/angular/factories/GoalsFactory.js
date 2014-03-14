props.factory('GoalsFactory', ['$resource', function($resource) {
  return $resource('api/goals/:id.json',
    { id: '@id' }
  );
  // factory = {};
  // goals = goals_data;
  //
  // factory.userGoals = function(user_id) {
  //   return goals[user_id];
  // }
  // factory.createGoal = function() {}
  // factory.deleteGoal = function() {}
  // factory.updateGoal = function() {}
  //
	// return factory;
}]);

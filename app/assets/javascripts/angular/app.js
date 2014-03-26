var props = angular.module('props', ['ngRoute', 'ngResource', 'restangular', 'ui.bootstrap', 'props-flash', 'user']);

props.config(['$routeProvider',
  function($routeProvider, RestangularProvider) {
    $routeProvider.
      when('/users/all', {
        templateUrl: 'partials/users/users.html',
        controller: 'UsersController',
        requirePermissions: 'admin'
      }).
      when('/users/new', {
        templateUrl: 'partials/users/new.html',
        controller: 'UsersController',
        requirePermissions: 'public'
      }).
      when('/users/:userId', {
        templateUrl: 'partials/users/show.html',
        controller: 'UserDetailController',
        requirePermissions: 'public'
      }).
      when('/users/:userId/edit', {
        templateUrl: 'partials/users/edit.html',
        controller: 'UserDetailController',
        requirePermissions: 'owner_or_admin'
      }).
      when('/users/:userId/change_pass', {
        templateUrl: 'partials/users/change_pass.html',
        controller: 'UserDetailController',
        requirePermissions: 'owner'
      }).
      when('/admin', {
        templateUrl: 'partials/admin/home.html',
        controller: 'AdminController',
        requirePermissions: 'admin'
      }).
      when('/badges/', {
        templateUrl: 'partials/badges/show.html',
        controller: 'BadgesController',
        requirePermissions: 'admin'
      }).
      when('/badges/:badgeId/edit', {
        templateUrl: 'partials/badges/edit.html',
        controller: 'BadgesController',
        requirePermissions: 'admin'
      }).
      when('/badges/new', {
        templateUrl: 'partials/badges/new.html',
        controller: 'BadgesController',
        requirePermissions: 'admin'
      }).
      when('/props/new', {
        templateUrl: 'partials/props/new.html',
        controller: 'PropsEditController',
        requirePermissions: 'public'
      }).
      when('/users/:userId/goals/new', {
        templateUrl: 'partials/goals/new.html',
        controller: 'NewGoalController',
        requirePermissions: 'owner'
      }).
      when('/users/:userId/goals/:goalId', {
        templateUrl: 'partials/goals/show.html',
        controller: 'UserGoalDetailController',
        requirePermissions: 'owner'
      }).
      when('/users/:userId/goals/:goalId/edit', {
        templateUrl: 'partials/goals/edit.html',
        controller: 'GoalDetailController',
        requirePermissions: 'owner'
      }).
      when('/login', {
        templateUrl: 'partials/sessions/new.html',
        controller: 'LoginController',
        requirePermissions: 'public'
      }).
      otherwise({
        redirectTo: '/login'
      })
  }
]);

props.run(['$rootScope', 'UserService', '$location', '$route', 'FlashService', function($rootScope, UserService, $location, $route, FlashService){
  // Everytime the route in our app changes check auth status
  $rootScope.$on("$routeChangeStart", function(event, next, current, requirePermissions) {
    user_id = null;
    user_id = next.pathParams.userId;
    if(!UserService.isPermitted(next.requirePermissions, user_id)) {
      $location.path('/login');
    }
  });
}]);

props.config(function(RestangularProvider) {
  RestangularProvider.setBaseUrl('/api');
  RestangularProvider.setResponseInterceptor(
    function(data, operation, what) {
      if (operation == 'getList') {
        return data[what];
      }
      return data;
  });
});

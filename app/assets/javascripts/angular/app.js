var props = angular.module('props', ['ngRoute', 'ngResource', 'restangular', 'ui.bootstrap']);

props.config(['$routeProvider',
  function($routeProvider, RestangularProvider) {
    $routeProvider.
      when('/', {
        templateUrl: 'partials/users/users.html',
        controller: 'UsersController'
      }).
      when('/users/new', {
        templateUrl: 'app/partials/users/new.html',
        controller: 'UsersController'
      }).
      when('/users/:userId', {
        templateUrl: 'partials/users/show.html',
        controller: 'UserDetailController'
      }).
      when('/users/:userId/edit', {
        templateUrl: 'partials/users/edit.html',
        controller: 'UserDetailController'
      }).
      when('/users/:userId/change_pass', {
        templateUrl: 'partials/users/change_pass.html',
        controller: 'UserDetailController'
      }).
      when('/admin', {
        templateUrl: 'partials/admin/home.html',
        controller: 'AdminController'
      }).
      when('/badges/', {
        templateUrl: 'partials/badges/show.html',
        controller: 'BadgesController'
      }).
      when('/badges/:badgeId/edit', {
        templateUrl: 'partials/badges/edit.html',
        controller: 'BadgesController'
      }).
      when('/badges/new', {
        templateUrl: 'partials/badges/new.html',
        controller: 'BadgesController'
      }).
      when('/props/new', {
        templateUrl: 'partials/props/new.html',
        controller: 'PropsEditController'
      }).
      when('/goals/new', {
        templateUrl: 'partials/goals/new.html',
        controller: 'NewGoalController'
      }).
      when('/goals/:goalId', {
        templateUrl: 'partials/goals/show.html',
        controller: 'GoalDetailController'
      }).
      when('/goals/:goalId/edit', {
        templateUrl: 'partials/goals/edit.html',
        controller: 'GoalDetailController'
      }).
      when('/login', {
        templateUrl: 'partials/sessions/new.html',
        controller: 'SessionsController'
      }).
      otherwise({
        redirectTo: '/'
      });
  }
]);

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

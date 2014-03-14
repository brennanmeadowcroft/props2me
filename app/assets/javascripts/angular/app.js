var props = angular.module('props', ['ngRoute', 'ngResource']);

props.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/', {
        templateUrl: 'partials/users/users.html',
        controller: 'UsersController'
      }).
      when('/users/:userId', {
        templateUrl: 'partials/users/show.html',
        controller: 'UsersController'
      }).
      otherwise({
        redirectTo: '/'
      });
  }]);

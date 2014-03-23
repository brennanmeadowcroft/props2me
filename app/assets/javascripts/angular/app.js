var props = angular.module('props', ['ngRoute', 'ngResource', 'restangular', 'ui.bootstrap', 'auth', 'login', 'user']);

props.config(['$routeProvider',
  function($routeProvider, RestangularProvider) {
    $routeProvider.
      when('/', {
        templateUrl: 'partials/users/users.html',
        controller: 'UsersController',
        requireLogin: false
      }).
      when('/users/new', {
        templateUrl: 'app/partials/users/new.html',
        controller: 'UsersController',
        requireLogin: false
      }).
      when('/users/:userId', {
        templateUrl: 'partials/users/show.html',
        controller: 'UserDetailController',
        requireLogin: false
      }).
      when('/users/:userId/edit', {
        templateUrl: 'partials/users/edit.html',
        controller: 'UserDetailController',
        requireLogin: true
      }).
      when('/users/:userId/change_pass', {
        templateUrl: 'partials/users/change_pass.html',
        controller: 'UserDetailController',
        requireLogin: true
      }).
      when('/admin', {
        templateUrl: 'partials/admin/home.html',
        controller: 'AdminController',
        requireLogin: true
      }).
      when('/badges/', {
        templateUrl: 'partials/badges/show.html',
        controller: 'BadgesController',
        requireLogin: true
      }).
      when('/badges/:badgeId/edit', {
        templateUrl: 'partials/badges/edit.html',
        controller: 'BadgesController',
        requireLogin: true
      }).
      when('/badges/new', {
        templateUrl: 'partials/badges/new.html',
        controller: 'BadgesController',
        requireLogin: true
      }).
      when('/props/new', {
        templateUrl: 'partials/props/new.html',
        controller: 'PropsEditController',
        requireLogin: false
      }).
      when('/goals/new', {
        templateUrl: 'partials/goals/new.html',
        controller: 'NewGoalController',
        requireLogin: true
      }).
      when('/goals/:goalId', {
        templateUrl: 'partials/goals/show.html',
        controller: 'GoalDetailController',
        requireLogin: false
      }).
      when('/goals/:goalId/edit', {
        templateUrl: 'partials/goals/edit.html',
        controller: 'GoalDetailController',
        requireLogin: true
      }).
      when('/login', {
        templateUrl: 'partials/sessions/new.html',
        controller: 'LoginController',
        requireLogin: false
      }).
      otherwise({
        redirectTo: '/'
      })
  }
]);

props.run(['$rootScope', 'UserService', '$location', function($rootScope, UserService, $location){
  // Everytime the route in our app changes check auth status
  $rootScope.$on("$routeChangeStart", function(event, next, current) {
      // if you're logged out send to login page.
      if (next.requireLogin && !UserService.getUserAuthentication()) {
          $location.path('/login');
          // Keep angular from completing the intended route
          event.preventDefault();
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

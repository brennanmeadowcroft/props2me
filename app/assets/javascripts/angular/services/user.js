angular.module('user', [])
.service('UserService', [function() {
  var user = {};
  var is_authenticated = false;

  this.getUserAuthentication = function() {
    return is_authenticated;
  };
  this.setUserAuthentication = function(value) {
    is_authenticated = value;
  };
  this.setCurrentUser = function(values) {
    user.first_name = values.first_name;
    user.last_name = values.last_name;
    user.email = values.email;
    user.id = values.id;
    user.api_token = values.user_api_key.access_token;
  }
  this.logoutUser = function() {
    is_authenticated = false;
    user = {};
  };
  this.verifyUser = function() {
    /*
      Make request to server to verify user id and token
    */
  };
  this.getCurrentUser = function() {
    return user;
  };

  return this;
}]);

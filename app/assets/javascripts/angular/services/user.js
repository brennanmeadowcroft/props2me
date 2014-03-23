angular.module('user', [])
.service('UserService', [function() {
  var user = {};
  var is_authenticated = false;
  var is_admin = false;

  this.isPermitted = function(role_required, user_id) {
    switch(role_required) {
      case 'public':
        return true;
        break;
      case 'owner':
        if(is_authenticated && this.isOwner(user_id)) { return true; } else { return false; }
        break;
      case 'owner_or_admin':
        if(is_authenticated && (is_admin || this.isOwner(user_id))) { return true; } else { return false; }
        break;
      case 'admin':
        return (is_admin && is_authenticated);
        break;
      default: return false;
    }
  }
  this.isOwner = function(user_id) {
    if(is_authenticated && user.id == user_id) { return true; } else { return false; }
  }
  this.getUserAuthentication = function() {
    return is_authenticated;
  };
  this.setUserAuthentication = function(value) {
    is_authenticated = value;
  };
  this.getUserAdmin = function() {
    return is_admin;
  }
  this.setCurrentUser = function(values) {
    user.first_name = values.first_name;
    user.last_name = values.last_name;
    user.email = values.email;
    user.id = values.id;
    user.api_token = values.user_api_key.access_token;
    if(values.admin == 1) { is_admin = true } else { is_admin = false }
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

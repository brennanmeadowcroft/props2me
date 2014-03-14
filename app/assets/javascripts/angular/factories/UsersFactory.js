props.factory('UsersFactory', ['$resource', function($resource) {
    return $resource("api/users/:id.json",
      { id: "@id" }
    );
    // factory = {};
    // users = user_data;
    //
    // factory.getAllUsers = function() {
    //   // This will provide information about the user for the index page
    //   return $resource('api/users.json', {}, {
    //     query: {method:'GET', isArray:true}
    //   });
    // };
    // factory.getUser = function(user_id) {
    //   return users[user_id];
    // };
    // factory.createUser = function() {};
    // factory.updateUser = function() {};
    // factory.deleteUser = function() {};
    //
    // return factory;
}]);

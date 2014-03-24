angular.module('props-flash', [])
.service('FlashService', [function() {
  var messages = [];

  this.flash = function(message, style) {
    if(!style) { style = 'success' }
    new_message = { 'text': message, 'style': 'alert alert-'+style };
    messages.push(new_message);
  }
  this.getMessages = function() {
    displayed_messages = messages;
    messages = [];
    console.log(displayed_messages);
    return displayed_messages;
  }

  return this;
}]);

define(function (require) {
  var Backbone = require('backbone');

  var Session = Backbone.Model.extend({
    defaults: {
      username: null
    },

    login: function (options) {
      var username = options.username;
      var password = options.password;
      var success = options.success;
      var error = options.error;

      // assume login success
      this.set('username', username);
      success();
      this.trigger('login', username);
    },

    logout: function(options) {
      var username = this.get('username');
      this.set('username', null);
      this.trigger('logout', username);
    },

    getUserName: function () {
      return this.get('username');
    },

    isLoggedIn: function () {
      return this.getUserName() !== null;
    }
  });

  return window.session = new Session();
});

define(function (require) {
  var _        = require('underscore');
  var Backbone = require('backbone');
  var api      = require('api');
  var template = require('text!templates/login.html');
  var session  = require('models/session');

  var LoginView = Backbone.View.extend({
    template: _.template(template),

    className: 'login',

    events: {
      'click .close-button': 'close',
      'click .login-button': 'login',
    },

    render: function () {
      if ($('.login').length) {
        return this;
      }

      var self = this;
      this.$el.html(this.template());
      $('body').append(this.$el.fadeIn());

      return this;
    },


    close: function () {
      var self = this;
      this.$el.fadeOut(function () {
        self.remove();
      });
    },

    login: function () {
      var userName= this.$('.login-username').val();
      var password = this.$('.login-password').val();
      session.login({
        username: userName,
        password: password,
        success: function () {},
        error: function () {}
      });
      var self = this;
      this.$el.fadeOut(function () {
        self.remove();
      });
    }

  });

  return LoginView;
});























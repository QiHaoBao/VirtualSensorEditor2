define(function (require) {
  var _        = require('underscore');
  var Backbone = require('backbone');
  var template = require('text!templates/navbar.html');
  var session  = require('models/session');
  var LoginView   = require('views/login');

  var NavbarView = Backbone.View.extend({
    template: _.template(template),

    events: {
      'click .nav-team': 'navigateToTeam',
      'click .nav-home': 'navigateToHome',
      'click .nav-login': 'login',
      'click .nav-logout': 'logout',
    },

    initialize: function () {
      this.listenTo(session, 'login', this.render);
      this.listenTo(session, 'logout', this.render);
    },

    render: function () {
      this.$el.html(this.template({
        session: session
      }));
      return this;
    },

    navigateToTeam: function () {
      this.trigger('nav', 'team');
      return false;
    },

    navigateToHome: function () {
      this.trigger('nav', 'home');
      return false;
    },

    login: function () {
      var view = new LoginView({
        model: this.model
      });
      view.render();
      return false;
    },

    logout: function () {
      session.logout();
    },
  });

  return NavbarView;
});

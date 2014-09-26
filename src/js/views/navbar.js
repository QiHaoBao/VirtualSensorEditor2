define(function (require) {
  var _        = require('underscore');
  var Backbone = require('backbone');
  var template = require('text!templates/navbar.html');

  var NavbarView = Backbone.View.extend({
    template: _.template(template),

    events: {
      'click .nav-team': 'navigateToTeam',
      'click .nav-home': 'navigateToHome'
    },

    render: function () {
      this.$el.html(this.template());
      return this;
    },

    navigateToTeam: function () {
      this.trigger('nav', 'team');
      return false;
    },

    navigateToHome: function () {
      this.trigger('nav', 'home');
      return false;
    }
  });

  return NavbarView;
});

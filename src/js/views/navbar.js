define(function (require) {
  var _        = require('underscore');
  var Backbone = require('backbone');
  var template = require('text!templates/navbar.html');

  var NavbarView = Backbone.View.extend({
    template: _.template(template),

    render: function () {
      this.$el.html(this.template());
      return this;
    }
  });

  return NavbarView;
});

define(function (require) {
  var _                  = require('underscore');
  var Backbone           = require('backbone');
  var template           = require('text!templates/team.html');

  var TeamView = Backbone.View.extend({
    template: _.template(template),

    render: function () {
      this.$el.html(this.template());
      return this;
    }
  });

  return TeamView;
});
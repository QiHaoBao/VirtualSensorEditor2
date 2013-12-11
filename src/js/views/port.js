define(function (require) {
  var _        = require('underscore');
  var Backbone = require('backbone');
  var template = require('text!templates/port.html');

  var PortView = Backbone.View.extend({
    tagName: 'li',
    className: 'port',
    template: _.template(template),

    initialize: function (options) {
      this.paper = options.paper;
    },

    render: function () {
      this.$el.html(this.template(this.model.attributes));
      return this;
    }
  });

  return PortView;
});

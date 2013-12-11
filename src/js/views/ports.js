define(function (require) {
  var _        = require('underscore');
  var Backbone = require('backbone');
  var PortView = require('views/port');
  var template = require('text!templates/ports.html');

  var PortsView = Backbone.View.extend({
    template: _.template(template),

    initialize: function (options) {
      this.paper = options.paper;
    },

    render: function () {
      // render template
      this.$el.html(this.template());

      // render ports
      this.collection.each(this.add, this);
    },

    add: function (model) {
      var view = new PortView({
        model: model,
        paper: this.paper
      });
      view.render().$el.appendTo(this.$el);
    }
  });

  return PortsView;
});

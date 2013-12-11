define(function (require) {
  var _        = require('underscore');
  var Backbone = require('backbone');
  var template = require('text!templates/port.html');

  var PortView = Backbone.View.extend({
    template: _.template(template),

    render: function () {
      this.$el.html(this.template(this.model.attributes));
      return this;
    }
  });

  return PortView;
});

define(function (require) {
  var _             = require('underscore');
  var Backbone      = require('backbone');
  var ProcessorView = require('views/processor');

  var PhysicalSensorView = ProcessorView.extend({
    initialize: function (options) {
      ProcessorView.prototype.initialize.call(this, options);
    },

    render: function () {
      ProcessorView.prototype.render.call(this);
      this.$('.body').text(this.model.getValue());
      return this;
    }
  });

  return PhysicalSensorView;
});

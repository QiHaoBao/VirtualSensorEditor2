define(function (require) {
  var _ = require('underscore');
  var Backbone = require('backbone');
  var Processor = require('models/processor');

  var PhysicalSensor = Processor.extend({
    initialize: function () {
      Processor.prototype.initialize.call(this);
      this.addOutputPort('out');
    },

    getDeviceId: function () {
      return this.get('deviceId');
    },

    getType: function () {
      return this.get('type');
    },

    getValue: function () {
      return this.getOutputPortValue('out');
    },

    setValue: function (value) {
      this.setOutputPortValue('out', value);
    }
  });

  return PhysicalSensor;
});

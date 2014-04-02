define(function (require) {
  var _ = require('underscore');
  var Backbone = require('backbone');
  var Processor = require('models/processor');

  /**
   * @class VirtualSensor
   * @extends Processor
   */
  var VirtualSensor = Processor.extend(
    /** @lends VirtualSensor.prototype */
    {
    initialize: function () {
      Processor.prototype.initialize.call(this);
    },

    /**
     * Get the value of the sensor.
     *
     * @public
     * @method
     * @returns {*}
     */
    getValue: function () {
      return this.getOutputPortValue('out');
    }
  });

  return VirtualSensor;
});

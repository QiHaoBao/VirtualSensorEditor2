define(function (require) {
  var _ = require('underscore');
  var Backbone = require('backbone');
  var Processor = require('models/processor');

  /**
   * @class Physicalsensor
   * @classdesc A PhysicalSensor is a processor which has no input ports and
   *   has exactly one output port named 'out'.
   *   It also has a device id and sensor type.
   */
  var PhysicalSensor = Processor.extend({
    /**
     * @constructs Physicalsensor
     */
    initialize: function () {
      Processor.prototype.initialize.call(this);
      this.addOutputPort('out');
    },

    /**
     * Get the device id of the sensor.
     *
     * @public
     * @method
     * @returns {String}
     */
    getDeviceId: function () {
      return this.get('deviceId');
    },

    /**
     * Get the type of the sensor.
     *
     * @public
     * @method
     * @returns {String}
     */
    getType: function () {
      return this.get('type');
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
    },

    /**
     * Set the value of the sensor.
     *
     * @public
     * @method
     * @param {*} value
     */
    setValue: function (value) {
      this.setOutputPortValue('out', value);
    }
  });

  return PhysicalSensor;
});

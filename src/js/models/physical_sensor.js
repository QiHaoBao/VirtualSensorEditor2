define(function (require) {
  var _ = require('underscore');
  var Backbone = require('backbone');
  var Processor = require('models/processor');

  var PhysicalSensor = Processor.extend(
    /** @lends PhysicalSensor.prototype */
    {

    /**
     * @class Physicalsensor
     * @classdesc A PhysicalSensor is a processor which has no input ports and
     *   has exactly one output port named 'out'.
     *   It also has a device id and sensor type.
     * @extends Processor
     */
    initialize: function () {
      Processor.prototype.initialize.call(this);
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
      return this.getOutputPortValue();
    },

    /**
     * Set the value of the sensor.
     *
     * @public
     * @method
     * @param {*} value
     */
    setValue: function (value) {
      this.set('activity', function () {
        return value;
      });
    }
  });

  return PhysicalSensor;
});

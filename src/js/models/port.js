define(function (require) {
  var _        = require('underscore');
  var Backbone = require('backbone');

  /**
   * @class Port
   * @classdesc A Port can be either an input port, where data flows in,
   *   or an output port, where data flows out.
   */
  var Port = Backbone.Model.extend({
    /**
     * @constructs Port
     */
    initialize: function () {
      var processor = this.getProcessor();
      this.listenTo(processor, 'change:x', this.triggerChangePosition);
      this.listenTo(processor, 'change:y', this.triggerChangePosition);
    },

    /**
     * Trigger an position change event.
     *
     * @private
     * @method
     */
    triggerChangePosition: function () {
      this.trigger('change:position');
    },

    /**
     * Get the processor to which this port belongs.
     *
     * @public
     * @method
     * @returns {Processor}
     */
    getProcessor: function () {
      return this.get('processor');
    },

    /**
     * Get the type of this port.
     * Can either be 'input' or 'output'.
     *
     * @public
     * @method
     * @returns {String}
     */
    getType: function () {
      return this.get('type');
    },

    /**
     * Get the name of the port.
     *
     * @public
     * @method
     * @returns {String}
     */
    getName: function () {
      return this.get('name');
    },

    /**
     * Set the name of the port.
     *
     * @public
     * @method
     * @param {String} name
     */
    setName: function (name) {
      this.set('name', name);
    },

    /**
     * Get the value of the port.
     *
     * @public
     * @method
     * @returns {*}
     */
    getValue: function () {
      return this.get('value');
    },

    /**
     * Set the value of the port.
     *
     * @public
     * @method
     * @param {*} value
     */
    setValue: function (value) {
      this.set('value', value);
    }
  });

  return Port;
});

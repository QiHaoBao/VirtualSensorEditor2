define(function (require) {
  var _          = require('underscore');
  var Backbone   = require('backbone');
  var Port       = require('models/port');
  var Ports      = require('collections/ports');

  /**
   * @class Processor
   * @classdesc A Processor is an node in the dataflow diagram. It can 
   *   have an arbitrary number of input ports where data flows in 
   *   and exactly one output port where data flows out.
   *   It can also have an activity which is responsible for updating
   *   the value of the output port based on the values in the input
   *   ports using custom logics.
   */
  var Processor = Backbone.Model.extend({
    defaults: {
      name: 'untitled',
      x: 0,
      y: 0,
      activity: function () { return null; }
    },

    /**
     * @constructs Processor
     */
    initialize: function () {
      this.inputPorts = new Ports();
      this.outputPort = new Port({
        type: 'output',
        name: 'out',
        processor: this
      });

      this.listenTo(this.inputPorts, 'change:value', function (port) {
        this.trigger('change:input-port-value', port);
      });
      this.listenTo(this.outputPort, 'change:value', function (port) {
        this.trigger('change:output-port-value', port);
      });
    },

    /**
     * Get the dataflow to which this processor belongs.
     *
     * @public
     * @method
     * @returns {DataFlow}
     */
    getDataflow: function () {
      return this.get('dataflow');
    },

    /**
     * Set the dataflow to which this processor belongs.
     *
     * @public
     * @method
     * @param {DataFlow} dataflow
     */
    setDataflow: function (dataflow) {
      this.set('dataflow', dataflow);
    },

    /**
     * Get the input ports of the processor.
     *
     * @public
     * @method
     * @returns {Ports}
     */
    getInputPorts: function () {
      return this.inputPorts;
    },

    /**
     * Get the output ports of the processor.
     *
     * @public
     * @method
     * @returns {Port}
     */
    getOutputPort: function () {
      return this.outputPort;
    },

    /**
     * Add an input port to the processor.
     *
     * @public
     * @method
     * @param {String} name Name of input port
     */
    addInputPort: function (name) {
      var port = new Port({
        type: 'input',
        name: name,
        processor: this
      });
      this.inputPorts.add(port);
    },

    /**
     * Get an input port stored in the processor by its name.
     *
     * @public
     * @method
     * @param {String} name Name of input port.
     * @returns {Port}
     */
    getInputPort: function (name) {
      return this.inputPorts.findWhere({name: name });
    },

    /**
     * Find an input port in the processor by its name and set its value.
     *
     * @public
     * @method
     * @param {String} name Name of input port.
     * @param {*} value Value to be set.
     */
    setInputPortValue: function (portName, value) {
      var port = this.inputPorts.findWhere({name: portName});
      if (port) {
        port.setValue(value);
      } else {
        throw new Error('No such port named ' + portName);
      }
    },

    /**
     * Set the value of the output port.
     *
     * @public
     * @method
     * @param {*} value Value to be set.
     */
    setOutputPortValue: function (value) {
      this.outputPort.setValue(value);
    },

    /**
     * Find an input port in the processor by its name and get its value.
     *
     * @public
     * @method
     * @param {String} name Name of input port.
     * @returns {*}
     */
    getInputPortValue: function (portName) {
      return this.inputPorts.findWhere({name: portName}).getValue();
    },

    /**
     * Get the value of the output port.
     *
     * @public
     * @method
     * @returns {*}
     */
    getOutputPortValue: function () {
      return this.outputPort.getValue();
    },

    setActivity: function (activity) {
      this.set('activity', activity);
    },

    /**
     * Update the values of the output ports using the values of the input port
     * and the logics of the activities.
     *
     * @public
     * @method
     */
    updateOutputPortValue: function () {
      var args = this.inputPorts.map(function (port) {
        return port.getValue();
      });
      var value = this.get('activity').apply(this, args);
      this.outputPort.setValue(value);
    },

    /**
     * Get the x coordinate of the processor.
     *
     * @public
     * @method
     * @returns {Number}
     */
    getX: function () {
      return this.get('x');
    },

    /**
     * Set the x coordinate of the processor.
     *
     * @public
     * @method
     * @param {Number} x
     */
    setX: function (x) {
      this.set('x', x);
    },

    /**
     * Get the y coordinate of the processor.
     *
     * @public
     * @method
     * @returns {Number}
     */
    getY: function () {
      return this.get('y');
    },

    /**
     * Set the y coordinate of the processor.
     *
     * @public
     * @method
     * @param {Number} y
     */
    setY: function () {
      this.set('y');
    },

    /**
     * Set the position of the processor.
     *
     * @public
     * @method
     * @param {Number} x
     * @param {Number} y
     */
    setPosition: function (x, y) {
      this.set({
        x: x,
        y: y
      });
    }
  });

  return Processor;
});

define(function (require) {
  var _          = require('underscore');
  var Backbone   = require('backbone');
  var Port       = require('models/port');
  var Ports      = require('collections/ports');
  var Activity   = require('models/activity');
  var Activities = require('collections/activities');

  /**
   * @class Processor
   * @classdesc A Processor is an node in the dataflow diagram. It can 
   *   have an arbitrary number of ports where data flows in and out. 
   *   It can also have activities which are responsible for updating
   *   the values of the output ports based on the values in the input
   *   ports using custom logics.
   */
  var Processor = Backbone.Model.extend({
    defaults: {
      x: 0,
      y: 0
    },

    /**
     * @constructs Processor
     */
    initialize: function () {
      this.inputPorts = new Ports();
      this.outputPorts = new Ports();
      this.activities = new Activities();

      this.listenTo(this.inputPorts, 'change:value', function (port) {
        this.trigger('change:input-port-value', port);
      });
      this.listenTo(this.outputPorts, 'change:value', function (port) {
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
     * @returns {Ports}
     */
    getOutputPorts: function () {
      return this.outputPorts;
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
     * Add an output port to the processor.
     *
     * @public
     * @method
     * @param {String} name Name of output port
     */
    addOutputPort: function (name) {
      var port = new Port({
        type: 'output',
        name: name,
        processor: this
      });
      this.outputPorts.add(port);
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
     * Get an input port stored in the processor by its name.
     *
     * @public
     * @method
     * @param {String} name Name of input port.
     * @param {Port}
     */
    getOutputPort: function (name) {
      return this.outputPorts.findWhere({name: name});
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
     * Find an output port in the processor by its name and set its value.
     *
     * @public
     * @method
     * @param {String} name Name of input port.
     * @param {*} value Value to be set.
     */
    setOutputPortValue: function (portName, value) {
      var port = this.outputPorts.findWhere({name: portName});
      if (port) {
        port.setValue(value);
      } else {
        throw new Error('No such port named ' + portName);
      }
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
     * Find an output port in the processor by its name and get its value.
     *
     * @public
     * @method
     * @param {String} name Name of input port.
     * @returns {*}
     */
    getOutputPortValue: function (portName) {
      return this.outputPorts.findWhere({name: portName}).getValue();
    },

    /**
     * Add an activity into the processor.
     *
     * @public
     * @method
     * @param {Activity} act
     */
    addActivity: function (act) {
      this.activities.add(act);
    },

    /**
     * Update the values of the output ports using the values of the input port
     * and the logics of the activities.
     *
     * @public
     * @method
     */
    updateOutputPortValues: function () {
      var inputPorts = this.inputPorts;
      var outputPorts = this.outputPorts;

      this.activities.each(function (activity) {
        activity.update(inputPorts, outputPorts);
      });
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

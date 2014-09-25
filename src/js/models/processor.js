define(function (require) {
  var _          = require('underscore');
  var Backbone   = require('backbone');
  var Port       = require('models/port');
  var Ports      = require('collections/ports');
  var util       = require('util');

  var Processor = Backbone.Model.extend(/** @lends Processor.prototype */{
    defaults: {
      name: 'untitled',
      x: 0,
      y: 0,
      activity: function () { return null; }
    },

    /**
     * @class Processor
     * @classdesc A Processor is an node in the dataflow diagram. It can 
     *   have an arbitrary number of input ports where data flows in 
     *   and exactly one output port where data flows out.
     *   It can also have an activity which is responsible for updating
     *   the value of the output port based on the values in the input
     *   ports using custom logics.
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
      this.listenTo(this.inputPorts, 'remove', function(port) {
        this.trigger('remove-port', port);
      });
    },

    /**
     * Get the category of which this processor belongs.
     *
     * @public
     * @method
     * @returns {string}
     */
    getCategory: function () {
      return this.get('category');
    },
    
    /**
     * Set the category of which this processor belongs.
     *
     * @public
     * @method
     * @param {string} category
     */
    setCategory: function (category) {
      this.set('category', category);
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
     * Remove an input port from the processor.
     *
     * @public
     * @method
     * @param {String} name Name of input port
     */
    removeInputPort: function () {
      return this.inputPorts.pop();


      /*this.datalinks.each(function (datalink) {
        var receiver = datalink.getReceiver();
        if (port === receiver) {
          datalink.destroy();
          break;
        }
      });

      this.buildDependencyGraph();*/
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

    /**
     * Get the activity of the processor.
     *
     * @public
     * @method
     * @returns {Function}
     */
    getActivity: function () {
      return this.get('activity');
    },

    /**
     * Set the activity of the processor.
     *
     * @public
     * @method
     * @param {Function} activity 
     */
    setActivity: function (activity) {
      this.set('activity', activity);
    },

    /**
     * Set the activity code of the processor.
     *
     * @public
     * @method
     * @param {String} code
     */
    setActivityCode: function (code) {
      var args = this.inputPorts.map(function (port) {
        return port.getName();
      }).concat(code);
      var func = util.construct(Function, args);
      this.setActivity(func);
    },

    /**
     * Get the activity code of the processor.
     *
     * @public
     * @method
     * @returns {String}
     */
    getActivityCode: function () {
      return util.getFunctionBody(this.get('activity'));
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

    setHistoricalData: function (data) {
      this.set('historicalData', data);
    },

    getHistoricalData: function (data) {
      return this.get('historicalData');
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
    },

    /**
     * Set the name of the processor.
     *
     * @public
     * @method
     * @param {String} name
     */
    setName: function (name) {
      this.set('name', name);
    },

    /**
     * Get the name of the processor.
     *
     * @public
     * @method
     * @returns {String}
     */
    getName: function () {
      return this.get('name');
    },


    toJSON: function () {
      return {
        cid: this.cid,
        name: this.getName(),
        x: this.getX(),
        y: this.getY(),
        inputPorts: this.inputPorts.toJSON(),
        outputPort: this.outputPort.toJSON(),
        activity: this.getActivity().toString()
      };
    },

    getPortByCid: function (cid) {
      if (this.outputPort.cid === cid) {
        return this.outputPort;
      }
      return this.inputPorts.get(cid);
    }
  }, {
    /**
     * Construct a processor from a json object.
     *
     * @static
     * @param {Object} json
     * @return {Processor}
     */
    fromJSON: function (json) {
      var processor = new Processor({
        x: json.x,
        y: json.y,
        name: json.name,
        activity: eval('(' + json.activity + ')')
      });
      processor.cid = json.cid;
      _.each(json.inputPorts, function (j) {
        var port = new Port({
          name: j.name,
          type: j.type,
          processor: processor
        });
        port.cid = j.cid;
        processor.inputPorts.add(port);
      });
      processor.outputPort.setType(json.outputPort.type);
      processor.outputPort.setName(json.outputPort.name);
      processor.outputPort.cid = json.outputPort.cid;
      return processor;
    }
  });

  return Processor;
});

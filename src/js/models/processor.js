define(function (require) {
  var _          = require('underscore');
  var Backbone   = require('backbone');
  var Port       = require('models/port');
  var Ports      = require('collections/ports');
  var Activity   = require('models/activity');
  var Activities = require('collections/activities');

  var Processor = Backbone.Model.extend({
    defaults: {
      x: 0,
      y: 0
    },

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

    getDataflow: function () {
      return this.get('dataflow');
    },

    setDataflow: function (dataflow) {
      this.set('dataflow', dataflow);
    },

    getInputPorts: function () {
      return this.inputPorts;
    },

    getOutputPorts: function () {
      return this.outputPorts;
    },

    addInputPort: function (name) {
      var port = new Port({
        type: 'input',
        name: name,
        processor: this
      });
      this.inputPorts.add(port);
    },

    addOutputPort: function (name) {
      var port = new Port({
        type: 'output',
        name: name,
        processor: this
      });
      this.outputPorts.add(port);
    },

    getInputPort: function (name) {
      return this.inputPorts.findWhere({name: name });
    },

    getOutputPort: function (name) {
      return this.outputPorts.findWhere({name: name});
    },

    setInputPortValue: function (portName, value) {
      var port = this.inputPorts.findWhere({name: portName});
      if (port) {
        port.setValue(value);
      } else {
        throw new Error('No such port named ' + portName);
      }
    },

    setOutputPortValue: function (portName, value) {
      var port = this.outputPorts.findWhere({name: portName});
      if (port) {
        port.setValue(value);
      } else {
        throw new Error('No such port named ' + portName);
      }
    },

    getInputPortValue: function (portName) {
      return this.inputPorts.findWhere({name: portName}).getValue();
    },

    getOutputPortValue: function (portName) {
      return this.outputPorts.findWhere({name: portName}).getValue();
    },

    addActivity: function (act) {
      this.activities.add(act);
    },

    getX: function () {
      return this.get('x');
    },
    setX: function (x) {
      this.set('x', x);
    },

    getY: function () {
      return this.get('y');
    },
    setY: function () {
      this.set('y');
    },

    setPosition: function (x, y) {
      this.set({
        x: x,
        y: y
      });
    },
    
    translate: function (dx, dy) {
      this.set('x', this.get('x') + dx);
      this.set('y', this.get('y') + dy);
    }
  });

  return Processor;
});

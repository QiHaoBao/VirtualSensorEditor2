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
    },

    getInputPorts: function () {
      return this.inputPorts;
    },

    getOutputPorts: function () {
      return this.outputPorts;
    },

    addInputPort: function (name) {
      var port = new Port({name: name, type: 'input'});
      this.inputPorts.add(port);
    },

    addOutputPort: function (name) {
      var port = new Port({name: name, type: 'output'});
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
      this.set('x', x);
      this.set('y', y);
    },
    
    translate: function (dx, dy) {
      this.set('x', this.get('x') + dx);
      this.set('y', this.get('y') + dy);
    }
  });

  return Processor;
});

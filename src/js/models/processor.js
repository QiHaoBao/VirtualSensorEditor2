define(function (require) {
  var _        = require('underscore');
  var Backbone = require('backbone');
  var Port     = require('models/port');
  var Ports    = require('collections/ports');

  var Processor = Backbone.Model.extend({
    defaults: {
      x: 0,
      y: 0
    },

    initialize: function () {
      this.inputPorts = new Ports();
      this.outputPorts = new Ports();
    },

    addInputPort: function (name) {
      var port = new Port({ name: name });
      this.inputPorts.add(port);
    },

    addOutputPort: function (name) {
      var port = new Port({ name: name });
      this.outputPorts.add(port);
    },

    setInputPortValue: function (portName, value) {
      var port = this.inputPorts.findWhere({ name: portName });
      if (port) {
        port.set('value', value);
      } else {
        throw new Error('No such port named ' + portName);
      }
    }
  });

  return Processor;
});

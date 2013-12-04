define(function (require) {
  var _        = require('underscore');
  var Backbone = require('backbone');
  var Port     = require('models/port');

  var Ports = Backbone.Collection.extend({
    model: Port
  });

  return Ports;
});

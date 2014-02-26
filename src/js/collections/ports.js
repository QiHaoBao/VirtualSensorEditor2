define(function (require) {
  var _        = require('underscore');
  var Backbone = require('backbone');
  var Port     = require('models/port');

  var Ports = Backbone.Collection.extend({
    model: Port
  }, {
    fromJSON: function (json) {
      var models = _.map(json, Port.fromJSON);
      return new Ports(models);
    }
  });

  return Ports;
});

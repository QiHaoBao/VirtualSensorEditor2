define(function (require) {
  var _        = require('underscore');
  var Backbone = require('backbone');
  var Port     = require('models/port');

  /**
   * @class Ports
   * @classdesc A collection of ports
   * @extends Backbone.Collection
   */
  var Ports = Backbone.Collection.extend(
    /** @lends Ports.prototype */
    {
    model: Port
  }, {
    fromJSON: function (json) {
      var models = _.map(json, Port.fromJSON);
      return new Ports(models);
    }
  });

  return Ports;
});

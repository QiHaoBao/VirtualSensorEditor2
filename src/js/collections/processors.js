define(function (require) {
  var _        = require('underscore');
  var Backbone = require('backbone');
  var Processor = require('models/processor');

  /**
   * @class Processors
   * @classdesc A collection of processors
   * @extends Backbone.Collection
   */
  var Processors = Backbone.Collection.extend(
    /** @lends Processors.prototype */
    {
    model: Processor
  }, {
    fromJSON: function (json) {
      var models = _.map(json, Processor.fromJSON);
      return new Processors(models);
    }
  });

  return Processors;
});

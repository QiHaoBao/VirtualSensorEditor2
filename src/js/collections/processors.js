define(function (require) {
  var _        = require('underscore');
  var Backbone = require('backbone');
  var Processor = require('models/processor');

  var Processors = Backbone.Collection.extend({
    model: Processor
  }, {
    fromJSON: function (json) {
      var models = _.map(json, Processor.fromJSON);
      return new Processors(models);
    }
  });

  return Processors;
});

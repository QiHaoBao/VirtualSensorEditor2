define(function (require) {
  var _        = require('underscore');
  var Backbone = require('backbone');
  var Processor = require('models/processor');

  var Processors = Backbone.Collection.extend({
    model: Processor
  });

  return Processors;
});

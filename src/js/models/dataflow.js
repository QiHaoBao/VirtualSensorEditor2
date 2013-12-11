define(function (require) {
  var _          = require('underscore');
  var Backbone   = require('backbone');
  var Processors = require('collections/processors');
  var DataLink   = require('models/datalink');
  var DataLinks  = require('collections/datalinks');

  var Dataflow = Backbone.Model.extend({
    initialize: function () {
      this.processors = new Processors();
      this.datalinks = new DataLinks();
    },

    addProcessor: function (processor) {
      this.addProcessors([processor]);
    },

    addProcessors: function (processors) {
      this.processors.add(processors);
      this.buildDependencyGraph();
      this.trigger('add:processors', processors);
    },

    buildDependencyGraph: function (processors) {
    },

    addDataLink: function (datalink) {
      // TODO: check for existence of processors and ports
      this.datalinks.add(datalink);
    }

  });

  return Dataflow;
});

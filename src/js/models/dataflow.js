define(function (require) {
  var _          = require('underscore');
  var Backbone   = require('backbone');
  var Processors = require('collections/processors');
  var DataLink   = require('models/datalink');
  var DataLinks  = require('collections/datalinks');

  var Dataflow = Backbone.Model.extend({
    initialize: function () {
      this.processors = new Processors({dataflow: this});
      this.datalinks = new DataLinks();
    },

    addProcessor: function (processor) {
      this.addProcessors([processor]);
    },

    addProcessors: function (processors) {
      _.each(processors, function (p) {
        p.setDataflow(this);
      }, this);

      this.processors.add(processors);
      this.buildDependencyGraph();
      this.trigger('add:processors', processors);
    },

    buildDependencyGraph: function (processors) {
    },

    addDataLink: function (datalink) {
      this.datalinks.add(datalink);
      this.trigger('add:datalink', datalink);
    }

  });

  return Dataflow;
});

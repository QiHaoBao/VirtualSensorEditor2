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

    addprocessor: function (processor) {
      this.addProcessors([processor]);
    },

    addProcessors: function (processors) {
      this.processors.add(processors);
      this.buildDependencyGraph();
      this.trigger('processorsAdded', processors);
    },

    buildDependencyGraph: function (processors) {
      //var graph = this.dependencyGraph = {};

      //_.each(processors, function (processor) {
        //var id = processor.id;
        //var dependencies = processor.get('dependencies');

        //if (!_.isArray(dependencies)) {
          //return;
        //}

        //_.each(dependencies, function (d) {
          //if (!graph[d]) {
            //graph[d] = [];
          //}
          //graph[d].push(id);
        //});
      //});

    },

    addDataLink: function (datalink) {
      // TODO: check for existence of processors and ports
      this.datalinks.add(datalink);
    }

  });

  return Dataflow;
});

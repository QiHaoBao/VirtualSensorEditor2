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

    buildDependencyGraph: function () {
      var descendents = this.descendents = {};
      var indegree = this.indegree = {};
      var ports = this.ports = {};

      this.datalinks.each(function (datalink) {
        var sender = datalink.getSender();
        var receiver = datalink.getReceiver();

        var senderId = sender.cid;
        var receiverId = receiver.cid;

        var receiverProcessor = receiver.getProcessor();
        var receiverProcessorId = receiverProcessor.cid;

        if (!indegree[receiverProcessorId]) {
          indegree[receiverProcessorId] = 1;
        } else {
          indegree[receiverProcessorId] += 1;
        }

        if (!descendents[senderId]) {
          descendents[senderId] = [receiverProcessorId];
        } else {
          descendents[senderId].push(receiverProcessorId);
        }
      });

      this.processors.each(function (processor) {
        var processorId = processor.cid;
        if (!indegree[processorId]) {
          indegree[processorId] = 0;
        }
      });
    },

    updateValues: function () {
      // cache properties for faster access
      var indegree = _.clone(this.indegree);
      var descendents = _.clone(this.descendents);
      var processors = this.processors;

      // for each processor, if it has an indegree of 0, then push it into a queue
      var queue = [];
      _.each(indegree, function (value, processorId) {
        if (value === 0) {
          queue.push(processorId);
        }
      });

      while (queue.length) {
        var processorId = queue.shift();
        var processor = processors.get(processorId);

        processor.updateOutputPortValues();

        processor.getOutputPorts().each(function (port) {
          var id = port.cid;
          _.each(descendents[id], function (descendentId) {
            indegree[descendentId] -= 1;
            if (indegree[descendentId] === 0) {
              queue.push(descendentId);
            }
          });
        });
      }
    },

    addDataLink: function (datalink) {
      this.datalinks.add(datalink);
      this.buildDependencyGraph();
      this.trigger('add:datalink', datalink);
    }
  });

  return Dataflow;
});

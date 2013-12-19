define(function (require) {
  var _          = require('underscore');
  var Backbone   = require('backbone');
  var Processors = require('collections/processors');
  var DataLink   = require('models/datalink');
  var DataLinks  = require('collections/datalinks');

  /**
   * @class Dataflow
   * @classdesc The Dataflow class acts as the container of processors and
   *   datalinks. It's also responsible for propagating the signal values
   *   from the source processors to their descendents.
   */
  var Dataflow = Backbone.Model.extend({
    /**
     * @public
     * @constructs Dataflow
     */
    initialize: function () {
      this.processors = new Processors({dataflow: this});
      this.datalinks = new DataLinks();
    },

    /**
     * Add a processor into the dataflow.
     * NOTE: the dataflow will rebuild the dependency graph after
     * calling this method. If you want to add multiple processors
     * into the dataflow, use addProcessors instead.
     *
     * @public
     * @method
     * @param {Processor} processor The processor to add
     */
    addProcessor: function (processor) {
      this.addProcessors([processor]);
    },

    /**
     * Add multiple processors into the dataflow.
     *
     * @public
     * @method
     * @param {Array.<Processor>} processors The processors to add.
     */
    addProcessors: function (processors) {
      _.each(processors, function (p) {
        p.setDataflow(this);
      }, this);

      this.processors.add(processors);
      this.buildDependencyGraph();
      this.trigger('add:processors', processors);
    },

    /**
     * Get the processors stored in the dataflow.
     *
     * @public
     * @method
     * @returns {Processors}
     */
    getProcessors: function () {
      return this.processors;
    },

    /**
     * Add a datalink into the dataflow.
     * NOTE: the dataflow will rebuild the dependency graph after
     * calling this method. If you want to add multiple datalinks
     * into the dataflow, use addDataLinks instead.
     *
     * @public
     * @method
     * @param {DataLink} datalink The datalink to add
     */
    addDataLink: function (datalink) {
      this.addDataLinks([datalink]);
    },

    /**
     * Add multiple datalinks into the dataflow.
     *
     * @public
     * @method
     * @param {Array.<DataLink>} datalink The datalink to add
     */
    addDataLinks: function (datalinks) {
      this.datalinks.add(datalinks);
      this.buildDependencyGraph();
      this.trigger('add:datalinks', datalinks);
    },

    /**
     * Build the dependency graph from the processors and datalinks.
     * The dependency graph will later be used for propagating the
     * values of the source processors to their descendents.
     *
     * @private
     */
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

    /**
     * Propagate the values of the source processors to their
     * descendents.
     * NOTE: this method is using the topological sorting algorithm
     * to propagate the values.
     *
     * @private
     */
    updateValues: function () {
      // cache properties for faster access
      var indegree = _.clone(this.indegree);
      var descendents = _.clone(this.descendents);
      var processors = this.processors;

      // for each processor id, if it has an indegree of 0, then push it into a queue
      var queue = [];
      _.each(indegree, function (value, processorId) {
        if (value === 0) {
          queue.push(processorId);
        }
      });

      while (queue.length) {
        // take the first processor id from the queue.
        var processorId = queue.shift();
        var processor = processors.get(processorId);

        // for each processor taken from the queue, it has an indegree of 0,
        // therefore, all its input ports are already ready to use. 
        processor.updateOutputPortValues();

        // for each of the descendent processor ids, decrease its indegree by 1,
        // and push it into the queue if it reaches 0.
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
    }
  });

  return Dataflow;
});

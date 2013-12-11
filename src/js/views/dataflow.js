define(function (require) {
  var _             = require('underscore');
  var Backbone      = require('backbone');
  var raphael       = require('raphael');
  var config        = require('config');
  var Port          = require('models/port');
  var Processor     = require('models/processor');
  var Processors    = require('collections/processors');
  var ProcessorView = require('views/processor');
  var template      = require('text!templates/dataflow.html');

  var DataflowView = Backbone.View.extend({
    template: _.template(template),

    initialize: function (options) {
      options = _.defaults(options, {
        width: $(window).width(),
        height: $(window).height()
      });
      this.width = options.width;
      this.height = options.height;

      this.listenTo(this.model, 'add:processors', this.addProcessors);
    },

    render: function () {
      this.$el.html(this.template());
      return this;
    },

    addProcessors: function (processors) {
      _.each(processors, this.addProcessor, this);
    },

    addProcessor: function (processor) {
      var view = new ProcessorView({
        model: processor
      });
      view.render().$el.appendTo(this.$el);
    }
  });

  return DataflowView;
});

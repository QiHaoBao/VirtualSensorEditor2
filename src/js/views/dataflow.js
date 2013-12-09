define(function (require) {
  var _        = require('underscore');
  var Backbone = require('backbone');
  var raphael  = require('raphael');
  var config   = require('config');
  var Port     = require('models/port');
  var Processor     = require('models/processor');
  var Processors    = require('collections/processors');
  var ProcessorView = require('views/processor');

  var DataflowView = Backbone.View.extend({
    initialize: function (options) {
      options = _.defaults(options, {
        width: $(window).width(),
        height: $(window).height()
      });
      this.width = options.width;
      this.height = options.height;

      this.listenTo(this.model, 'processorsAdded', this.addProcessors);
    },

    render: function () {
      this.paper = raphael(this.el, this.width, this.height);
      $(this.el).css({background: config.ui.canvas.background});
      return this;
    },

    addProcessors: function (processors) {
      _.each(processors, this.addProcessor, this);
    },

    addProcessor: function (processor) {
      var view = new ProcessorView({
        model: processor,
        paper: this.paper
      });
      view.render();
    }
  });

  return DataflowView;
});

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
      this.listenTo(this.model, 'add:processors', this.addProcessors);
    },

    render: function () {
      this.$el.html(this.template());
      this.paper = raphael(
        this.$('.svg-canvas').get(),
        this.$el.width(),
        this.$el.height()
      );
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
      view.render().$el.appendTo(this.$el);
    }
  });

  return DataflowView;
});

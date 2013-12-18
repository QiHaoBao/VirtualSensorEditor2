define(function (require) {
  var _                  = require('underscore');
  var Backbone           = require('backbone');
  var raphael            = require('raphael');
  var config             = require('config');
  var Port               = require('models/port');
  var Processor          = require('models/processor');
  var Processors         = require('collections/processors');
  var ProcessorView      = require('views/processor');
  var PhysicalSensor     = require('models/physical_sensor');
  var DataLink           = require('models/datalink');
  var DataLinkView       = require('views/datalink');
  var template           = require('text!templates/dataflow.html');

  var DataflowView = Backbone.View.extend({
    template: _.template(template),

    initialize: function (options) {
      this.listenTo(this.model, 'add:processors', this.addProcessors);
      this.listenTo(this.model, 'add:datalink', this.addDataLink);
    },

    render: function () {
      var dataflow = this.model;

      this.$el
        .html(this.template())
        .droppable({
          accept: '.sensor',
          drop: function (event, ui) {
            var $sensor = ui.helper;
            var sensor = new PhysicalSensor();
            sensor.setPosition(ui.position.left, ui.position.top);
            dataflow.addProcessor(sensor);
          }
        });

      this.paper = raphael(
        this.$('.svg-canvas').get(0),
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
    },

    addDataLink: function (datalink) {
      var view = new DataLinkView({
        model: datalink,
        paper: this.paper,
        dataflowView: this
      });
      view.render();
    },

    getPortPosition: function (port) {
      var $port = this.$('#port-' + port.cid);
      var portOffset = $port.offset();
      var dataflowOffset = this.$el.offset();
      return {
        x: portOffset.left - dataflowOffset.left + $port.width() / 2,
        y: portOffset.top - dataflowOffset.top + $port.height() / 2
      };
    }
  });

  return DataflowView;
});

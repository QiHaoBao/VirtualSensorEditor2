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
  var Dataflow           = require('models/dataflow');
  var VirtualSensor      = require('models/virtual_sensor');
  var Alert              = require('models/alert');
  var template           = require('text!templates/dataflow.html');

  var DataflowView = Backbone.View.extend({
    template: _.template(template),

    initialize: function (options) {
      this.listenTo(this.model, 'add:processors', this.addProcessors);
      this.listenTo(this.model, 'add:datalinks', this.addDataLinks);
    },

    render: function () {
      var dataflow = this.model;

      this.$el
        .html(this.template())
        .droppable({
          accept: '.sensor',
          drop: function (event, ui) {
            var $sensor = ui.helper;

            var sensor;
            var type = $sensor.data('type');
            var category = $sensor.data('category');
            if (type === 'alert') {
              sensor = new Alert({
                name: 'alert',
                x: ui.position.left,
                y: ui.position.top
              });
            } else if (type === 'virtual') {
              sensor = new VirtualSensor({
                name: 'virtual',
                x: ui.position.left,
                y: ui.position.top
              });
            } else {
              //var deviceId = $sensor.data('id').toString();
              sensor = new PhysicalSensor({
                name: $.trim($sensor.text()),
                type: type,
                //deviceId: deviceId,
                x: ui.position.left,
                y: ui.position.top,
                category: category
              });
            }
            dataflow.addProcessor(sensor);
          }
        });

      this.paper = raphael(
        this.$('.svg-canvas').get(0),
        this.$el.width(),
        this.$el.height()
      );

      this.addProcessors(this.model.getProcessors());
      this.addDataLinks(this.model.getDataLinks());

      return this;
    },

    addProcessors: function (processors) {
      if (_.isArray(processors)) {
        _.each(processors, this.addProcessor, this);
      } else {
        processors.each(this.addProcessor, this);
      }
    },

    addProcessor: function (processor) {
      var view = new ProcessorView({
        model: processor,
        paper: this.paper
      });
      view.render().$el.appendTo(this.$el);
    },

    addDataLinks: function (datalinks) {
      if (_.isArray(datalinks)) {
        _.each(datalinks, this.addDataLink, this);
      } else {
        datalinks.each(this.addDataLink, this);
      }
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
    },

    resetModel: function (model) {
      this.model = model;
      this.render();
    }
  });

  return DataflowView;
});

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
  var session            = require('models/session');
  var fakeDataflow       = require('models/fake_dataflow');
  var template           = require('text!templates/dataflow.html');

  var DataflowView = Backbone.View.extend({
    template: _.template(template),

    initialize: function (options) {
      this.setModel(this.model);
      this.listenTo(session, 'login', this.changeUser);
      this.listenTo(session, 'logout', this.onLogout);
    },

    setModel: function (model) {
      this.model = model;
      this.listenTo(this.model, 'add:processors', this.addProcessors);
      this.listenTo(this.model, 'add:datalinks', this.addDataLinks);
    },

    changeUser: function () {
      var username = session.getUserName();
      var model = null;
      if (username === null) {
        model = fakeDataflow;
      } else {
        var data = window.localStorage['df-' + username];
        if (!data) {
          model = new Dataflow();
        } else {
          model = Dataflow.fromJSON(JSON.parse(data));
        }
      }
      this.setModel(model);
      this.render();
    },   

    onLogout: function (username) {
      window.localStorage['df-' + username] = JSON.stringify(this.model);
      this.changeUser();
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
            console.log(type, category);

            if (type === 'alert') {
              sensor = new Alert({
                name: 'alert'
              });
            } else if (type === 'virtual') {
              sensor = new VirtualSensor({
                name: 'virtual'
              });
            } else if (type === 'sum') {
              sensor = new VirtualSensor({
                name: 'sum',
                activity: function () {
                  return _.reduce(arguments, function (s, n) {
                    return s + n;
                  }, 0);
                }
              });
              sensor.addInputPort('a');
              sensor.addInputPort('b');
            } else if (type === 'mean') {
              sensor = new VirtualSensor({
                name: 'mean',
                activity: function () {
                  var sum = _.reduce(arguments, function(s, n) {
                    return s + n;
                  }, 0);
                  return sum / arguments.length;
                }
              });
              sensor.addInputPort('a');
              sensor.addInputPort('b');
            } else if (type === 'abs') {
              sensor = new VirtualSensor({
                name: 'abs',
                activity: function (a) {
                  return Math.abs(a);
                }
              });
              sensor.addInputPort('a');
            } else { //type === 'physical'
              //var deviceId = $sensor.data('id').toString();
              sensor = new PhysicalSensor({
                name: $.trim($sensor.text()),
                type: type,
                //deviceId: deviceId,
                category: category
              });
            }
            sensor.setPosition(ui.position.left, ui.position.top);
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

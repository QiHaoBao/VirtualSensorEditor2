define(function (require) {
  var _              = require('underscore');
  var Backbone       = require('backbone');
  var NavbarView     = require('views/navbar');
  var Processor      = require('models/processor');
  var Dataflow       = require('models/dataflow');
  var DataflowView   = require('views/dataflow');
  var PhysicalSensor = require('models/physical_sensor');
  var DataLink       = require('models/datalink');
  var PanelView      = require('views/panel');
  var config         = require('config');
  var api            = require('api');
  var template       = require('text!templates/app.html');
  require('jqueryui');

  var App = Backbone.View.extend({
    template: _.template(template),

    initialize: function () {
      this.dataflow = new Dataflow();
      this.dataflowView = new DataflowView({
        model: this.dataflow
      });
      this.panelView = new PanelView({
        dataflow: this.dataflow
      });
      this.navbarView = new NavbarView();
      window.dataflow = this.dataflow;
    },

    render: function () {
      this.$el.html(this.template());
      this.navbarView.setElement(this.$('.navbar')).render();
      //this.panelView.setElement(this.$('.panel')).render();
      this.dataflowView.setElement(this.$('.dataflow')).render();

      $('.slider').slider();
      
      var df = this.dataflow;

      var p1 = new PhysicalSensor();
      p1.setName("B213 temp");
      p1.setValue(10);
      p1.setPosition(300, 100);

      var p2 = new PhysicalSensor();
      p2.setName("B214 temp");
      p2.setValue(20);
      p2.setPosition(300, 250);

      var p3 = new Processor();
      p3.setName("virtual temp second floor");
      p3.addInputPort('a');
      p3.addInputPort('b');
      p3.setPosition(600, 150);
      p3.setActivity(function (a, b) {
        return (a + b) / 2;
      });

      var p4 = new PhysicalSensor();
      p4.setName("B115 temp");
      p4.setValue(30);
      p4.setPosition(600, 300);

      var p5 = new Processor();
      p5.setName("virtual temp bldg 23");
      p5.addInputPort('a');
      p5.addInputPort('b');
      p5.setPosition(900, 175);
      p5.setActivity(function (a, b) {
        return (a + b) / 2;
      });

      var d1 = new DataLink(p1.getOutputPort('out'), p3.getInputPort('a'));
      var d2 = new DataLink(p2.getOutputPort('out'), p3.getInputPort('b'));
      var d3 = new DataLink(p3.getOutputPort('out'), p5.getInputPort('a'));
      var d4 = new DataLink(p4.getOutputPort('out'), p5.getInputPort('b'));

      df.addProcessor(p1);
      df.addProcessor(p2);
      df.addProcessor(p3);
      df.addProcessor(p4);
      df.addProcessor(p5);
      
      df.addDataLink(d1);
      df.addDataLink(d2);
      df.addDataLink(d3);
      df.addDataLink(d4);

      df.updateValues();

      setInterval(function () {
        p1.setValue(Math.random() * 100 + 50);
        p2.setValue(Math.random() * 100 + 50);
        p4.setValue(Math.random() * 100 + 50);
        df.updateValues();
      }, 1000);
      // end of test data

      var self = this;
      api.getAllSensors({
        callback: function (sensors) {
          self.panelView.setElement(self.$('.panel')).render(sensors);
        }
      });

      var fetchSensorValues = _.bind(this.fetchSensorValues, this);
      (function updateSensorValues() {
        fetchSensorValues(function () {
          setTimeout(updateSensorValues, 5000);
        });
      })();

      return this;
    },

    saveToLocalStorage: function () {
      window.localStorage.dataflow = JSON.stringify(this.dataflow);
    },

    loadFromLocalStorage: function () {
      this.model = Dataflow.fromJSON(JSON.parse(window.localStorage.dataflow));
      this.dataflowView.resetModel(this.model);
    },

    fetchSensorValues: function (callback) {
      var dataflow = this.dataflow;
      var processors = dataflow.getProcessors();

      _.each(_.groupBy(config.sensors, 'sensorType'), function (group, type) {
        api.getLatestReadingsFromAllDevices({
          type: type,
          callback: function (data) {
            // sample data:
            // [{"sensorName":"fireImpDigitalTemperature23420ca4e4830bee","isIndoor":true,"timeStamp":"Jan 25, 1970 12:31:23 PM","locationInterpreter":"GPS","value":"81.5","longitude":91.0,"latitude":91.0,"altitude":91.0}]
            $('.sensor[data-type="' + type + '"]').css({
              opacity: 0.3
            });

            _.each(data, function (entry) {
              $('.sensor[data-type="' + type + '"]').css({
                opacity: 1
              });
              // TODO: use the combination of device id and sensor type as
              // the id of the processor, for quick find
              var ps = processors.where({
                name: entry.sensorName,
              });
              if (ps.length) {
                _.each(ps, function (p) {
                  p.setValue(entry.value);
                });
              }
            });
            callback();
          }
        });
      });
    }
  });

  return App;
});

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
    },

    render: function () {
      this.$el.html(this.template());
      this.navbarView.setElement(this.$('.navbar')).render();
      this.panelView.setElement(this.$('.panel')).render();
      this.dataflowView.setElement(this.$('.dataflow')).render();

      $('.slider').slider();
      
      var df = this.dataflow;

      var p1 = new PhysicalSensor();
      p1.setValue(10);
      p1.setPosition(300, 100);

      var p2 = new PhysicalSensor();
      p2.setValue(20);
      p2.setPosition(300, 250);

      var p3 = new Processor();
      p3.addInputPort('a');
      p3.addInputPort('b');
      p3.setPosition(600, 150);
      p3.setActivity(function (a, b) {
        return (a + b) / 2;
      });

      var p4 = new PhysicalSensor();
      p4.setValue(30);
      p4.setPosition(600, 300);

      var p5 = new Processor();
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


      var fetchSensorValues = _.bind(this.fetchSensorValues, this);
      (function updateSensorValues() {
        fetchSensorValues(function () {
          setTimeout(updateSensorValues, 5000);
        });
      })();

      return this;
    },

    fetchSensorValues: function (callback) {
      var dataflow = this.dataflow;
      var processors = dataflow.getProcessors();
      var timestamp = Date.now();


      _.each(config.sensors.types, function (type) {
        api.getLastReadingsFromAllDevices({
          timestamp: timestamp,
          type: type,
          callback: function (data) {
            // sample data:
            // [
            //   {"timestamp":1387403993000,"sensor_type":"temp","value":515,"device_id":"17020003"},
            //   {"timestamp":1387403976000,"sensor_type":"temp","value":516,"device_id":"1712bbb9"}
            // ]
            $('.sensor[data-type="' + type + '"]').css({
              opacity: 0.3
            });

            _.each(data, function (entry) {
              $('.sensor[data-type="' + type + '"][data-id="' + entry.device_id + '"]').css({
                opacity: 1
              });
              // TODO: use the combination of device id and sensor type as
              // the id of the processor, for quick find
              var ps = processors.where({
                deviceId: entry.device_id.toString(),
                type: entry.sensor_type
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

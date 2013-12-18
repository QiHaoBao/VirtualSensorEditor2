define(function (require) {
  var _              = require('underscore');
  var Backbone       = require('backbone');
  var NavbarView     = require('views/navbar');
  var Processor      = require('models/processor');
  var Dataflow       = require('models/dataflow');
  var DataflowView   = require('views/dataflow');
  var PhysicalSensor = require('models/physical_sensor');
  var DataLink       = require('models/datalink');
  var Activity       = require('models/activity');
  var PanelView      = require('views/panel');
  var template       = require('text!templates/app.html');

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
    },

    render: function () {
      this.$el.html(this.template());
      this.panelView.setElement(this.$('.panel')).render();
      this.dataflowView.setElement(this.$('.dataflow')).render();
      
      var df = this.dataflow;

      //var p1 = new Processor();
      //p1.addInputPort('p1i1');
      //p1.addInputPort('p1i2');
      //p1.addOutputPort('p1o1');
      //p1.setOutputPortValue('p1o1', 10);
      //p1.setPosition(100, 100);

      //var p2 = new Processor();
      //p2.addInputPort('p2i1');
      //p2.addOutputPort('p2o1');
      //p2.setPosition(300, 200);

      //var p3 = new PhysicalSensor();
      //p3.setPosition(400, 300);
      //p3.setValue(60);

      //var act = new Activity({
        //logic: function (inputPorts, outputPorts) {
          //var i1 = inputPorts.findWhere({ name: 'p2i1' });
          //var o1 = outputPorts.findWhere({ name: 'p2o1' });
          //o1.setValue(i1.getValue());
        //}
      //});
      //p2.addActivity(act);

      //var l1 = new DataLink(p1.getOutputPort('p1o1'), p2.getInputPort('p2i1'));
      //df.addProcessor(p1);
      //df.addProcessor(p2);
      //df.addProcessor(p3);
      //df.addDataLink(l1);
      //df.updateValues();
      //console.log(p2.getOutputPortValue('p2o1'));

      var p1 = new PhysicalSensor();
      p1.setValue(10);
      p1.setPosition(300, 100);

      var p2 = new PhysicalSensor();
      p2.setValue(20);
      p2.setPosition(300, 200);

      var p3 = new Processor();
      p3.addInputPort('a');
      p3.addInputPort('b');
      p3.addOutputPort('out');
      p3.setPosition(600, 150);

      var act = new Activity({
        logic: function (inputPorts, outputPorts) {
          var a = inputPorts.findWhere({name: 'a'});
          var b = inputPorts.findWhere({name: 'b'});
          var out = outputPorts.findWhere({name: 'out'});
          out.setValue((a.getValue() + b.getValue()) / 2);
        }
      });
      p3.addActivity(act);

      var p4 = new PhysicalSensor();
      p4.setValue(30);
      p4.setPosition(600, 250);

      var p5 = new Processor();
      p5.addInputPort('a');
      p5.addInputPort('b');
      p5.addOutputPort('out');
      p5.setPosition(900, 175);

      var act = new Activity({
        logic: function (inputPorts, outputPorts) {
          var a = inputPorts.findWhere({name: 'a'});
          var b = inputPorts.findWhere({name: 'b'});
          var out = outputPorts.findWhere({name: 'out'});
          out.setValue((a.getValue() + b.getValue()) / 2);
        }
      });
      p5.addActivity(act);

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
        p1.setValue(p1.getValue() + 10);
        p2.setValue(p2.getValue() + 10);
        p4.setValue(p4.getValue() + 10);
        df.updateValues();
      }, 1000);


      return this;
    }
  });

  return App;
});

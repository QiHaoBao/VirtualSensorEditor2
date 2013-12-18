define(function (require) {
  var _            = require('underscore');
  var Backbone     = require('backbone');
  var NavbarView   = require('views/navbar');
  var Processor    = require('models/processor');
  var Dataflow     = require('models/dataflow');
  var DataflowView = require('views/dataflow');
  var PhysicalSensor = require('models/physical_sensor');
  var DataLink     = require('models/datalink');
  var Activity     = require('models/activity');
  var template     = require('text!templates/app.html');

  var App = Backbone.View.extend({
    template: _.template(template),

    initialize: function () {
      this.dataflow = new Dataflow();
      this.dataflowView = new DataflowView({
        model: this.dataflow
      });
    },

    render: function () {
      this.$el.html(this.template());
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
      p1.setPosition(100, 100);

      var p2 = new PhysicalSensor();
      p2.setValue(20);
      p2.setPosition(100, 200);

      var p3 = new Processor();
      p3.addInputPort('a');
      p3.addInputPort('b');
      p3.addOutputPort('out');
      p3.setPosition(400, 150);

      var act = new Activity({
        logic: function (inputPorts, outputPorts) {
          var a = inputPorts.findWhere({name: 'a'});
          var b = inputPorts.findWhere({name: 'b'});
          var out = outputPorts.findWhere({name: 'out'});
          out.setValue((a.getValue() + b.getValue()) / 2);
        }
      });
      p3.addActivity(act);

      var d1 = new DataLink(p1.getOutputPort('out'), p3.getInputPort('a'));
      var d2 = new DataLink(p2.getOutputPort('out'), p3.getInputPort('b'));

      df.addProcessor(p1);
      df.addProcessor(p2);
      df.addProcessor(p3);
      
      df.addDataLink(d1);
      df.addDataLink(d2);

      df.updateValues();

      setInterval(function () {
        p1.setValue(Math.random() * 100);
        p2.setValue(Math.random() * 100);
        df.updateValues();
      }, 1000);


      return this;
    }
  });

  return App;
});

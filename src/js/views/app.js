define(function (require) {
  var Backbone     = require('backbone');
  var NavbarView   = require('views/navbar');
  var Processor    = require('models/processor');
  var Dataflow     = require('models/dataflow');
  var DataflowView = require('views/dataflow');
  var DataLink     = require('models/datalink');
  var Activity     = require('models/activity');

  var App = Backbone.View.extend({
    initialize: function () {
      this.dataflow = new Dataflow();
      this.dataflowView = new DataflowView({
        model: this.dataflow
      });
    },

    render: function () {
      this.dataflowView.setElement(this.$el).render();
      
      var df = this.dataflow;

      var p1 = new Processor();
      p1.addInputPort('p1i1');
      p1.addInputPort('p1i2');
      p1.addOutputPort('p1o1');
      p1.setPosition(100, 100);

      var p2 = new Processor();
      p2.addInputPort('p2i1');
      p2.addOutputPort('p2o1');
      p2.setPosition(300, 200);

      var act = new Activity({
        logic: function (inputPorts, outputPorts) {
          var i1 = inputPorts.findWhere({ name: 'p2i1' });
          var o1 = outputPorts.findWhere({ name: 'p2o1' });
          o1.setValue(i1.getValue());
        }
      });
      p2.addActivity(act);

      var l1 = new DataLink(p1.getOutputPort('p1o1'), p2.getInputPort('p2i1'));
      df.addProcessor(p1);
      df.addProcessor(p2);
      df.addDataLink(l1);

      return this;
    }
  });

  return App;
});

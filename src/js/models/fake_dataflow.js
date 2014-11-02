define(function (require) {
  var _              = require('underscore');
  var Backbone       = require('backbone');
  var Processor      = require('models/processor');
  var Dataflow       = require('models/dataflow');
  var PhysicalSensor = require('models/physical_sensor');
  var DataLink       = require('models/datalink');
  var config         = require('config');

  var df = new Dataflow();  

  var p1 = new PhysicalSensor();
  p1.setName("B213 temp");
  p1.setValue(10);
  p1.setPosition(300, 100);
  p1.setCategory('digitalTemperature');

  var p2 = new PhysicalSensor();
  p2.setName("B214 temp");
  p2.setValue(20);
  p2.setPosition(300, 250);
  p2.setCategory('digitalTemperature');

  var p3 = new Processor();
  p3.setName("virtual temp second floor");
  p3.addInputPort('a');
  p3.addInputPort('b');
  p3.setPosition(600, 150);
  p3.setCategory('digitalTemperature');
  p3.setActivity(function (a, b) {
    return (a + b) / 2;
  });

  var p4 = new PhysicalSensor();
  p4.setName("B115 temp");
  p4.setValue(30);
  p4.setPosition(600, 300);
  p4.setCategory('digitalTemperature');

  var p5 = new Processor();
  p5.setName("virtual temp bldg 23");
  p5.addInputPort('a');
  p5.addInputPort('b');
  p5.setPosition(900, 175);
  p5.setCategory('digitalTemperature');
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

  return df;
});

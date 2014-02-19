define(function (require) {
  var Processor = require('models/processor');

  var Alert = Processor.extend({
    initialize: function () {
      Processor.prototype.initialize.call(this);
      this.addInputPort('input');
      this.setActivityCode('return false;');
    }
  });

  return Alert;
});

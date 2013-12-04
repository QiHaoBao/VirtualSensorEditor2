define(function (require) {
  var _        = require('underscore');
  var Backbone = require('backbone');

  /**
   * An activity contains the actual logic to process the input data
   * and produce the ouputs
   */
  var Activity = Backbone.Model.extend({
    defaults: {
      logic: function (inputPorts, outputPorts) {
        // empty logic
      }
    }
  });

  return Activity;
});

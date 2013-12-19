define(function (require) {
  var _        = require('underscore');
  var Backbone = require('backbone');

  /**
   * @class Activity
   * @classdesc An activity contains the actual logic to process the input
   *   data and produce the ouputs
   *
   */
  var Activity = Backbone.Model.extend({
    defaults: {
      logic: function (inputPorts, outputPorts) {
        // empty logic
      }
    },

    /**
     * Update the values of the output ports by the values
     * of the input ports and the activity logic.
     *
     * @public
     * @method
     * @param {Ports} inputPorts
     * @param {Ports} outputPorts
     */
    update: function (inputPorts, outputPorts) {
      this.get('logic')(inputPorts, outputPorts);
    }
  });

  return Activity;
});

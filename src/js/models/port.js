define(function (require) {
  var _        = require('underscore');
  var Backbone = require('backbone');

  var Port = Backbone.Model.extend({
    initialize: function () {
      this._activities = [];
    },

    addActivity: function (act) {
      this._activities.push(act);
    }
  });

  return Port;
});

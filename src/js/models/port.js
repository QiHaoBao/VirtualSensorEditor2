define(function (require) {
  var _        = require('underscore');
  var Backbone = require('backbone');

  var Port = Backbone.Model.extend({
    getName: function () {
      return this.get('name');
    },
    setName: function (name) {
      this.set('name', name);
    },

    getValue: function () {
      return this.get('value');
    },
    setValue: function (value) {
      this.set('value', value);
    }
  });

  return Port;
});

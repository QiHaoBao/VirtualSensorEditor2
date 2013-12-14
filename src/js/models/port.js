define(function (require) {
  var _        = require('underscore');
  var Backbone = require('backbone');

  var Port = Backbone.Model.extend({
    initialize: function () {
      var processor = this.getProcessor();
      this.listenTo(processor, 'change:x', this.triggerChangePosition);
      this.listenTo(processor, 'change:y', this.triggerChangePosition);
    },

    triggerChangePosition: function () {
      this.trigger('change:position');
    },

    getProcessor: function () {
      return this.get('processor');
    },

    getType: function () {
      return this.get('type');
    },

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

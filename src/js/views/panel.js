define(function (require) {
  var _        = require('underscore');
  var Backbone = require('backbone');
  var config   = require('config');
  var template = require('text!templates/panel.html');

  var PanelView = Backbone.View.extend({
    template: _.template(template),

    render: function () {
      this.$el
        .html(this.template({
          sensorTypes: config.sensors.types,
          sensorIds: config.sensors.ids,
          labelsMapping: config.sensors.labelsMapping
        }))
        .draggable();
      this.$('.available-sensors').accordion({
        collapsible: true,
        active: false
      });
      return this;
    }
  });

  return PanelView;
});

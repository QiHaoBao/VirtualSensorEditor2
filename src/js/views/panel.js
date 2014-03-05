define(function (require) {
  var _              = require('underscore');
  var Backbone       = require('backbone');
  var PhysicalSensor = require('models/physical_sensor');
  var config         = require('config');
  var template       = require('text!templates/panel.html');

  var PanelView = Backbone.View.extend({
    template: _.template(template),

    initialize: function (options) {
      this.dataflow = options.dataflow;
    },

    render: function () {
      var dataflow = this.dataflow;

      this.$el
        .html(this.template({
          sensors: config.sensors
        }))
        .draggable();

      this.$('.sensors-section').accordion({
        collapsible: true,
        active: false
      });

      this.$('.sensor').draggable({
        helper: 'clone'
      });
      
      return this;
    }
  });

  return PanelView;
});

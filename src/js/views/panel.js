define(function (require) {
  var _              = require('underscore');
  var Backbone       = require('backbone');
  var PhysicalSensor = require('models/physical_sensor');
  var template       = require('text!templates/panel.html');

  var PanelView = Backbone.View.extend({
    template: _.template(template),

    initialize: function (options) {
      this.dataflow = options.dataflow;
    },

    render: function (sensors) {
      var dataflow = this.dataflow;

      this.$el
        .html(this.template({
          sensors: sensors
        }))
        .draggable();

      this.$('.sensors-section').accordion({
        collapsible: true,
        active: false,
        heightStyle: "content"
      });

      this.$('.sensor').draggable({
        helper: 'clone'
      });
      
      return this;
    }
  });

  return PanelView;
});

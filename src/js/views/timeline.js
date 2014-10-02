define(function (require) {
  var _        = require('underscore');
  var Backbone = require('backbone');
  var d3       = require('d3');
  var cubism   = require('cubism');
  var api      = require('api');
  var Dygraph  = require('dygraph');
  var template = require('text!templates/timeline.html');

  var TimelineView = Backbone.View.extend({
    template: _.template(template),

    className: 'timeline',

    render: function () {
      var self = this;
      this.$el.html(this.template(this.model.attributes));
      $('body')
        .append(this.$el.fadeIn())/*
        .one('click', function () {
          self.$el.fadeOut(function () {
            self.remove();
          });
        });*/

      api.getSensorReadingInRange({
        startTimestamp: Date.now()-1000 * 60,
        endTimestamp: Date.now(),
        //this.model is a processor
        sensorName: this.model.getName(),
        callback: function (values) {
          self.plotTimeSeries(values);
        }
      });

      return this;
    },

    plotTimeSeries: function (values) {
      var valueArray = _.map(values, function(row){
        return [new Date(row.timeStamp), row.value];
      });
      var g = new Dygraph(this.$('.timeline-graph').get(0), valueArray, 
        {
          labels: ["Timestamp", "Value"]
        });

    }
  });

  return TimelineView;
});























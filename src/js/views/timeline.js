define(function (require) {
  var _        = require('underscore');
  var Backbone = require('backbone');
  var d3       = require('d3');
  var cubism   = require('cubism');
  var api      = require('api');
  var Dygraph  = require('dygraph');
  var template = require('text!templates/timeline.html');
  require('jquery_datepair');

  var TimelineView = Backbone.View.extend({
    template: _.template(template),

    className: 'timeline',

    events: {
      'click .close-button': 'close',
      'click .timeline-button': 'fetch',
    },

    render: function () {
      var self = this;

      this.$el.html(this.template(this.model.attributes));

      this.$('#timeline-list .timeline-time').timepicker({
        'showDuration': true,
        'timeFormat': 'H:i'
      });

      this.$('#timeline-list .timeline-date').datepicker({
          'format': 'm/d/yyyy',
          'autoclose': true
      });

      // initialize datepair
      this.$('#timeline-list').datepair();

      $('body')
        .append(this.$el.fadeIn());

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
          labels: ["Timestamp", "Value"],
          legend: 'always',
        });
    },

    close: function () {
      var self = this;
      this.$el.fadeOut(function () {
        self.remove();
      });
    },

    fetch: function () {
      var startDate = this.$('.timeline-date.start').val();
      var startTime = this.$('.timeline-time.start').val();
      var endDate = this.$('.timeline-date.end').val();
      var endTime = this.$('.timeline-time.end').val();
      var start = startDate + ' ' + startTime;
      var end = endDate + ' ' + endTime;

      var s = Date.parse(start);
      var e = Date.parse(end);
      var self = this;

      api.getSensorReadingInRange({
        startTimestamp: s,
        endTimestamp: e,
        sensorName: this.model.getName(),
        callback: function (values) {
          self.plotTimeSeries(values);
        }
      })
    }

  });

  return TimelineView;
});























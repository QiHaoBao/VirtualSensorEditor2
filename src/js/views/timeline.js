define(function (require) {
  var _        = require('underscore');
  var Backbone = require('backbone');
  var d3       = require('d3');
  var cubism   = require('cubism');
  var api      = require('api');
  var template = require('text!templates/timeline.html');

  var TimelineView = Backbone.View.extend({
    template: _.template(template),

    className: 'timeline',

    render: function () {
      var self = this;
      this.$el.html(this.template(this.model.attributes));
      $('body')
        .append(this.$el.fadeIn())
        .one('click', function () {
          self.$el.fadeOut(function () {
            self.remove();
          });
        });

      api.getSensorReadingsInTimeRange({
        callback: function (values) {
          self.model.setHistoricalData(values);
          self.plotTimeSeries();
        }
      });

      return this;
    },

    plotTimeSeries: function () {
      var self = this;
      var context = cubism.context()
          .serverDelay(0)
          .clientDelay(0)
          .step(1000)
          .size(this.$('.timeline-body').width());

      var called = false;

      var metric = context.metric(function (start, stop, step, callback) {
        if (called) {
          callback(null, []);
        } else {
          callback(null, self.model.getHistoricalData());
          called = true;
        }
      });

      d3.select(this.el).select('.timeline-body').call(function(div) {
        div
          .datum(metric)
          .append('div')
            .attr('class', 'axis')
            .call(context.axis()
               .orient('top')
               .ticks(10)
               .tickSubdivide(3)
               .tickSize(1))
          .append("div")
            .attr("class", "horizon")
            .call(context.horizon()
              .height(75)
              .mode('mirror')
              .colors(["#bdd7e7","#bae4b3"]));
      });
    }
  });

  return TimelineView;
});

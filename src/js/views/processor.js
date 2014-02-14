define(function (require) {
  var _            = require('underscore');
  var Backbone     = require('backbone');
  var Ports        = require('collections/ports');
  var PortView     = require('views/port');
  var PortsView    = require('views/ports');
  var DataLinkView = require('views/datalink');
  var DataLink     = require('models/datalink');
  var template     = require('text!templates/processor.html');
  require('jqueryui');

  var ProcessorView = Backbone.View.extend({
    tagName: 'div',
    className: 'processor',
    template: _.template(template),

    initialize: function (options) {
      this.paper = options.paper;

      // ports
      this.inputPorts = this.model.getInputPorts();
      this.outputPort = this.model.getOutputPort();

      // ports views
      this.inputPortsView = new PortsView({
        collection: this.inputPorts,
        paper: this.paper
      });
      this.outputPortView = new PortView({
        model: this.outputPort,
        paper: this.paper
      });

      // event listeners
      this.listenTo(this.model, 'change:x', this.updatePosition);
      this.listenTo(this.model, 'change:y', this.updatePosition);

      this.listenTo(this.outputPort, 'change:value', this.updatePortValue);
    },

    render: function () {
      var processor = this.model;

      this.$el
        .attr('id', 'processor-' + this.model.cid)
        .html(this.template(this.model.attributes))
        .data('view', this)
        .draggable({
          drag: function (event, ui) {
            processor.setPosition(ui.position.left, ui.position.top);
          },
          stop: function (event, ui) {
            processor.setPosition(ui.position.left, ui.position.top);
          }
        });

      this.inputPortsView.setElement(this.$('.input-ports')).render();
      this.outputPortView.setElement(this.$('.output-port')).render();

      this.updatePosition();
      this.updatePortValue();

      // render chart
      setTimeout(this.renderChart.bind(this), 500);

      return this;
    },

    updatePosition: function () {
      this.$el.css({
        left: this.model.getX(),
        top: this.model.getY()
      });
    },

    updatePortValue: function () {
      var $outputPortValue = this.$('.output-port-value').html('');
      var value = this.outputPort.getValue();
      if (_.isNumber(value)) {
        value = value.toFixed(1);
      }
      $outputPortValue.text(value);
    },

    renderChart: function () {
      var chartSize = 200;
      var self = this;
      var random = require('util').random;
      var d3 = require('d3');
      var cubism = require('cubism');
      var context = cubism.context()
          .serverDelay(0)
          .clientDelay(0)
          .step(1000)
          .size(chartSize);

      var metric = context.metric(function (start, stop, step, callback) {
        var values = [];
        start = +start;
        stop = +stop;

        while (start < stop) {
          start += step;
          values.push(self.outputPort.getValue());
        }

        callback(null, values);
      });

      d3.select('#processor-' + this.model.cid + " .chart").call(function(div) {
        div
          .datum(metric)
          .append("div")
            .attr("class", "horizon")
            .call(context.horizon()
              .height(30)
              .mode('mirror')
              .colors(["#bdd7e7","#bae4b3"]));
      });

      // On mousemove, reposition the chart values to match the rule.
      context.on("focus", function(i) {
        d3.selectAll(".value").style("right", i == null ? null : context.size() - i + "px");
      });
    }
  });

  return ProcessorView;
});

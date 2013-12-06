define(function (require) {
  var _        = require('underscore');
  var Backbone = require('backbone');
  var config   = require('config');

  var ProcessorView = Backbone.View.extend({
    initialize: function (options) {
      this.paper = options.paper;
      this.subViews = this.paper.set();
    },

    renderPorts: function (ports, alignment) {
      var paper = this.paper;
      var subViews = this.subViews;

      var length = ports.length;
      var halfWidth = config.ui.processor.width / 2;
      var x = (alignment === 'left' ? -halfWidth : halfWidth);
      var anchor = (alignment === 'left' ? 'start' : 'end');

      ports.each(function (port, i) {
        var text = paper.text(
          x,
          (i - length / 2 + 0.5) * config.ui.port.lineHeight,
          port.get('name')
        ).attr({
          'text-anchor': anchor
        });
        subViews.push(text);
      });

      return  length * config.ui.port.lineHeight;
    },

    render: function () {
      var processor = this.model;
      var paper = this.paper;
      var subViews = this.subViews;

      var inputHeight = this.renderPorts(processor.inputPorts, 'left');
      var outputHeight = this.renderPorts(processor.outputPorts, 'right');
      var height = Math.max(inputHeight, outputHeight);

      // container box
      var halfWidth = config.ui.processor.width / 2;
      var box = paper.rect(
        -halfWidth - config.ui.port.marginLeftRight,
        -height / 2 - config.ui.port.marginTopBottom,
        2 * (halfWidth + config.ui.port.marginLeftRight),
        height + 2 * config.ui.port.marginTopBottom
      ).toBack();
      subViews.push(box);

      subViews.translate(100, 100);
    }
  });

  return ProcessorView;
});

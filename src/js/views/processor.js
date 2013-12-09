define(function (require) {
  var _        = require('underscore');
  var Backbone = require('backbone');
  var config   = require('config');
  var round    = Math.round;

  var ProcessorView = Backbone.View.extend({
    initialize: function (options) {
      this.paper = options.paper;
      this.group = this.paper.set();
    },

    renderPorts: function (ports, alignment) {
      var paper = this.paper;
      var group = this.group;

      var length = ports.length;
      var halfWidth = config.ui.processor.width / 2;
      var x = (alignment === 'left' ? -halfWidth : halfWidth);
      var anchor = (alignment === 'left' ? 'start' : 'end');

      ports.each(function (port, i) {
        var text = paper
          .text(
            x,
            (i - length / 2 + 0.5) * config.ui.port.lineHeight,
            port.get('name')
          )
          .attr({
            'text-anchor': anchor,
            fill: config.ui.port.text.fill,
            cursor: config.ui.port.cursor
          })
          .hover(function () {
            text.attr({
              fill: config.ui.port.text.hover.fill
            });
          }, function () {
            text.attr({
              fill: config.ui.port.text.fill
            });
          });
        group.push(text);
      });

      return  length * config.ui.port.lineHeight;
    },

    render: function () {
      var self = this;
      var processor = this.model;
      var paper = this.paper;
      var group = this.group;

      var inputHeight = this.renderPorts(processor.inputPorts, 'left');
      var outputHeight = this.renderPorts(processor.outputPorts, 'right');
      var height = Math.max(inputHeight, outputHeight);

      var halfWidth = config.ui.processor.width / 2;
      var ox, oy; // original x, y
      var box = paper
        .rect(
          round(-halfWidth - config.ui.port.marginLeftRight),
          round(-height / 2 - config.ui.port.marginTopBottom),
          round(2 * (halfWidth + config.ui.port.marginLeftRight)),
          round(height + 2 * config.ui.port.marginTopBottom),
          config.ui.processor.borderRadius
        )
        .attr({
          fill: config.ui.processor.fill,
          cursor: config.ui.processor.cursor,
          stroke: config.ui.processor.stroke
        })
        .toBack()
        .drag(function onmove(dx, dy, x, y) {
          self.translate(x - ox, y - oy);
          ox = x;
          oy = y;
        }, function onstart(x, y) {
          ox = x;
          oy = y;
        });
      box.node.setAttribute('class', 'processor');
      group.push(box);

      this.translate(processor.getX(), processor.getY());
    },

    translate: function (dx, dy) {
      this.group.forEach(function (e) {
        e.attr({
          x: e.attr('x') + dx,
          y: e.attr('y') + dy
        });
      });
    }
  });

  return ProcessorView;
});

define(function (require) {
  var _            = require('underscore');
  var Backbone     = require('backbone');
  var Port         = require('models/port');
  var DataLinkView = require('views/datalink');
  var DataLink     = require('models/datalink');
  var config       = require('config');
  var round        = Math.round;

  var ProcessorView = Backbone.View.extend({
    initialize: function (options) {
      this.paper = options.paper;
      this.group = this.paper.set();
      this.listenTo(this.model, 'change:x', this.updatePosition);
      this.listenTo(this.model, 'change:y', this.updatePosition);
    },

    renderPorts: function (ports, alignment) {
      var paper = this.paper;
      var group = this.group;

      var length = ports.length;
      var halfWidth = config.ui.processor.width / 2;
      var x = (alignment === 'left' ? -halfWidth : halfWidth);
      var anchor = (alignment === 'left' ? 'start' : 'end');
      var path;

      ports.each(function (port, i) {
        var y = (i - length / 2 + 0.5) * config.ui.port.lineHeight;
        var text = paper
          .text(
            x,
            y,
            port.get('name')
          )
          .attr({
            'text-anchor': anchor,
            fill: config.ui.port.text.fill,
            cursor: config.ui.port.cursor,
          })
          .data({
            offsetX: x,
            offsetY: y,
            model: port,
          })
          .hover(function () {
            text.attr({
              fill: config.ui.port.text.hover.fill
            });
          }, function () {
            text.attr({
              fill: config.ui.port.text.fill
            });
          })
          .drag(function onmove(dx, dy, x2, y2) {
            path.remove();
            var x = text.attr('x');
            var y = text.attr('y');
            if (alignment === 'left') {
              path = DataLinkView.buildPath(paper, x2, y2, x - 10, y);
            } else {
              path = DataLinkView.buildPath(paper, x + 10, y, x2, y2);
            }
          }, function onstart(x2, y2) {
            var x = text.attr('x');
            var y = text.attr('y');
            if (alignment === 'left') {
              path = DataLinkView.buildPath(paper, x2, y2, x - 10, y);
            } else {
              path = DataLinkView.buildPath(paper, x + 10, y, x2, y2);
            }
          }, function onend(x2, y2) {
            path.remove();
            var element = paper.getElementByPoint(x2, y2);
            var port2 = element.data('model');
            var port2View = element.data('view');
            if (port2 instanceof Port) {
              // swap port and port2 if port is ouput port
              if (port.getType() === 'output') {
                var t = port;
                port = port2;
                port2 = port;
              }
              if (port2.getType() === 'output') {
                var datalink = new DataLink(port, port2);
                var datalinkView = new DataLinkView({
                  model: datalink,
                  paper: paper
                });
                datalinkView.render();
              }
            }
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
      var x = round(-halfWidth - config.ui.port.marginLeftRight);
      var y = round(-height / 2 - config.ui.port.marginTopBottom);
      var box = paper
        .rect(
          x, y,
          round(2 * (halfWidth + config.ui.port.marginLeftRight)),
          round(height + 2 * config.ui.port.marginTopBottom),
          config.ui.processor.borderRadius
        )
        .attr({
          fill: config.ui.processor.fill,
          cursor: config.ui.processor.cursor,
          stroke: config.ui.processor.stroke
        })
        .data({
          offsetX: x,
          offsetY: y
        })
        .toBack()
        .drag(function onmove(dx, dy, x, y) {
          processor.translate(x - ox, y - oy);
          ox = x;
          oy = y;
        }, function onstart(x, y) {
          ox = x;
          oy = y;
        });
      box.node.setAttribute('class', 'processor');
      group.push(box);
      group.toBack();

      this.updatePosition();
    },

    updatePosition: function () {
      var processor = this.model;
      var x = processor.getX();
      var y = processor.getY();

      this.group.forEach(function (e) {
        e.attr({
          x: e.data('offsetX') + x,
          y: e.data('offsetY') + y
        });
      });
    }
  });

  return ProcessorView;
});

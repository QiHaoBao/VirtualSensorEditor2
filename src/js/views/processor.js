define(function (require) {
  var _        = require('underscore');
  var Backbone = require('backbone');
  var config   = require('config');

  var ProcessorView = Backbone.View.extend({
    initialize: function (options) {
      this.paper = options.paper;
      this.set = this.paper.set();
    },

    render: function () {
      var processor = this.model;
      var paper = this.paper;
      var set  = this.set;

      processor.inputPorts.each(function (port, i) {
        var text = paper.text(
          config.ui.port.marginLeftRight,
          i * config.ui.port.lineHeight + config.ui.port.marginTopBottom,
          port.get('name')
        ).attr({
          'text-anchor': 'start',
        });
        set.push(text);
      });

      var portsHeight = (processor.inputPorts.length - 1) * config.ui.port.lineHeight +
                        2 * config.ui.port.marginTopBottom;

      // container box
      var box = paper.rect(processor.get('x'), processor.get('y'), 100, portsHeight, 3);
      box.toBack();
      set.push(box);
    }
  });

  return ProcessorView;
});

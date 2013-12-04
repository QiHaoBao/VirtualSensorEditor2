define(function (require) {
  var _        = require('underscore');
  var Backbone = require('backbone');

  var ProcessorView = Backbone.View.extend({
    initialize: function (options) {
      this.paper = options.paper;
      this.set = this.paper.set();
    },

    render: function () {
      var processor = this.model;
      var paper = this.paper;
      var set  = this.set;

      // ports
      var portMarginLeft = 10;
      var portMarginTop = 10;
      var portLineHeight = 12;
      var portLineSpacing = 10;

      processor.inputPorts.each(function (port, i) {
        setTimeout(function () {
          var text = paper.text(
            portMarginLeft,
            i * (portLineHeight + portLineSpacing) + portMarginTop,
            port.get('name')
          );
          set.push(text);
        }, 0);
      });

      var portsHeight = processor.inputPorts.length * portLineHeight +
                        (processor.inputPorts.length - 1) * portLineSpacing +
                        2 * portMarginTop;
      console.log(portsHeight);

      // container box
      var box = paper.rect(processor.get('x'), processor.get('y'), 100, portsHeight, 3);
      box.toBack();
      set.push(box);

    }
  });

  return ProcessorView;
});

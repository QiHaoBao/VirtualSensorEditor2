define(function (require) {
  var _        = require('underscore');
  var Backbone = require('backbone');
  var config   = require('config');

  var DataLinkView = Backbone.View.extend({
    initialize: function (options) {
      this.paper = options.paper;
      this.dataflowView = options.dataflowView;
      this.listenTo(this.model, 'change:position', this.render);
    },

    render: function () {
      var datalink = this.model;

      var sender = datalink.getSender();
      var receiver = datalink.getReceiver();

      var senderPosition = this.dataflowView.getPortPosition(sender);
      var receiverPosition = this.dataflowView.getPortPosition(receiver);

      if (this.path) {
        this.path.remove();
      }
      this.path = DataLinkView.buildPath(
        this.paper,
        senderPosition.x, senderPosition.y,
        receiverPosition.x, receiverPosition.y
      );
    }
  }, {
    buildPath: function (paper, sx, sy, ex, ey) {
      var pathString = [
        'M', sx, ',', sy, ' ',
        'L', sx + 20, ',', sy, ' ',
        'C', sx + 100, ',', sy, ' ',
             ex - 100, ',', ey, ' ',
             ex - 20, ',', ey, ' ',
        'L', ex, ',', ey
      ].join('');
      return paper.path(pathString).attr('stroke', config.ui.datalink.stroke);
    }
  });

  return DataLinkView;
});

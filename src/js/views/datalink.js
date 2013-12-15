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

      // delay the computation of ports' positions to make sure that the 
      // processors' positions have been updated in the DOM
      var self = this;
      setTimeout(function () {
        var senderPosition = self.dataflowView.getPortPosition(sender);
        var receiverPosition = self.dataflowView.getPortPosition(receiver);

        if (self.path) {
          self.path.remove();
        }
        self.path = DataLinkView.buildPath(
          self.paper,
          senderPosition.x, senderPosition.y,
          receiverPosition.x, receiverPosition.y
        );
      }, 0);
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

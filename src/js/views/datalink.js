define(function (require) {
  var _        = require('underscore');
  var Backbone = require('backbone');
  var config   = require('config');

  var DataLinkView = Backbone.View.extend({
    initialize: function (options) {
      var paper = options.paper;
    },

    render: function () {
      var datalink = this.model;
      var sender = datalink.getSender();
      var receiver = datalink.getReceiver();
    }
  }, {
    buildPath: function (paper, sx, sy, ex, ey) {
      var pathString = [
        'M', sx, ',', sy, ' ',
        'C', sx + 100, ',', sy, ' ',
             ex - 100, ',', ey, ' ',
             ex, ',', ey
      ].join('');
      return paper.path(pathString).attr('stroke', config.ui.datalink.stroke);
    }
  });

  return DataLinkView;
});

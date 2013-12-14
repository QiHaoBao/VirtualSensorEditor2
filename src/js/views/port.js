define(function (require) {
  var _            = require('underscore');
  var Backbone     = require('backbone');
  var DataLink     = require('models/datalink');
  var DataLinkView = require('views/datalink');
  var template     = require('text!templates/port.html');
  require('jqueryui');

  var PortView = Backbone.View.extend({
    tagName: 'li',
    className: 'port',
    template: _.template(template),

    initialize: function (options) {
      this.paper = options.paper;
    },

    render: function () {
      var path;
      var paper = this.paper;
      var port = this.model;
      var portType = port.getType();
      var $el = this.$el;
      $el
        .html(this.template(this.model.attributes))
        .data('view', this)
        .attr('id', 'port-' + this.model.cid)
        .draggable({
          helper: function () {
            return $('<div/>').addClass('port-draggable-helper');
          },
          cursorAt: {
            left: 0,
            top: 0
          },
          drag: function (event, ui) {
            var portX = $el.offset().left + $el.width() / 2;
            var portY = $el.offset().top + $el.height() / 2;
            var cursorX = ui.offset.left;
            var cursorY = ui.offset.top;
            if (path) {
              path.remove();
              path = null;
            }
            if (portType === 'input') {
              path = DataLinkView.buildPath(paper, cursorX, cursorY, portX, portY);
            } else {
              path = DataLinkView.buildPath(paper, portX, portY, cursorX, cursorY);
            }
          },
          stop: function () {
            path.remove();
            path = null;
          }
        })
        .droppable({
          accept: portType === 'input' ? '.output.ports > .port' : '.input.ports > .port',
          hoverClass: 'droppable-hover',
          drop: function (event, ui) {
            var $originPort = $(ui.draggable);
            var originPortView = $originPort.data('view');
            var originPort = originPortView.model;

            var sender, receiver;
            if (portType === 'input') {
              sender = originPort;
              receiver = port;
            } else {
              receiver = originPort;
              sender = port;
            }
            var datalink = new DataLink(sender, receiver);

            var dataflow = port.getProcessor().getDataflow();
            dataflow.addDataLink(datalink);
          }
        });
      return this;
    }
  });

  return PortView;
});

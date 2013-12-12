define(function (require) {
  var _            = require('underscore');
  var Backbone     = require('backbone');
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
      var $el = this.$el;
      $el
        .html(this.template(this.model.attributes))
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
            path = DataLinkView.buildPath(paper, portX, portY, cursorX, cursorY);
          },
          stop: function () {
            path.remove();
            path = null;
          }
        });
      return this;
    }
  });

  return PortView;
});

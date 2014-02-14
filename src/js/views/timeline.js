define(function (require) {
  var _        = require('underscore');
  var Backbone = require('backbone');
  var template = require('text!templates/timeline.html');

  var TimelineView = new Backbone.View.extend({
    template: _.template(template),

    render: function () {
      this.model.extend()
    }
  });

  return TimelineView;
});

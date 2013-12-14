define(function (require) {
  var _ = require('underscore');
  var Backbone = require('backbone');

  var DataLink = Backbone.Model.extend({
    initialize: function (sender, receiver) {
      this.set('sender', sender);
      this.set('receiver', receiver);
      this.listenTo(sender, 'change:position', this.triggerChangePosition);
      this.listenTo(receiver, 'change:position', this.triggerChangePosition);
    },

    getSender: function () {
      return this.get('sender');
    },

    getReceiver: function () {
      return this.get('receiver');
    },

    triggerChangePosition: function () {
      this.trigger('change:position');
    }
  });

  return DataLink;
});

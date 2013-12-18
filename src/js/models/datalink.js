define(function (require) {
  var _ = require('underscore');
  var Backbone = require('backbone');

  var DataLink = Backbone.Model.extend({
    initialize: function (sender, receiver) {
      this.sender = sender;
      this.receiver = receiver;

      this.listenTo(sender, 'change:value', this.propagate);
      this.propagate();

      this.listenTo(sender, 'change:position', this.triggerChangePosition);
      this.listenTo(receiver, 'change:position', this.triggerChangePosition);
    },

    propagate: function () {
      this.receiver.setValue(this.sender.getValue());
    },

    getSender: function () {
      return this.sender;
    },

    getReceiver: function () {
      return this.receiver;
    },

    triggerChangePosition: function () {
      this.trigger('change:position');
    }
  });

  return DataLink;
});

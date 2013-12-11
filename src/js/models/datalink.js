define(function (require) {
  var _ = require('underscore');
  var Backbone = require('backbone');

  var DataLink = Backbone.Model.extend({
    initialize: function (sender, receiver) {
      this.set('sender', sender);
      this.set('receiver', receiver);
    },

    getSender: function () {
      return this.get('sender');
    },

    getReceiver: function () {
      return this.get('receiver');
    }
  });

  return DataLink;
});

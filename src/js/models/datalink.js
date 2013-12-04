define(function (require) {
  var _ = require('underscore');
  var Backbone = require('backbone');

  var DataLink = Backbone.Model.extend({
    initialize: function (receiveFrom, sendTo) {
      this.set('receiveFrom', receiveFrom);
      this.set('sendTo', sendTo);
    }
  });

  return DataLink;
});

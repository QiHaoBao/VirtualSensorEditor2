define(function (require) {
  var _        = require('underscore');
  var Backbone = require('backbone');
  var DataLink = require('models/datalink');

  var DataLinks = Backbone.Collection.extend({
    model: DataLink
  });

  return DataLinks;
});

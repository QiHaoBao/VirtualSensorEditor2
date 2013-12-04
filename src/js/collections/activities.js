define(function (require) {
  var _        = require('underscore');
  var Backbone = require('backbone');
  var Activity = require('models/activity');

  var Activities = Backbone.Collection.extend({
    model: Activities
  });

  return Activities;
});

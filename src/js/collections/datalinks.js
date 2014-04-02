define(function (require) {
  var _        = require('underscore');
  var Backbone = require('backbone');
  var DataLink = require('models/datalink');

  /**
   * @class DataLinks
   * @classdesc A collection of datalinks
   * @extends Backbone.Collection
   */
  var DataLinks = Backbone.Collection.extend(
    /** @lends DataLinks.prototype */
    {
    model: DataLink
  });

  return DataLinks;
});

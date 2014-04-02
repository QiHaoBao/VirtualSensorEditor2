define(function (require) {
  var _ = require('underscore');
  var Backbone = require('backbone');

  /**
   * @class DataLink
   * @classdesc DataLink represents the connection between two ports,
   *   in which one is an input port and the other one is an output port.
   */
  var DataLink = Backbone.Model.extend(
    /** @lends DataLink.prototype */
    {
    
    /**
     * @constructs DataLink
     * @param {Port} sender
     * @param {Port} receiver
     */
    initialize: function (sender, receiver) {
      this.sender = sender;
      this.receiver = receiver;

      this.listenTo(sender, 'change:value', this.propagate);
      this.propagate();

      this.listenTo(sender, 'change:position', this.triggerChangePosition);
      this.listenTo(receiver, 'change:position', this.triggerChangePosition);
    },

    /**
     * Propagate the value from the sender to the receiver.
     * 
     * @private
     * @method
     */
    propagate: function () {
      this.receiver.setValue(this.sender.getValue());
    },

    /**
     * Get the sender of the datalink.
     *
     * @public
     * @method
     * @returns {Port} 
     */
    getSender: function () {
      return this.sender;
    },

    /**
     * Get the receiver of the datalink.
     *
     * @public
     * @method
     * @returns {Port} 
     */
    getReceiver: function () {
      return this.receiver;
    },

    /**
     * Trigger an position change event.
     *
     * @private
     * @method
     */
    triggerChangePosition: function () {
      this.trigger('change:position');
    },

    toJSON: function () {
      return {
        sender: this.sender.cid,
        receiver: this.receiver.cid
      };
    }
  });

  return DataLink;
});

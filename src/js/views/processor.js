define(function (require) {
  var _            = require('underscore');
  var Backbone     = require('backbone');
  var Ports        = require('collections/ports');
  var PortsView    = require('views/ports');
  var DataLinkView = require('views/datalink');
  var DataLink     = require('models/datalink');
  var template     = require('text!templates/processor.html');

  var ProcessorView = Backbone.View.extend({
    template: _.template(template),

    initialize: function (options) {
      // ports
      this.inputPorts = new Ports();
      this.outputPorts = new Ports();

      // ports views
      this.inputPortsView = new PortsView({collection: this.inputPorts});
      this.outputPortsView = new PortsView({collection: this.outputPorts});

      // event listeners
      this.listenTo(this.model, 'change:x', this.updatePosition);
      this.listenTo(this.model, 'change:y', this.updatePosition);
    },

    render: function () {
      this.$el.html(this.template(this.model.attributes));

      // cache jquery objects
      this.$inputPorts = this.$('.input.ports');
      this.$outputPorts = this.$('.output.ports');

      // render ports
      this.inputPortsView.setElement(this.$inputPorts).render();
      this.outputPortsView.setElement(this.$outputPorts).render();

      return this;
    }
  });

  return ProcessorView;
});

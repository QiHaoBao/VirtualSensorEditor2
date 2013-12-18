define(function (require) {
  var _            = require('underscore');
  var Backbone     = require('backbone');
  var Ports        = require('collections/ports');
  var PortsView    = require('views/ports');
  var DataLinkView = require('views/datalink');
  var DataLink     = require('models/datalink');
  var template     = require('text!templates/processor.html');
  require('jqueryui');

  var ProcessorView = Backbone.View.extend({
    tagName: 'div',
    className: 'processor',
    template: _.template(template),

    initialize: function (options) {
      this.paper = options.paper;

      // ports
      this.inputPorts = this.model.getInputPorts();
      this.outputPorts = this.model.getOutputPorts();

      // ports views
      this.inputPortsView = new PortsView({
        collection: this.inputPorts,
        paper: this.paper
      });
      this.outputPortsView = new PortsView({
        collection: this.outputPorts,
        paper: this.paper
      });

      // event listeners
      this.listenTo(this.model, 'change:x', this.updatePosition);
      this.listenTo(this.model, 'change:y', this.updatePosition);
    },

    render: function () {
      var processor = this.model;

      this.$el
        .html(this.template(this.model.attributes))
        .data('view', this)
        .draggable({
          drag: function (event, ui) {
            processor.setPosition(ui.position.left, ui.position.top);
          },
          stop: function (event, ui) {
            processor.setPosition(ui.position.left, ui.position.top);
          }
        });

      // cache jquery objects
      this.$inputPorts = this.$('.input.ports');
      this.$outputPorts = this.$('.output.ports');

      // render ports
      this.inputPortsView.setElement(this.$inputPorts).render();
      this.outputPortsView.setElement(this.$outputPorts).render();

      var $outputPortValues = this.$('.output-port-values');
      this.outputPorts.each(function (port) {
        $('<li/>').text(port.getValue()).appendTo($outputPortValues);
      });

      this.updatePosition();

      return this;
    },

    updatePosition: function () {
      this.$el.css({
        left: this.model.getX(),
        top: this.model.getY()
      });
    }
  });

  return ProcessorView;
});

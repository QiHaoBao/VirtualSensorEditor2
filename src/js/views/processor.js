define(function (require) {
  var _              = require('underscore');
  var Backbone       = require('backbone');
  var Port           = require('models/port');
  var Ports          = require('collections/ports');
  var PortView       = require('views/port');
  var PortsView      = require('views/ports');
  var PhysicalSensor = require('models/physical_sensor');
  var DataLinkView   = require('views/datalink');
  var DataLink       = require('models/datalink');
  var TimelineView   = require('views/timeline');
  var Alert          = require('models/alert');
  var template       = require('text!templates/processor.html');
  var cubism         = require('cubism');
  var codemirror     = require('codemirror');

  require('jqueryui');

  var ProcessorView = Backbone.View.extend({
    tagName: 'div',
    className: 'processor',
    template: _.template(template),

    events: {
      'click .toolbar-button.edit': 'toggleCode',
      'click .toolbar-button.save': 'saveCode',
      'click .horizon': 'showTimeline',
      'click .add-port': 'showAddPortInput',
      'keyup .add-port-input': 'addInputPort',
      'click .remove': 'remove',
    },

    initialize: function (options) {
      this.paper = options.paper;

      // ports
      this.inputPorts = this.model.getInputPorts();
      this.outputPort = this.model.getOutputPort();

      // ports views
      this.inputPortsView = new PortsView({
        collection: this.inputPorts,
        paper: this.paper
      });
      this.outputPortView = new PortView({
        model: this.outputPort,
        paper: this.paper
      });

      // event listeners
      this.listenTo(this.model, 'change:x', this.updatePosition);
      this.listenTo(this.model, 'change:y', this.updatePosition);
      this.listenTo(this.inputPorts, 'add', this.render);
    },

    render: function () {
      var processor = this.model;

      this.$el
        .attr('id', 'processor-' + this.model.cid)
        .html(this.template(this.model.attributes))
        .data('view', this)
        .draggable({
          handle: '.name',
          drag: function (event, ui) {
            processor.setPosition(ui.position.left, ui.position.top);
          },
          stop: function (event, ui) {
            processor.setPosition(ui.position.left, ui.position.top);
          }
        });

      this.$addPort = this.$('.add-port');
      this.$addPortInput = this.$('.add-port-input');

      this.inputPortsView.setElement(this.$('.input-ports')).render();
      this.outputPortView.setElement(this.$('.output-port')).render();

      this.updatePosition();
      if (this.model instanceof Alert) {
        this.renderAlert();
      } else {
        _.defer(this.renderChart.bind(this));
      }

      if (this.model instanceof PhysicalSensor) {
        this.$('.input-ports-wrapper').hide();
      }

      var $code = this.$('.code textarea');
      this.codemirror = codemirror.fromTextArea($code.get(0), {
        mode: 'text/javascript',
      });
      this.codemirror.setSize('100%', '100px');

      return this;
    },

    showAddPortInput: function () {
      this.$addPort.addClass('active');
      this.$addPortInput.addClass('active');
    },

    addInputPort: function (e) {
      if (e.which === 13) { // enter key
        var name = this.$addPortInput.val();
        this.model.addInputPort(name);
      }
    },

    updatePosition: function () {
      this.$el.css({
        left: this.model.getX(),
        top: this.model.getY()
      });
    },

    renderAlert: function () {
      var self = this;
      var $alert = $('<div/>')
        .addClass('alert')
        .appendTo(this.$('.chart'));
      this.listenTo(this.outputPort, 'change:value', function () {
        if (self.outputPort.getValue()) {
          $alert.css({background: 'red'});
        } else {
          $alert.css({background: 'green'});
        }
      });
    },

    renderChart: function () {
      var self = this;
      var d3 = require('d3');
      var context = cubism.context()
          .serverDelay(0)
          .clientDelay(0)
          .step(1000)
          .size(this.$('.body').width());

      var metric = context.metric(function (start, stop, step, callback) {
        var values = [];
        start = +start;
        stop = +stop;

        while (start < stop) {
          start += step;
          values.push(self.outputPort.getValue());
        }

        callback(null, values);
      });

      d3.select(this.el).select('.chart').call(function(div) {
        div
          .datum(metric)
          .append('div')
            .attr('class', 'axis')
            .call(context.axis()
               .orient('top')
               .ticks(3)
               .tickSubdivide(3)
               .tickSize(1))
          .append("div")
            .attr("class", "horizon")
            .call(context.horizon()
              .height(30)
              .mode('mirror')
              .colors(["#bdd7e7","#bae4b3"]));
      });

      // On mousemove, reposition the chart values to match the rule.
      context.on("focus", function(i) {
        d3.select(self.el).select('.value')
          .style("right", i == null ? null : context.size() - i + "px");
      });
    },

    toggleCode: function () {
      var $code = this.$('.code');
      var $save = this.$('.save');
      if (this.isCodeShown) {
        $code.slideUp();
        $save.fadeOut();
      } else {
        this.codemirror.setValue(this.model.getActivityCode());
        _.defer(this.codemirror.refresh.bind(this.codemirror));
        $code.slideDown();
        $save.fadeIn();
      }
      this.isCodeShown = !this.isCodeShown;
    },

    saveCode: function () {
      var code = this.codemirror.getValue();
      this.model.setActivityCode(code);
    },

    showTimeline: function () {
      var view = new TimelineView({
        model: this.model
      });
      view.render();
      return false;
    },

    remove: function () {
      this.model.destroy();
      Backbone.View.prototype.remove.call(this);
    }
  });

  return ProcessorView;
});

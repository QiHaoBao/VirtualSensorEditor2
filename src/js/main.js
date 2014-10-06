require.config({
  paths: {
    jquery: 'lib/jquery-2.1.1',
    underscore: 'lib/underscore',
    backbone: 'lib/backbone',
    text: 'lib/text',
    raphael: 'lib/raphael',
    jqueryui: 'lib/jquery-ui-1.10.3.custom',
    d3: 'lib/d3.v2',
    cubism: 'lib/cubism.v1',
    codemirror: 'lib/codemirror',
    dygraph: 'lib/dygraph',
    datepair: 'lib/datepair',
    bootstrap_datepicker: 'lib/bootstrap-datepicker',
    jquery_datepair: 'lib/jquery.datepair',
    jquery_timepicker: 'lib/jquery.timepicker'
  },
  shim: {
    underscore: {
      exports: '_'
    },
    backbone: {
      deps: ['underscore', 'jquery'],
      exports: 'Backbone'
    },
    raphael: {
      exports: 'Raphael'
    },
    jqueryui: {
      deps: ['jquery']
    },
    d3: {
      exports: 'd3'
    },
    cubism: {
      deps: ['d3'],
      exports: 'cubism'
    },
    codemirror: {
      exports: 'CodeMirror'
    },
    dygraph: {
      exports: 'Dygraph'
    },
    bootstrap_datepicker: {
      deps: ['jquery']
    },
    jquery_timepicker: {
      deps: ['jquery']
    },
    datepair: {
      deps: ['jquery', 'bootstrap_datepicker', 'jquery_timepicker'],
      exports: 'datepair'
    },
    jquery_datepair: {
      deps: ['datepair']
    },
  },
  urlArgs: "bust=" +  Date.now()
});

require(['views/app'], function (App) {
  var app = window.app = new App({
    el: '.app'
  });
  app.render();
});

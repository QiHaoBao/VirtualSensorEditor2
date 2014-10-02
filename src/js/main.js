require.config({
  paths: {
    underscore: 'lib/underscore',
    backbone: 'lib/backbone',
    text: 'lib/text',
    raphael: 'lib/raphael',
    jqueryui: 'lib/jquery-ui-1.10.3.custom',
    d3: 'lib/d3.v2',
    cubism: 'lib/cubism.v1',
    codemirror: 'lib/codemirror',
    dygraph: 'lib/dygraph'
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
    }
  },
  urlArgs: "bust=" +  Date.now()
});

require(['views/app'], function (App) {
  var app = window.app = new App({
    el: '.app'
  });
  app.render();
});

require.config({
  paths: {
    underscore: 'lib/underscore',
    backbone: 'lib/backbone',
    text: 'lib/text',
    raphael: 'lib/raphael',
    jqueryui: 'lib/jquery-ui-1.10.3.custom',
    d3: 'lib/d3.v2'
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
    }
  },
  urlArgs: "bust=" +  Date.now()
});

require(['views/app'], function (App) {
  var app = new App({
    el: '.app'
  });
  app.render();
});

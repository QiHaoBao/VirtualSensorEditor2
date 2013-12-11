require.config({
  paths: {
    underscore: 'lib/underscore',
    backbone: 'lib/backbone',
    text: 'lib/text',
    raphael: 'lib/raphael'
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
    }
  },
  urlArgs: "bust=" +  Date.now()
});

require(['views/app'], function (App) {
  var app = new App({
    el: '.dataflow'
  });
  app.render();
});

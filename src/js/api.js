define(function (require) {
  var hostname = require('config').api.hostname;

  return {
    getLastReadingsFromAllDevices: function (options) {
      var url = [
        hostname,
        'getLastestReadingsFromAllDevices',
        options.timestamp,
        options.type,
        'json'
      ].join('/');
      $.getJSON(url, options.callback);
    }
  };
});

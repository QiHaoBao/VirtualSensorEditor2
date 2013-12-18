define(function (require) {
  var hostname = require('config').api.hostname;

  return {
    getLastReadingsFromAllDevices: function (options) {
      var url = [
        hostname,
        'last_readings_from_all_devices',
        options.timestamp,
        options.type,
        'json'
      ].join('/');
      $.getJSON(url, options.callback);
    }
  };
});

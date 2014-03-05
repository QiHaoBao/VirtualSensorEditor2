define(function (require) {
  var hostname = require('config').api.hostname;

  return {
    getLatestReadingsFromAllDevices: function (options) {
      var url = [
        hostname,
        'getLatestReadingsFromAllDevices',
        //options.timestamp,
        options.type,
        'json'
      ].join('/');
      $.ajax({
        url: url,
        type: 'GET',
        dataType: 'json',
        success: options.callback
      });
    },
    getSensorReadingsInTimeRange: function (options) {
      var values = [];
      for (var i = 0; i < 10000; ++i) {
        values.push(Math.random() * 100);
      }
      options.callback(values);
    }
  };
});

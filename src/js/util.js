define({
  random: function random(context, name) {
    var value = 0,
    values = [],
    i = 0,
    last;
    return context.metric(function(start, stop, step, callback) {
      start = +start, stop = +stop;
      if (isNaN(last)) last = start;
      while (last < stop) {
        last += step;
        value = Math.max(-10, Math.min(10, value + .8 * Math.random() - .4 + .2 * Math.cos(i += .2)));
        values.push(value);
      }
      callback(null, values = values.slice((start - stop) / step));
    }, name);
  }
})

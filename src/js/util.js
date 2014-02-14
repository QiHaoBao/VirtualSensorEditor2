define({
  construct: function (constructor, args) {
    function F() {
      return constructor.apply(this, args);
    }
    F.prototype = constructor.prototype;
    return new F();
  },

  getFunctionBody: function (f) {
    var s = f.toString();
    var body = s.slice(s.indexOf("{") + 1, s.lastIndexOf("}"));
    return body;
  }
});

(function() {
  describe("Fenix.MarkupPlugin", function() {
    var plugin;
    plugin = Fenix.MarkupPlugin;
    return describe("monospace", function() {
      return it("marks words surrounded in backticks as monospace", function() {
        return expect(plugin.format("hello `cruel` world")).toEqual("hello <tt>cruel</tt> world");
      });
    });
  });
}).call(this);

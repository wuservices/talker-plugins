(function() {
  describe("Newsline.MarkupPlugin", function() {
    var plugin;
    plugin = Newsline.MarkupPlugin;
    return describe("monospace", function() {
      it("works when string does not have backticks in it", function() {
        return expect(plugin.format("hello world")).toEqual("hello world");
      });
      it("does nothing when only a single backtick is in the text", function() {
        return expect(plugin.format("`hello world")).toEqual("`hello world");
      });
      return it("marks words surrounded in backticks as monospace", function() {
        return expect(plugin.format("hello `cruel` world")).toEqual("hello <tt>cruel</tt> world");
      });
    });
  });
}).call(this);

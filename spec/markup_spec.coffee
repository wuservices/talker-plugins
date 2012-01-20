describe "Fenix.MarkupPlugin", ->
  plugin = Fenix.MarkupPlugin
  describe "monospace", ->
    it "marks words surrounded in backticks as monospace", ->
      expect(plugin.format("hello `cruel` world")).toEqual "hello <tt>cruel</tt> world"

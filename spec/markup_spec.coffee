describe "Fenix.MarkupPlugin", ->
  plugin = Fenix.MarkupPlugin
  describe "monospace", ->
    it "works when string does not have backticks in it", ->
      expect(plugin.format("hello world")).toEqual "hello world"

    it "does nothing when only a single backtick is in the text", ->
      expect(plugin.format("`hello world")).toEqual "`hello world"

    it "marks words surrounded in backticks as monospace", ->
      expect(plugin.format("hello `cruel` world")).toEqual "hello <tt>cruel</tt> world"

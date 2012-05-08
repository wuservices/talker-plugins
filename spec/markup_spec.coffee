describe "Newsline.MarkupPlugin", ->
  plugin = Newsline.MarkupPlugin
  describe "monospace", ->
    it "works when string does not have backticks in it", ->
      expect(plugin.format("hello world")).toEqual "hello world"

    it "does nothing when only a single backtick is in the text", ->
      expect(plugin.format("`hello world")).toEqual "`hello world"

    it "marks words surrounded in backticks as monospace", ->
      expect(plugin.format("hello `cruel` world")).toEqual "hello <tt>cruel</tt> world"

    it "escapes HTML in the backticks", ->
      expect(plugin.format("`<b>HTML</b>`")).toEqual "<tt>&lt;b&gt;HTML&lt;/b&gt;</tt>"

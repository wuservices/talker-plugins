describe "Fenix.GithubLinks", ->
  plugin = Fenix.GithubLinks
  compare_url = 'https://github.com/newsline/fenix/compare/0f717f0...ec9b340'

  describe "matching", ->
    it "does not match in generic links to github", ->
      expect(plugin.isMatching("https://github.com/blog")).toBeFalsy()

    it "matches on compare links", ->
      expect(plugin.isMatching(compare_url)).toBeTruthy()

    it "matches compare links in the middle of messages", ->
      expect(plugin.isMatching("foo #{compare_url} bar")).toBeTruthy()

  describe "compare links", ->
    it "formats links", ->
      expected = "<a href=\"#{compare_url}\">" +
          "Compare newsline/fenix <span class=\"gh-ref\">0f717f0</span>...<span class=\"gh-ref\">ec9b340</span>" +
        "</a>"
      expect(plugin.format(compare_url)).toEqual(expected)

    it "formats links in the middle of messages", ->
      message = "some words #{compare_url} some other words"
      expect(plugin.format(message)).toMatch(/<a href/)

    it "formats multiple links in the same message", ->
      message = "#{compare_url} #{compare_url}"
      result = plugin.format(message)
      expect(result.match(/<a /g).length).toEqual(2)
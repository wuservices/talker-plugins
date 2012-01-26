describe "Newsline.GithubLinks", ->
  plugin = Newsline.GithubLinks
  commitMessage = '[user/somerepo] Do very - very - cool stuff - Some User – https://github.com/user/somerepo/commit/917b57b9604037fa40414ba2d4a762ec4d553dd3'
  repoUrl = 'https://github.com/someuser/somerepo'
  compareUrl = 'https://github.com/someuser/somerepo/compare/0f717f0...ec9b340'
  pullUrl = 'https://github.com/someuser/somerepo/pull/15'

  describe "matching", ->
    it "does not match in generic links to github", ->
      expect(plugin.isMatching("https://github.com/blog")).toBeFalsy()

    it "matches on commit messages", ->
      expect(plugin.isMatching(commitMessage)).toBeTruthy()

    it "matches on repo urls", ->
      expect(plugin.isMatching(repoUrl)).toBeTruthy()

    it "matches on compare links", ->
      expect(plugin.isMatching(compareUrl)).toBeTruthy()

    it "matches compare links in the middle of messages", ->
      expect(plugin.isMatching("foo #{compareUrl} bar")).toBeTruthy()

    it "matches on pull links", ->
      expect(plugin.isMatching("foo #{pullUrl} bar")).toBeTruthy()

  describe "commit messages", ->
    it "formats commit messages", ->
      expected = '[user/somerepo] ' +
        '<a href="https://github.com/user/somerepo/commit/917b57b9604037fa40414ba2d4a762ec4d553dd3">' +
          'Do very - very - cool stuff' +
        '</a> - Some User'
      expect(plugin.format(commitMessage)).toEqual(expected)

  describe "compare links", ->
    it "formats links", ->
      expected = "<a href=\"#{compareUrl}\" class=\"gh-link\">" +
          "<span class=\"gh-icon\"></span> " +
          "someuser/somerepo <span class=\"gh-ref\">0f717f0</span>...<span class=\"gh-ref\">ec9b340</span>" +
        "</a>"
      expect(plugin.format(compareUrl)).toEqual(expected)

    it "formats links in the middle of messages", ->
      message = "some words #{compareUrl} some other words"
      expect(plugin.format(message)).toMatch(/<a href/)

    it "formats multiple links in the same message", ->
      message = "#{compareUrl} #{compareUrl}"
      result = plugin.format(message)
      expect(result.match(/<a /g).length).toEqual(2)

  describe "repo links", ->
    it "formats links", ->
      expected = "<a href=\"#{repoUrl}\" class=\"gh-link\"><span class=\"gh-icon\"></span> someuser/somerepo</a>"
      expect(plugin.format(repoUrl)).toEqual(expected)

    it "formats links with extra slash at the end", ->
      expected = "<a href=\"#{repoUrl}/\" class=\"gh-link\"><span class=\"gh-icon\"></span> someuser/somerepo</a> some words"
      expect(plugin.format("#{repoUrl}/ some words")).toEqual(expected)

  describe "pull links", ->
    it "formats links", ->
      expected = "<a href=\"#{pullUrl}\" class=\"gh-link\"><span class=\"gh-icon\"></span> someuser/somerepo pull #15</a>"
      expect(plugin.format(pullUrl)).toEqual(expected)

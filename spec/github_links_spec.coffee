describe "Newsline.GithubLinks", ->
  plugin = Newsline.GithubLinks
  commit_message = '[user/somerepo] Do very - very - cool stuff - Some User – https://github.com/user/somerepo/commit/917b57b9604037fa40414ba2d4a762ec4d553dd3'
  repo_url = 'https://github.com/someuser/somerepo'
  compare_url = 'https://github.com/someuser/somerepo/compare/0f717f0...ec9b340'
  pull_url = 'https://github.com/someuser/somerepo/pull/15'

  describe "matching", ->
    it "does not match in generic links to github", ->
      expect(plugin.isMatching("https://github.com/blog")).toBeFalsy()

    it "matches on commit messages", ->
      expect(plugin.isMatching(commit_message)).toBeTruthy()

    it "matches on repo urls", ->
      expect(plugin.isMatching(repo_url)).toBeTruthy()

    it "matches on compare links", ->
      expect(plugin.isMatching(compare_url)).toBeTruthy()

    it "matches compare links in the middle of messages", ->
      expect(plugin.isMatching("foo #{compare_url} bar")).toBeTruthy()

    it "matches on pull links", ->
      expect(plugin.isMatching("foo #{pull_url} bar")).toBeTruthy()

  describe "commit messages", ->
    it "formats commit messages", ->
      expected = '[user/somerepo] ' +
        '<a href="https://github.com/user/somerepo/commit/917b57b9604037fa40414ba2d4a762ec4d553dd3">' +
          'Do very - very - cool stuff' +
        '</a> - Some User'
      expect(plugin.format(commit_message)).toEqual(expected)

  describe "compare links", ->
    it "formats links", ->
      expected = "<a href=\"#{compare_url}\" class=\"gh-link\">" +
          "<span class=\"gh-icon\"></span> " +
          "someuser/somerepo <span class=\"gh-ref\">0f717f0</span>...<span class=\"gh-ref\">ec9b340</span>" +
        "</a>"
      expect(plugin.format(compare_url)).toEqual(expected)

    it "formats links in the middle of messages", ->
      message = "some words #{compare_url} some other words"
      expect(plugin.format(message)).toMatch(/<a href/)

    it "formats multiple links in the same message", ->
      message = "#{compare_url} #{compare_url}"
      result = plugin.format(message)
      expect(result.match(/<a /g).length).toEqual(2)

  describe "repo links", ->
    it "formats links", ->
      expected = "<a href=\"#{repo_url}\" class=\"gh-link\"><span class=\"gh-icon\"></span> someuser/somerepo</a>"
      expect(plugin.format(repo_url)).toEqual(expected)

    it "formats links with extra slash at the end", ->
      expected = "<a href=\"#{repo_url}/\" class=\"gh-link\"><span class=\"gh-icon\"></span> someuser/somerepo</a> some words"
      expect(plugin.format("#{repo_url}/ some words")).toEqual(expected)

  describe "pull links", ->
    it "formats links", ->
      expected = "<a href=\"#{pull_url}\" class=\"gh-link\"><span class=\"gh-icon\"></span> someuser/somerepo pull #15</a>"
      expect(plugin.format(pull_url)).toEqual(expected)

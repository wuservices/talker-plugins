(function() {
  describe("Newsline.GithubLinks", function() {
    var commitMessage, compareUrl, plugin, pullUrl, repoUrl;
    plugin = Newsline.GithubLinks;
    commitMessage = '[user/somerepo] Do very - very - cool stuff - Some User – https://github.com/user/somerepo/commit/917b57b9604037fa40414ba2d4a762ec4d553dd3';
    repoUrl = 'https://github.com/someuser/somerepo';
    compareUrl = 'https://github.com/someuser/somerepo/compare/0f717f0...ec9b340';
    pullUrl = 'https://github.com/someuser/somerepo/pull/15';
    describe("matching", function() {
      it("does not match in generic links to github", function() {
        return expect(plugin.isMatching("https://github.com/blog")).toBeFalsy();
      });
      it("matches on commit messages", function() {
        return expect(plugin.isMatching(commitMessage)).toBeTruthy();
      });
      it("matches on repo urls", function() {
        return expect(plugin.isMatching(repoUrl)).toBeTruthy();
      });
      it("matches on compare links", function() {
        return expect(plugin.isMatching(compareUrl)).toBeTruthy();
      });
      it("matches compare links in the middle of messages", function() {
        return expect(plugin.isMatching("foo " + compareUrl + " bar")).toBeTruthy();
      });
      return it("matches on pull links", function() {
        return expect(plugin.isMatching("foo " + pullUrl + " bar")).toBeTruthy();
      });
    });
    describe("commit messages", function() {
      return it("formats commit messages", function() {
        var expected;
        expected = '[user/somerepo] ' + '<a href="https://github.com/user/somerepo/commit/917b57b9604037fa40414ba2d4a762ec4d553dd3">' + 'Do very - very - cool stuff' + '</a> - Some User';
        return expect(plugin.format(commitMessage)).toEqual(expected);
      });
    });
    describe("compare links", function() {
      it("formats links", function() {
        var expected;
        expected = ("<a href=\"" + compareUrl + "\" class=\"gh-link\">") + "<span class=\"gh-icon\"></span> " + "someuser/somerepo <span class=\"gh-ref\">0f717f0</span>...<span class=\"gh-ref\">ec9b340</span>" + "</a>";
        return expect(plugin.format(compareUrl)).toEqual(expected);
      });
      it("formats links in the middle of messages", function() {
        var message;
        message = "some words " + compareUrl + " some other words";
        return expect(plugin.format(message)).toMatch(/<a href/);
      });
      return it("formats multiple links in the same message", function() {
        var message, result;
        message = "" + compareUrl + " " + compareUrl;
        result = plugin.format(message);
        return expect(result.match(/<a /g).length).toEqual(2);
      });
    });
    describe("repo links", function() {
      it("formats links", function() {
        var expected;
        expected = "<a href=\"" + repoUrl + "\" class=\"gh-link\"><span class=\"gh-icon\"></span> someuser/somerepo</a>";
        return expect(plugin.format(repoUrl)).toEqual(expected);
      });
      return it("formats links with extra slash at the end", function() {
        var expected;
        expected = "<a href=\"" + repoUrl + "/\" class=\"gh-link\"><span class=\"gh-icon\"></span> someuser/somerepo</a> some words";
        return expect(plugin.format("" + repoUrl + "/ some words")).toEqual(expected);
      });
    });
    return describe("pull links", function() {
      return it("formats links", function() {
        var expected;
        expected = "<a href=\"" + pullUrl + "\" class=\"gh-link\"><span class=\"gh-icon\"></span> someuser/somerepo pull #15</a>";
        return expect(plugin.format(pullUrl)).toEqual(expected);
      });
    });
  });
}).call(this);

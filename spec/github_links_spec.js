(function() {
  describe("Newsline.GithubLinks", function() {
    var commit_message, compare_url, plugin, pull_url, repo_url;
    plugin = Newsline.GithubLinks;
    commit_message = '[user/somerepo] Do very - very - cool stuff - Some User – https://github.com/user/somerepo/commit/917b57b9604037fa40414ba2d4a762ec4d553dd3';
    repo_url = 'https://github.com/someuser/somerepo';
    compare_url = 'https://github.com/someuser/somerepo/compare/0f717f0...ec9b340';
    pull_url = 'https://github.com/someuser/somerepo/pull/15';
    describe("matching", function() {
      it("does not match in generic links to github", function() {
        return expect(plugin.isMatching("https://github.com/blog")).toBeFalsy();
      });
      it("matches on commit messages", function() {
        return expect(plugin.isMatching(commit_message)).toBeTruthy();
      });
      it("matches on repo urls", function() {
        return expect(plugin.isMatching(repo_url)).toBeTruthy();
      });
      it("matches on compare links", function() {
        return expect(plugin.isMatching(compare_url)).toBeTruthy();
      });
      it("matches compare links in the middle of messages", function() {
        return expect(plugin.isMatching("foo " + compare_url + " bar")).toBeTruthy();
      });
      return it("matches on pull links", function() {
        return expect(plugin.isMatching("foo " + pull_url + " bar")).toBeTruthy();
      });
    });
    describe("commit messages", function() {
      return it("formats commit messages", function() {
        var expected;
        expected = '[user/somerepo] ' + '<a href="https://github.com/user/somerepo/commit/917b57b9604037fa40414ba2d4a762ec4d553dd3">' + 'Do very - very - cool stuff' + '</a> - Some User';
        return expect(plugin.format(commit_message)).toEqual(expected);
      });
    });
    describe("compare links", function() {
      it("formats links", function() {
        var expected;
        expected = ("<a href=\"" + compare_url + "\" class=\"gh-link\">") + "<span class=\"gh-icon\"></span> " + "someuser/somerepo <span class=\"gh-ref\">0f717f0</span>...<span class=\"gh-ref\">ec9b340</span>" + "</a>";
        return expect(plugin.format(compare_url)).toEqual(expected);
      });
      it("formats links in the middle of messages", function() {
        var message;
        message = "some words " + compare_url + " some other words";
        return expect(plugin.format(message)).toMatch(/<a href/);
      });
      return it("formats multiple links in the same message", function() {
        var message, result;
        message = "" + compare_url + " " + compare_url;
        result = plugin.format(message);
        return expect(result.match(/<a /g).length).toEqual(2);
      });
    });
    describe("repo links", function() {
      it("formats links", function() {
        var expected;
        expected = "<a href=\"" + repo_url + "\" class=\"gh-link\"><span class=\"gh-icon\"></span> someuser/somerepo</a>";
        return expect(plugin.format(repo_url)).toEqual(expected);
      });
      return it("formats links with extra slash at the end", function() {
        var expected;
        expected = "<a href=\"" + repo_url + "/\" class=\"gh-link\"><span class=\"gh-icon\"></span> someuser/somerepo</a> some words";
        return expect(plugin.format("" + repo_url + "/ some words")).toEqual(expected);
      });
    });
    return describe("pull links", function() {
      return it("formats links", function() {
        var expected;
        expected = "<a href=\"" + pull_url + "\" class=\"gh-link\"><span class=\"gh-icon\"></span> someuser/somerepo pull #15</a>";
        return expect(plugin.format(pull_url)).toEqual(expected);
      });
    });
  });
}).call(this);

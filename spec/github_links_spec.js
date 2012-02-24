(function() {

  describe("Newsline.GithubLinks", function() {
    var commitMessage, commitUrl, compareTagsUrl, compareUrl, githubIcon, plugin, pullUrl, repoUrl;
    plugin = Newsline.GithubLinks;
    repoUrl = 'https://github.com/someuser/somerepo';
    compareUrl = 'https://github.com/someuser/somerepo/compare/0f717f0^...ec9b340';
    compareTagsUrl = 'https://github.com/someuser/somerepo/compare/v1.0.0...v1.0.1';
    pullUrl = 'https://github.com/someuser/somerepo/pull/15';
    commitUrl = 'https://github.com/someuser/somerepo/commit/917b57b9604037fa40414ba2d4a762ec4d553dd3';
    commitMessage = "[someuser/somerepo] Do very - very - cool stuff - Some User – " + commitUrl;
    githubIcon = '<span class="gh-icon"></span>';
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
        expected = '[someuser/somerepo] ' + '<a href="https://github.com/someuser/somerepo/commit/917b57b9604037fa40414ba2d4a762ec4d553dd3">' + 'Do very - very - cool stuff' + '</a> - Some User';
        return expect(plugin.format(commitMessage)).toEqual(expected);
      });
    });
    describe("compare links", function() {
      it("formats links to SHAs", function() {
        var expected;
        expected = ("<a href=\"" + compareUrl + "\" class=\"gh-button\">" + githubIcon + " ") + "someuser/somerepo <span class=\"gh-ref\">0f717f0^</span>...<span class=\"gh-ref\">ec9b340</span>" + "</a>";
        return expect(plugin.format(compareUrl)).toEqual(expected);
      });
      it("formats links to tags", function() {
        var expected;
        expected = ("<a href=\"" + compareTagsUrl + "\" class=\"gh-button\">" + githubIcon + " ") + "someuser/somerepo <span class=\"gh-ref\">v1.0.0</span>...<span class=\"gh-ref\">v1.0.1</span>" + "</a>";
        return expect(plugin.format(compareTagsUrl)).toEqual(expected);
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
    describe("commit links", function() {
      it("formats links", function() {
        var expected;
        expected = ("<a href=\"" + commitUrl + "\" class=\"gh-button\">" + githubIcon + " ") + "someuser/somerepo <span class=\"gh-ref\">917b57b</span>" + "</a>";
        return expect(plugin.format(commitUrl)).toEqual(expected);
      });
      it("formats links in the middle of messages", function() {
        var message;
        message = "some words " + commitUrl + " some other words";
        return expect(plugin.format(message)).toMatch(/<a href/);
      });
      return it("formats multiple links in the same message", function() {
        var message, result;
        message = "" + commitUrl + " " + commitUrl;
        result = plugin.format(message);
        return expect(result.match(/<a /g).length).toEqual(2);
      });
    });
    describe("repo links", function() {
      it("formats links", function() {
        var expected;
        expected = "<a href=\"" + repoUrl + "\" class=\"gh-button\">" + githubIcon + " someuser/somerepo</a>";
        return expect(plugin.format(repoUrl)).toEqual(expected);
      });
      return it("formats links with extra slash at the end", function() {
        var expected;
        expected = "<a href=\"" + repoUrl + "/\" class=\"gh-button\">" + githubIcon + " someuser/somerepo</a> some words";
        return expect(plugin.format("" + repoUrl + "/ some words")).toEqual(expected);
      });
    });
    describe("pull links", function() {
      return it("formats links", function() {
        var expected;
        expected = "<a href=\"" + pullUrl + "\" class=\"gh-button\">" + githubIcon + " someuser/somerepo pull #15</a>";
        return expect(plugin.format(pullUrl)).toEqual(expected);
      });
    });
    return describe("other links", function() {
      return it("formats links", function() {
        var expected, url;
        url = "https://github.com/some/other/path?with_query";
        expected = "<a href=\"" + url + "\" class=\"gh-link\">" + githubIcon + " github.com/some/other/path?with_query</a>";
        return expect(plugin.format(url)).toEqual(expected);
      });
    });
  });

}).call(this);

(function() {
  describe("Fenix.GithubLinks", function() {
    var compare_url, plugin;
    plugin = Fenix.GithubLinks;
    compare_url = 'https://github.com/newsline/fenix/compare/0f717f0...ec9b340';
    describe("matching", function() {
      it("does not match in generic links to github", function() {
        return expect(plugin.isMatching("https://github.com/blog")).toBeFalsy();
      });
      it("matches on compare links", function() {
        return expect(plugin.isMatching(compare_url)).toBeTruthy();
      });
      return it("matches compare links in the middle of messages", function() {
        return expect(plugin.isMatching("foo " + compare_url + " bar")).toBeTruthy();
      });
    });
    return describe("compare links", function() {
      it("formats links", function() {
        var expected;
        expected = ("<a href=\"" + compare_url + "\" class=\"gh-link\">") + "<span class=\"gh-icon\"></span> " + "newsline/fenix <span class=\"gh-ref\">0f717f0</span>...<span class=\"gh-ref\">ec9b340</span>" + "</a>";
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
  });
}).call(this);

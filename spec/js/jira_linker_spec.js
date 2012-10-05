
describe("Newsline.JiraLinker", function() {
  var jiraBase, plugin;
  plugin = Newsline.JiraLinker;
  jiraBase = "https://infotorg.atlassian.net/browse";
  it("formats links to LINK-nnnn", function() {
    var expected;
    expected = "Check out <a href=\"" + jiraBase + "/LINK-5\">LINK-5</a>!";
    return expect(plugin.format("Check out LINK-5!")).toEqual(expected);
  });
  return it("does not touch URLs containing issue names", function() {
    var original;
    original = "http://foo.com/LINK-5";
    return expect(plugin.format(original)).toEqual(original);
  });
});

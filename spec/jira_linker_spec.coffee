describe "Newsline.JiraLinker", ->
  plugin = Newsline.JiraLinker
  jiraBase = "https://infotorg.atlassian.net/browse"

  it "formats links to LINK-nnnn", ->
    expected = """Check out <a href="#{jiraBase}/LINK-5">LINK-5</a>!"""
    expect(plugin.format "Check out LINK-5!").toEqual expected

  it "does not touch URLs containing issue names", ->
    original = "http://foo.com/LINK-5"
    expect(plugin.format original).toEqual original

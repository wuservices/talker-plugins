describe "Fenix.CiColorizer", ->
  plugin = Fenix.CiColorizer
  message = "CI: Some_project build #276 [the-branch] SUCCESS in 2m -- http://"

  describe "matching", ->
    it "matches the message '#{message}'", ->
      expect(plugin.isMatching(message)).toBeTruthy()

    it "does not match some other message regarding CI", ->
      expect(plugin.isMatching("CI: what are you doing?")).toBeFalsy()

  describe "formatting", ->
    it "formats the message", ->
      result = plugin.format(message)
      expect(result).toEqual "CI: Some_project <a href=\"http://\">build #276</a> [the-branch] <span class=\"ci-success\">SUCCESS</span> in 2m"

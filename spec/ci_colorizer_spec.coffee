describe "Newsline.CiColorizer", ->
  plugin = Newsline.CiColorizer
  message = "CI: Some_project build #276 [a-branch, version-1.0] SUCCESS in 2m -- http://"

  describe "matching", ->
    it "matches the message '#{message}'", ->
      expect(plugin.isMatching(message)).toBeTruthy()

    it "does not match some other message regarding CI", ->
      expect(plugin.isMatching("CI: what are you doing?")).toBeFalsy()

  describe "formatting", ->
    it "formats the message", ->
      expected =
        '<span class="ci-success">' +
          '<a href="http://">Some_project build #276</a> ' +
          '(<span class="ci-branch">a-branch</span>, <span class="ci-branch">version-1.0</span>) in 2m' +
        '</span>'
      result = plugin.format(message)
      expect(result).toEqual expected

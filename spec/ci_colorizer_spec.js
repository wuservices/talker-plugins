(function() {

  describe("Newsline.CiColorizer", function() {
    var message, plugin;
    plugin = Newsline.CiColorizer;
    message = "CI: Some_project build #276 [a-branch, version-1.0] SUCCESS in 2m -- http://";
    describe("matching", function() {
      it("matches the message '" + message + "'", function() {
        return expect(plugin.isMatching(message)).toBeTruthy();
      });
      return it("does not match some other message regarding CI", function() {
        return expect(plugin.isMatching("CI: what are you doing?")).toBeFalsy();
      });
    });
    return describe("formatting", function() {
      return it("formats the message", function() {
        var expected, result;
        expected = 'Some_project <a href="http://">build #276</a> ' + '<span class="ci-branch">a-branch</span> <span class="ci-branch">version-1.0</span> ' + '<span class="ci-success">SUCCESS</span> in 2m';
        result = plugin.format(message);
        return expect(result).toEqual(expected);
      });
    });
  });

}).call(this);

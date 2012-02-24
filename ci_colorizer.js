(function() {
  var ciMessageMatcher, formatBranches;

  if (window.Newsline == null) window.Newsline = {};

  ciMessageMatcher = /^CI: (\S+ build #\d+) \[([^\]]+)\] (\S+)( in \w+) -- (.*)$/;

  formatBranches = function(branchspec) {
    var branch, branches;
    branches = branchspec.split(', ');
    return ((function() {
      var _i, _len, _results;
      _results = [];
      for (_i = 0, _len = branches.length; _i < _len; _i++) {
        branch = branches[_i];
        _results.push("<span class=\"ci-branch\">" + branch + "</span>");
      }
      return _results;
    })()).join(', ');
  };

  window.Newsline.CiColorizer = {
    isMatching: function(text) {
      return text.match(ciMessageMatcher);
    },
    format: function(text) {
      var branches, build, matches, original, outcome, outcomeClass, outro, url;
      matches = text.match(ciMessageMatcher);
      original = matches[0], build = matches[1], branches = matches[2], outcome = matches[3], outro = matches[4], url = matches[5];
      outcomeClass = outcome.toLowerCase();
      return ("<span class=\"ci-" + outcomeClass + "\">") + ("<a href=\"" + url + "\">" + build + "</a> ") + ("(" + (formatBranches(branches)) + ")" + outro) + "</span>";
    }
  };

  plugin.onMessageReceived = function(event) {
    if (event.type !== "message") return true;
    if (Newsline.CiColorizer.isMatching(event.content)) {
      Talker.insertMessage(event, Newsline.CiColorizer.format(event.content));
      return false;
    } else {
      return true;
    }
  };

  if (typeof jQuery !== "undefined" && jQuery !== null) {
    jQuery(function($) {
      if ($('head style[data-style-for=ci-colorizer]').length === 0) {
        return $('head').append("<style type=\"text/css\">\n  .ci-branch { font-family: monospace; }\n\n  .ci-success a { color: green; }\n  .ci-failure a { color: red; }\n  .ci-aborted a { color: #550; }\n</style>");
      }
    });
  }

}).call(this);

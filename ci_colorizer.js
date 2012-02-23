(function() {
  var ciMessageMatcher;

  if (window.Newsline == null) window.Newsline = {};

  ciMessageMatcher = /^(CI: \S+ )(build #\d+)( \[\S+\] )(\S+)( in \w+) -- (.*)$/;

  window.Newsline.CiColorizer = {
    isMatching: function(text) {
      return text.match(ciMessageMatcher);
    },
    format: function(text) {
      var branch, build, intro, matches, original, outcome, outro, url;
      matches = text.match(ciMessageMatcher);
      original = matches[0], intro = matches[1], build = matches[2], branch = matches[3], outcome = matches[4], outro = matches[5], url = matches[6];
      return "" + intro + "<a href=\"" + url + "\">" + build + "</a>" + branch + "<span class=\"ci-" + (outcome.toLowerCase()) + "\">" + outcome + "</span>" + outro;
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
        return $('head').append("<style type=\"text/css\">\n  .ci-success { color: green; }\n  .ci-failure { color: red; }\n  .ci-aborted { color: #550; }\n</style>");
      }
    });
  }

}).call(this);

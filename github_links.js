(function() {
  var generateGithubLink, githubLink, _ref;
  if ((_ref = window.Fenix) == null) {
    window.Fenix = {};
  }
  githubLink = /https:\/\/github.com\/(\w+)\/(\w+)\/(\w+)\/(\S+)/g;
  generateGithubLink = function(url, text) {
    return "<a href=\"" + url + "\">" + text + "</a>";
  };
  window.Fenix.GithubLinks = {
    isMatching: function(text) {
      return text.match(githubLink);
    },
    format: function(text) {
      return text = text.replace(githubLink, function(url, user, repo, action, rest) {
        var base, diff, dummy, other, _ref2;
        if (action === 'compare') {
          _ref2 = rest.match(/^([^.]+)(\.{2,3})([^?\/]+)/), dummy = _ref2[0], base = _ref2[1], diff = _ref2[2], other = _ref2[3];
          return generateGithubLink(url, "Compare " + user + "/" + repo + " <span class=\"gh-ref\">" + base + "</span>" + diff + "<span class=\"gh-ref\">" + other + "</span>");
        }
      });
    }
  };
  plugin.onMessageReceived = function(event) {
    if (event.type !== "message") {
      return true;
    }
    if (Fenix.GithubLinks.isMatching(event.content)) {
      Talker.insertMessage(event, Fenix.GithubLinks.format(event.content));
      return false;
    } else {
      return true;
    }
  };
  if (typeof jQuery !== "undefined" && jQuery !== null) {
    jQuery(function($) {
      if ($('head style[data-style-for=github-links]').length === 0) {
        return $('head').append("<style type=\"text/css\">\n</style>");
      }
    });
  }
}).call(this);

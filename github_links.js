(function() {
  var generateGithubLink, githubLink, _ref;
  var __slice = Array.prototype.slice;
  if ((_ref = window.Fenix) == null) {
    window.Fenix = {};
  }
  githubLink = /https:\/\/github.com\/(\w+)\/([^\/]+)(\/(\S+)?)?/g;
  generateGithubLink = function(url, text) {
    return "<a href=\"" + url + "\" class=\"gh-link\"><span class=\"gh-icon\"></span> " + text + "</a>";
  };
  window.Fenix.GithubLinks = {
    isMatching: function(text) {
      return text.match(githubLink);
    },
    format: function(text) {
      return text = text.replace(githubLink, function(url, user, repo, rest_with_slash, rest) {
        var action, base, diff, dummy, other, params, _ref2, _ref3, _ref4;
        if (typeof rest === "string") {
          _ref2 = rest.split('/'), action = _ref2[0], params = 2 <= _ref2.length ? __slice.call(_ref2, 1) : [];
        } else {
          _ref3 = [void 0, []], action = _ref3[0], params = _ref3[1];
        }
        if (action === void 0 || action === "") {
          return generateGithubLink(url, "" + user + "/" + repo);
        } else if (action === 'compare') {
          _ref4 = params[0].match(/^([^.]+)(\.{2,3})([^?\/]+)/), dummy = _ref4[0], base = _ref4[1], diff = _ref4[2], other = _ref4[3];
          return generateGithubLink(url, "" + user + "/" + repo + " <span class=\"gh-ref\">" + base + "</span>" + diff + "<span class=\"gh-ref\">" + other + "</span>");
        } else {
          return url;
        }
      });
    }
  };
  plugin.onMessageReceived = function(event) {
    var formatted;
    if (event.type !== "message") {
      return true;
    }
    if (Fenix.GithubLinks.isMatching(event.content)) {
      formatted = Fenix.GithubLinks.format(event.content);
      if (formatted !== event.content) {
        Talker.insertMessage(event, formatted);
        return false;
      }
    }
    return true;
  };
  if (typeof jQuery !== "undefined" && jQuery !== null) {
    jQuery(function($) {
      if ($('head style[data-style-for=github-links]').length === 0) {
        return $('head').append("<style type=\"text/css\">\n  .gh-icon {\n    background: url(\"https://github.com/favicon.ico\");\n    display: inline-block;\n    height: 16px;\n    vertical-align: middle;\n    width: 16px;\n  }\n\n  .gh-link {\n    -moz-border-radius: 3px;\n    -webkit-border-radius: 3px;\n    border-radius: 3px;\n    filter: progid:DXImageTransform.Microsoft.gradient(startColorStr='#f9f9f9', EndColorStr='#e1e1e1');\n    /* IE6,IE7 */\n    -ms-filter: \"progid:DXImageTransform.Microsoft.gradient(startColorStr='#f9f9f9', EndColorStr='#e1e1e1')\";\n    /* IE8 */\n    background-image: -moz-linear-gradient(top, #f9f9f9, #e1e1e1);\n    /* FF3.6 */\n    background-image: -webkit-gradient(linear, left top, left bottom, color-stop(0, #f9f9f9), color-stop(1, #e1e1e1));\n    /* Saf4+, Chrome */\n    -moz-box-shadow:  0 0 1px rgba(0, 0, 0, 0.2);\n    -webkit-box-shadow:  0 0 1px rgba(0, 0, 0, 0.2);\n    box-shadow:  0 0 1px rgba(0, 0, 0, 0.2);\n    -khtml-user-select: none;\n    -moz-user-select: none;\n    -o-user-select: none;\n    -webkit-user-select: none;\n    user-select: none;\n    border: 1px solid #bbb;\n    color: #000;\n    cursor: pointer;\n    display: inline-block;\n    padding: 3px;\n    text-align: center;\n    padding: 5px;\n    text-decoration: none !important;\n    }\n    .gh-link:hover {\n      -moz-box-shadow:  0 0 5px rgba(7, 94, 131, 0.4);\n      -webkit-box-shadow:  0 0 5px rgba(7, 94, 131, 0.4);\n      box-shadow:  0 0 5px rgba(7, 94, 131, 0.4); }\n    .gh-link[disabled] {\n      background: #eee;\n      border: 1px solid #ccc;\n      box-shadow: none !important;\n      color: #a6a6a6;\n      cursor: default; }\n    .gh-link.pressed, .gh-link:active {\n      filter: progid:DXImageTransform.Microsoft.gradient(startColorStr='#d4d4d4', EndColorStr='#ececec');\n      /* IE6,IE7 */\n      -ms-filter: \"progid:DXImageTransform.Microsoft.gradient(startColorStr='#d4d4d4', EndColorStr='#ececec')\";\n      /* IE8 */\n      background-image: -moz-linear-gradient(top, #d4d4d4, #ececec);\n      /* FF3.6 */\n      background-image: -webkit-gradient(linear, left top, left bottom, color-stop(0, #d4d4d4), color-stop(1, #ececec));\n      /* Saf4+, Chrome */\n      -moz-box-shadow: inset 0 0 2px rgba(0, 0, 0, 0.3);\n      -webkit-box-shadow: inset 0 0 2px rgba(0, 0, 0, 0.3);\n      box-shadow: inset 0 0 2px rgba(0, 0, 0, 0.3); }\n\n  .gh-ref {\n    background: #777;\n    border-radius: 3px;\n    color: white;\n    font-family: monospace;\n    padding: 2px 1px 1px;\n    text-decoration: none;\n    text-shadow: 1px 1px 0 #000;\n  }\n</style>");
      }
    });
  }
}).call(this);

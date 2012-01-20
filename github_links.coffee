# Tries to make links to Github look cooler

window.Fenix ?= {}

githubLink = /https:\/\/github.com\/(\w+)\/(\w+)\/(\w+)\/(\S+)/g

generateGithubLink = (url, text) ->
  "<a href=\"#{url}\" class=\"gh-link\"><span class=\"gh-icon\"></span> #{text}</a>"

window.Fenix.GithubLinks =
  isMatching: (text) ->
    text.match(githubLink)

  format: (text) ->
    text = text.replace githubLink, (url, user, repo, action, rest) ->
      if action == 'compare'
        [dummy, base, diff, other] = rest.match(/^([^.]+)(\.{2,3})([^?\/]+)/)
        generateGithubLink(url, "Compare #{user}/#{repo} <span class=\"gh-ref\">#{base}</span>#{diff}<span class=\"gh-ref\">#{other}</span>")

plugin.onMessageReceived = (event) ->
  return true unless event.type == "message"
  if Fenix.GithubLinks.isMatching(event.content)
    Talker.insertMessage(event, Fenix.GithubLinks.format(event.content))
    false
  else
    true

if jQuery?
  jQuery ($) ->
    if $('head style[data-style-for=github-links]').length == 0
      $('head').append("""
        <style type="text/css">
          .gh-icon {
            background: url("https://github.com/favicon.ico");
            display: inline-block;
            height: 16px;
            vertical-align: middle;
            width: 16px;
          }

          .gh-link {
            -moz-border-radius: 3px;
            -webkit-border-radius: 3px;
            border-radius: 3px;
            filter: progid:DXImageTransform.Microsoft.gradient(startColorStr='#f9f9f9', EndColorStr='#e1e1e1');
            /* IE6,IE7 */
            -ms-filter: "progid:DXImageTransform.Microsoft.gradient(startColorStr='#f9f9f9', EndColorStr='#e1e1e1')";
            /* IE8 */
            background-image: -moz-linear-gradient(top, #f9f9f9, #e1e1e1);
            /* FF3.6 */
            background-image: -webkit-gradient(linear, left top, left bottom, color-stop(0, #f9f9f9), color-stop(1, #e1e1e1));
            /* Saf4+, Chrome */
            -moz-box-shadow:  0 0 1px rgba(0, 0, 0, 0.2);
            -webkit-box-shadow:  0 0 1px rgba(0, 0, 0, 0.2);
            box-shadow:  0 0 1px rgba(0, 0, 0, 0.2);
            -khtml-user-select: none;
            -moz-user-select: none;
            -o-user-select: none;
            -webkit-user-select: none;
            user-select: none;
            border: 1px solid #bbb;
            color: #000;
            cursor: pointer;
            display: inline-block;
            padding: 3px;
            text-align: center;
            padding: 5px;
            text-decoration: none !important;
            }
            .gh-link:hover {
              -moz-box-shadow:  0 0 5px rgba(7, 94, 131, 0.4);
              -webkit-box-shadow:  0 0 5px rgba(7, 94, 131, 0.4);
              box-shadow:  0 0 5px rgba(7, 94, 131, 0.4); }
            .gh-link[disabled] {
              background: #eee;
              border: 1px solid #ccc;
              box-shadow: none !important;
              color: #a6a6a6;
              cursor: default; }
            .gh-link.pressed, .gh-link:active {
              filter: progid:DXImageTransform.Microsoft.gradient(startColorStr='#d4d4d4', EndColorStr='#ececec');
              /* IE6,IE7 */
              -ms-filter: "progid:DXImageTransform.Microsoft.gradient(startColorStr='#d4d4d4', EndColorStr='#ececec')";
              /* IE8 */
              background-image: -moz-linear-gradient(top, #d4d4d4, #ececec);
              /* FF3.6 */
              background-image: -webkit-gradient(linear, left top, left bottom, color-stop(0, #d4d4d4), color-stop(1, #ececec));
              /* Saf4+, Chrome */
              -moz-box-shadow: inset 0 0 2px rgba(0, 0, 0, 0.3);
              -webkit-box-shadow: inset 0 0 2px rgba(0, 0, 0, 0.3);
              box-shadow: inset 0 0 2px rgba(0, 0, 0, 0.3); }

          .gh-ref {
            background: #777;
            border-radius: 3px;
            color: white;
            font-family: monospace;
            padding: 2px 1px 1px;
            text-decoration: none;
            text-shadow: 1px 1px 0 #000;
          }
        </style>
      """)

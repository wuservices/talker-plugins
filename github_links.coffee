# Tries to make links to Github look cooler

window.Fenix ?= {}

githubLink = /https:\/\/github.com\/(\w+)\/(\w+)\/(\w+)\/(\S+)/g

generateGithubLink = (url, text) ->
  "<a href=\"#{url}\">#{text}</a>"

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
        </style>
      """)

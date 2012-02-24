# Colorizes CI messages according to build status

window.Newsline ?= {}

ciMessageMatcher = /^CI: (\S+ )(build #\d+) \[([^\]]+)\] (\S+)( in \w+) -- (.*)$/

formatBranches = (branchspec) ->
  branches = branchspec.split(', ')
  ("<span class=\"ci-branch\">#{branch}</span>" for branch in branches).join(' ')

window.Newsline.CiColorizer =
  isMatching: (text) ->
    text.match(ciMessageMatcher)

  format: (text) ->
    matches = text.match(ciMessageMatcher)
    [original, intro, build, branches, outcome, outro, url] = matches
    "#{intro}<a href=\"#{url}\">#{build}</a> #{formatBranches(branches)} <span class=\"ci-#{outcome.toLowerCase()}\">#{outcome}</span>#{outro}"

plugin.onMessageReceived = (event) ->
  return true unless event.type == "message"
  if Newsline.CiColorizer.isMatching(event.content)
    Talker.insertMessage(event, Newsline.CiColorizer.format(event.content))
    false
  else
    true

if jQuery?
  jQuery ($) ->
    if $('head style[data-style-for=ci-colorizer]').length == 0
      $('head').append("""
        <style type="text/css">
          .ci-success { color: green; }
          .ci-failure { color: red; }
          .ci-aborted { color: #550; }
        </style>
      """)

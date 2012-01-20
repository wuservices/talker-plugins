# Colorizes CI messages according to build status

window.Fenix ?= {}

ciMessageMatcher = /^(CI: \S+ )(build #\d+)( \[\S+\] )(\S+)( in \w+) -- (.*)$/

window.Fenix.CiColorizer =
  isMatching: (text) ->
    text.match(ciMessageMatcher)

  format: (text) ->
    matches = text.match(ciMessageMatcher)
    [original, intro, build, branch, outcome, outro, url] = matches
    "#{intro}<a href=\"#{url}\">#{build}</a>#{branch}<span class=\"ci-#{outcome.toLowerCase()}\">#{outcome}</span>#{outro}"

plugin.onMessageReceived = (event) ->
  return true unless event.type == "message"
  if Fenix.CiColorizer.isMatching(event.content)
    Talker.insertMessage(event, Fenix.CiColorizer.format(event.content))
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
          .ci-aborted { color: yellow; }
        </style>
      """)

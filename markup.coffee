# Simple markup support
# Based on Markdown

window.Fenix ?= {}

window.Fenix.MarkupPlugin =
  format: (text) ->
    if text.indexOf('`') != -1 and text.indexOf('\n') == -1
      text = text.replace /`(.*?)`/g, (all, code) ->
        "<tt>#{code}</tt>"

plugin.onMessageReceived = (event) ->
  return true if Talker.isPaste(event)
  event.content = Fenix.MarkupPlugin.format(event.content)
  true


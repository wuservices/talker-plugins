# Simple markup support
# Based on Markdown

window.Fenix ?= {}

window.Fenix.MarkupPlugin =
  format: (text) ->
    if text.indexOf('`') != -1 and text.indexOf('\n') == -1
      text = text.replace /`(.*?)`/g, (all, code) ->
        "<tt>#{code}</tt>"
    text

plugin.onMessageReceived = (event) ->
  return true unless event.type == "message"
  formatted = Fenix.MarkupPlugin.format(event.content)
  if event.content != formatted
    Talker.insertMessage(event, formatted)
    false
  else
    true


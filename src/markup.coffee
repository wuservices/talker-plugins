# Simple markup support
# Based on Markdown

window.Newsline ?= {}

window.Newsline.MarkupPlugin =
  escape: (text) ->
    text.replace(/</g, '&lt;').replace(/>/g, '&gt;')

  format: (text) ->
    if text.indexOf('`') != -1 and text.indexOf('\n') == -1
      text = text.replace /`(.*?)`/g, (all, code) =>
        "<tt>#{@escape(code)}</tt>"
    text

plugin.onMessageReceived = (event) ->
  return true unless event.type == "message"
  formatted = Newsline.MarkupPlugin.format(event.content)
  if event.content != formatted
    Talker.insertMessage(event, formatted)
    false
  else
    true


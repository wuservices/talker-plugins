# Simple markup support
# Based on Markdown

plugin.onMessageReceived = (event) ->
  return true if Talker.isPaste(event)

  if event.content.indexOf('`') != -1 and event.content.indexOf('\n') == -1
    str = event.content.replace /`(.*?)`/g, (all, code) ->
      "<tt>#{code}</tt>"

    Talker.insertMessage(event, str)
    false
  else
    true


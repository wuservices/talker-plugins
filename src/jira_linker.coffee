# Automatically links to JIRA tickets when they are mentioned

window.Newsline ?= {}

matcher = /(\/)?(LINK-\d+)\b/
jiraBase = "https://infotorg.atlassian.net/browse"

Newsline.JiraLinker =
  format: (text) ->
    text.replace matcher, (all, lookBehind, issue) ->
      if lookBehind?
        all
      else
        """<a href="#{jiraBase}/#{issue}">#{issue}</a>"""

plugin.onMessageReceived = (event) ->
  return true unless event.type == "message"
  formatted = Newsline.JiraLinker.format(event.content)
  if formatted != event.content
    Talker.insertMessage(event, formatted)
    return false


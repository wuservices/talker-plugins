var jiraBase, matcher, _ref;

if ((_ref = window.Newsline) == null) {
  window.Newsline = {};
}

matcher = /(\/)?(LINK-\d+)\b/;

jiraBase = "https://infotorg.atlassian.net/browse";

Newsline.JiraLinker = {
  format: function(text) {
    return text.replace(matcher, function(all, lookBehind, issue) {
      if (lookBehind != null) {
        return all;
      } else {
        return "<a href=\"" + jiraBase + "/" + issue + "\">" + issue + "</a>";
      }
    });
  }
};

plugin.onMessageReceived = function(event) {
  var formatted;
  if (event.type !== "message") {
    return true;
  }
  formatted = Newsline.JiraLinker.format(event.content);
  if (formatted !== event.content) {
    Talker.insertMessage(event, formatted);
    return false;
  }
};

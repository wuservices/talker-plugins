(function() {
  var _ref;
  if ((_ref = window.Fenix) == null) {
    window.Fenix = {};
  }
  window.Fenix.MarkupPlugin = {
    format: function(text) {
      if (text.indexOf('`') !== -1 && text.indexOf('\n') === -1) {
        text = text.replace(/`(.*?)`/g, function(all, code) {
          return "<tt>" + code + "</tt>";
        });
      }
      return text;
    }
  };
  plugin.onMessageReceived = function(event) {
    var formatted;
    if (event.type !== "message") {
      return true;
    }
    formatted = Fenix.MarkupPlugin.format(event.content);
    if (event.content !== formatted) {
      Talker.insertMessage(event, formatted);
      return false;
    } else {
      return true;
    }
  };
}).call(this);

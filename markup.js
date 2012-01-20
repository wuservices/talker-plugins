(function() {
  var _ref;
  if ((_ref = window.Fenix) == null) {
    window.Fenix = {};
  }
  window.Fenix.MarkupPlugin = {
    format: function(text) {
      if (text.indexOf('`') !== -1 && text.indexOf('\n') === -1) {
        return text = text.replace(/`(.*?)`/g, function(all, code) {
          return "<tt>" + code + "</tt>";
        });
      }
    }
  };
  plugin.onMessageReceived = function(event) {
    if (Talker.isPaste(event)) {
      return true;
    }
    event.content = Fenix.MarkupPlugin.format(event.content);
    return true;
  };
}).call(this);

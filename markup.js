(function() {

  if (window.Newsline == null) window.Newsline = {};

  window.Newsline.MarkupPlugin = {
    escape: function(text) {
      return text.replace(/</g, '&lt;').replace(/>/g, '&gt;');
    },
    format: function(text) {
      var _this = this;
      if (text.indexOf('`') !== -1 && text.indexOf('\n') === -1) {
        text = text.replace(/`(.*?)`/g, function(all, code) {
          return "<tt>" + (_this.escape(code)) + "</tt>";
        });
      }
      return text;
    }
  };

  plugin.onMessageReceived = function(event) {
    var formatted;
    if (event.type !== "message") return true;
    formatted = Newsline.MarkupPlugin.format(event.content);
    if (event.content !== formatted) {
      Talker.insertMessage(event, formatted);
      return false;
    } else {
      return true;
    }
  };

}).call(this);

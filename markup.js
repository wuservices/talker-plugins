(function() {
  plugin.onMessageReceived = function(event) {
    var str;
    if (Talker.isPaste(event)) {
      return true;
    }
    if (event.content.indexOf('`') !== -1 && event.content.indexOf('\n') === -1) {
      str = event.content.replace(/`(.*?)`/g, function(all, code) {
        return "<tt>" + code + "</tt>";
      });
      Talker.insertMessage(event, str);
      return false;
    } else {
      return true;
    }
  };
}).call(this);

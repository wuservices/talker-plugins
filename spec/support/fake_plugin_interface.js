window.FakePlugin = (function() {
  return {
    // Make plugin registrations a noop
    onMessageReceived: function() { }
  };
});

window.plugin = new FakePlugin();

var newtab = 0;

chrome.app.runtime.onLaunched.addListener(function() {
  if (newtab == 0)
    new UARToolWindow();
});

var UARToolWindow = function() {
  var connectedSerialId = 0;
  chrome.app.window.create(
    'UARTool.html',
    {
      outerBounds: {
        width: 1024,
        height: 768
      }
    },
    function(win) {
      win.contentWindow.AddConnectedSerialId = function(id) {
        connectedSerialId = id;
      };
      win.onClosed.addListener(function() {
        chrome.serial.disconnect(connectedSerialId, function () {
        });
      });
    }
  );
}

chrome.browserAction.onClicked.addListener(function(tab){
  newtab = 1;
    chrome.tabs.create({
       url: ("UARTool.html"),
       type: "normal",
       function(win) {
        win.contentWindow.AddConnectedSerialId = function(id) {
          connectedSerialId = id;
        };
        win.onClosed.addListener(function() {
          chrome.serial.disconnect(connectedSerialId, function () {
          });
        });
      }
   });
});

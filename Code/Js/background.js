// background.js

// Listen for messages from the popup and content scripts
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  // Handle messages from popup script
  if (request.action === "toggleDarkMode") {
    // Toggle dark mode
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.tabs.sendMessage(tabs[0].id, request, () => {
        if (chrome.runtime.lastError) {
          console.error("Error:", chrome.runtime.lastError.message);
        }
      });
    });
  }

  // Handle messages from content script
  if (request.action === "adjustFontSize" || request.action === "highlightCode") {
    // Forward message to content script
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.tabs.sendMessage(tabs[0].id, request, (response) => {
        if (chrome.runtime.lastError) {
          console.error("Error:", chrome.runtime.lastError.message);
        } else {
          console.log(response.status);
        }
      });
    });
  }
});

// content.js

// Adjust font size
function adjustFontSize(size) {
  document.body.style.fontSize = size + 'px';
}

// Highlight code blocks
function highlightCodeBlocks() {
  const codeBlocks = document.querySelectorAll('pre code');
  codeBlocks.forEach(block => {
    block.classList.add('highlighted');
  });
}

// Toggle dark mode
function toggleDarkMode(enable) {
  if (enable) {
    document.body.classList.add('dark-mode');
  } else {
    document.body.classList.remove('dark-mode');
  }
}

// Load preferences from storage and execute corresponding actions
function loadPreferencesAndExecuteActions() {
  chrome.storage.sync.get(['fontSize', 'darkMode'], (data) => {
    if (data.fontSize !== undefined) {
      adjustFontSize(data.fontSize); // Adjust font size after preferences are loaded
    }
    if (data.darkMode !== undefined) {
      toggleDarkMode(data.darkMode); // Toggle dark mode after preferences are loaded
    }
  });
}

// Listen for messages from the background script
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "adjustFontSize") {
    adjustFontSize(request.size); // Trigger font size adjustment
    sendResponse({ status: "Font size adjusted" });
  } else if (request.action === "highlightCode") {
    highlightCodeBlocks(); // Trigger code highlighting
    sendResponse({ status: "Code highlighted" });
  }
  return true; // Keep the message channel open for asynchronous sendResponse
});

// Load preferences and execute actions on page load
loadPreferencesAndExecuteActions();

// popup.js

document.addEventListener('DOMContentLoaded', () => {
  const highlightBtn = document.getElementById('highlight-btn');
  const darkModeToggle = document.getElementById('dark-mode-toggle');
  const fontSizeSlider = document.getElementById('font-size-slider');
  const fontSizeValue = document.getElementById('font-size-value');

  // Load preferences
  chrome.storage.sync.get(['darkMode', 'fontSize'], (data) => {
    if (data.darkMode !== undefined) {
      darkModeToggle.checked = data.darkMode;
    }
    if (data.fontSize !== undefined) {
      fontSizeSlider.value = data.fontSize;
      fontSizeValue.textContent = data.fontSize;
    }
  });

  // Highlight code blocks
  highlightBtn.addEventListener('click', () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.tabs.sendMessage(tabs[0].id, { action: "highlightCode" }, (response) => {
        if (chrome.runtime.lastError) {
          console.error("Error:", chrome.runtime.lastError.message);
        } else {
          console.log(response.status);
        }
      });
    });
  });

  // Toggle dark mode
  darkModeToggle.addEventListener('change', () => {
    const enable = darkModeToggle.checked;
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.tabs.sendMessage(tabs[0].id, { action: "toggleDarkMode", enable }, (response) => {
        if (chrome.runtime.lastError) {
          console.error("Error:", chrome.runtime.lastError.message);
        } else {
          console.log(response.status);
        }
      });
    });
  });

  // Adjust font size
  fontSizeSlider.addEventListener('input', () => {
    const size = fontSizeSlider.value;
    fontSizeValue.textContent = size;
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.tabs.sendMessage(tabs[0].id, { action: "adjustFontSize", size }, (response) => {
        if (chrome.runtime.lastError) {
          console.error("Error:", chrome.runtime.lastError.message);
        } else {
          console.log(response.status);
        }
      });
    });
  });
});


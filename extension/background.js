// Register right-click context menu for instantaneous scan routing
chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "zerotrust-analyze",
    title: "Analyze with ZeroTrust One",
    contexts: ["selection", "link", "image", "media"]
  });
});

chrome.contextMenus.onClicked.addListener(async (info, tab) => {
  if (info.menuItemId === "zerotrust-analyze") {
    const targetPayload = info.linkUrl || info.srcUrl || info.selectionText;
    
    // Dispatch execution request to FastAPI backend engine
    const response = await fetch("https://cyber-champ-2.onrender.com/scan", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ payload: `[EXTENSION_CONTEXT_SCAN]: ${targetPayload}` })
    });
    
    const data = await response.json();
    
    // Notify active browser tab with floating threat verdict
    chrome.tabs.sendMessage(tab.id, { action: "SHOW_VERDICT_OVERLAY", data: data });
  }
});

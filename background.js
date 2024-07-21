const createTab = ({ i, url }) => {
  const { pathname, searchParams } = new URL(url);
  const q = searchParams.get("worldId") || pathname.split("/")[3];

  chrome.tabs.create({
    active: true,
    index: i,
    url: `https://vrclist.com/?type=search&sort=recent&query=${q}`,
  });
};

chrome.action.onClicked.addListener((tab) => {
  createTab({ i: tab.index + 1, url: tab.url });
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === "linkUrl") {
    createTab({ i: tab.index + 1, url: info.linkUrl });
  } else if (info.menuItemId === "pageUrl") {
    createTab({ i: tab.index + 1, url: info.pageUrl });
  }
});

chrome.runtime.onInstalled.addListener(() => {
  const documentUrlPatterns = ["https://vrchat.com/*"];

  chrome.contextMenus.create({
    id: "linkUrl",
    title: "Send the link url",
    contexts: ["link"],
    documentUrlPatterns,
  });

  chrome.contextMenus.create({
    id: "pageUrl",
    title: "Send the page url",
    contexts: ["page"],
    documentUrlPatterns,
  });
});

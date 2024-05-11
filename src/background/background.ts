import { companyInfoSites } from "../script/companyInfoSites";

chrome.runtime.onInstalled.addListener(async () => {
    await chrome.storage.local.set({
        companyInfoSites: companyInfoSites,
    });
    chrome.storage.local.get(["companyInfoSites"]).then((res) => {
        res.companyInfoSites.forEach((site) => {
            chrome.contextMenus.create({
                id: site.url,
                title: site.name,
                type: "normal",
                contexts: ["selection"],
            });
        });
    });
});

chrome.contextMenus.onClicked.addListener((item) => {
    const query = new URL(
        item.menuItemId.toString().replace("{}", item.selectionText)
    );
    chrome.tabs.create({ url: query.href });
});

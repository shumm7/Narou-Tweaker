(async() => {
    const src = chrome.runtime.getURL("/cogs/yomou/main.js");
    const contentMain = await import(src);
})()
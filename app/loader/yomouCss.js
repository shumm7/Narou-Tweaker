(async() => {
    const src = chrome.runtime.getURL("/cogs/yomou/css/main.js");
    const contentMain = await import(src);
})()
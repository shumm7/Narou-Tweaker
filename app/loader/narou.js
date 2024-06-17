(async() => {
    const src = chrome.runtime.getURL("/cogs/narou/main.js");
    const contentMain = await import(src);
})()
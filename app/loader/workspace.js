(async() => {
    const src = chrome.runtime.getURL("/cogs/workspace/main.js");
    const contentMain = await import(src);
})()
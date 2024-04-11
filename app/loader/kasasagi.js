(async() => {
    const src = chrome.runtime.getURL("/cogs/kasasagi/main.js");
    const contentMain = await import(src);
})()
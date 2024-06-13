(async() => {
    const src = chrome.runtime.getURL("/cogs/mitemin/main.js");
    const contentMain = await import(src);
})()
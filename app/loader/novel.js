(async() => {
    const src = chrome.runtime.getURL("/cogs/novel/main.js");
    const contentMain = await import(src);
})()
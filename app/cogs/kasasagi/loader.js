(async() => {
    const src = chrome.runtime.getURL("./cogs/kasasagi/kasasagi.js");
    const contentMain = await import(src);
})()
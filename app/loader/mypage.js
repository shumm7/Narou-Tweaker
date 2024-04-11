(async() => {
    const src = chrome.runtime.getURL("/cogs/mypage/main.js");
    const contentMain = await import(src);
})()
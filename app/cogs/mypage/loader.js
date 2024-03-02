(async() => {
    const src = chrome.runtime.getURL("./cogs/mypage/mypage.js");
    const contentMain = await import(src);
})()
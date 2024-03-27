
export function actionListener(){
    chrome.action.onClicked.addListener((tab) => {
        chrome.tabs.create({"url": "/cogs/options/general/index.html" });
    });
}
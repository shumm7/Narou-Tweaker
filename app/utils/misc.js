
export function saveJson(data, filename){
    var url = 'data:application/json;base64,' + btoa(unescape(encodeURIComponent(JSON.stringify(data, null, 3))))
    chrome.runtime.sendMessage(
        {
            action: "downloads",
            type: "download",
            data: {url: url, filename, filename}
        }
    );
    return true;
}
export function saveOptionValue(key, value){
    chrome.storage.sync.get(null, (options) => {
        options[key] = value;
        chrome.storage.sync.set(options);
    });
}
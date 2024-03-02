function fetch(url, options){
    chrome.runtime.sendMessage(
        {
            action: "fetch",
            data: {url: url, options: options}
        }
    );
    return true;
}

export function getNovelInfo(ncode){
    var url = "https://api.syosetu.com/novelapi/api/?out=json&libtype=2&ncode=" + ncode
    var options = {
        'method': 'GET'
    }
    fetch(url, options);
}

export function getUserInfo(userid){
    var url = "https://api.syosetu.com/userapi/api/?out=json&libtype=2&userid=" + userid
    var options = {
        'method': 'GET'
    }
    fetch(url, options);
}
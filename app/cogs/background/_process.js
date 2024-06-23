/* Message */
export function messageListener(){
    chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
        if (message.action == "fetch"){
            if(message.format == "json" || message.format==undefined){
                fetch(message.data.url, message.data.options)
                .then(response => response.json())
                .then(data => {
                    sendResponse({action: "fetch", result: data, format: message.format, success: true, id: message.id, message: message.data})
                })
                .catch((e) => {
                    sendResponse({action: "fetch", result: e, format: message.format, success: false, id: message.id, message: message.data})
                })
                return true
                
            }else if(message.format == "text"){
                fetch(message.data.url, message.data.options)
                .then(response => response.text())
                .then(data => {
                    sendResponse({action: "fetch", result: data, format: message.format, success: true, id: message.id, message: message.data})
                })
                .catch((e) => {
                    sendResponse({action: "fetch", result: e, format: message.format, success: false, id: message.id, message: message.data})
                })
                return true
            }
            
        }else if (message.action == "fetchWrap"){
            try{
                fetchWrap(message.data.url, message.data.post, message.data.header, message.data.callback, message.data.charset)
                sendResponse({action: "fetchWrap", result: {}, success: true, id: message.id, message: message.data})
            }catch(e){
                sendResponse({action: "fetchWrap", result: e, success: false, id: message.id, message: message.data})
            }
            return true
        }else if(message.action == "downloads"){
            chrome.downloads.download({
                url: message.data.url,
                filename: message.data.filename
            }, function(downloadId){
                sendResponse({action: "downloads", id: downloadId, message: message.data});
            });
            return true;
        }else if(message.action == "cookies"){
            if(message.function == "set"){
                chrome.cookies.set(message.data, function(cookie){
                    console.log(cookie)
                    sendResponse({action: "cookies", function: message.function, result: cookie, message: message.data});
                });
                return true;
            }else if(message.function == "get"){
                chrome.cookies.get(message.data, function(cookie){
                    sendResponse({action: "cookies", function: message.function, result: cookie, message: message.data});
                });
                return true;
            }
        }
        
        sendResponse()
        return
    })
}

function fetchWrap(_url, _post, _header, _callback, _charset) {
    var method = "GET";
    var body = undefined;
    var headers = {};

    if (_header) {
        headers = JSON.parse(JSON.stringify(_header));
    }

    if (_post) {
        method = "POST";
        body = Object.keys(_post)
            .map((key) => key + "=" + encodeURIComponent(_post[key]))
            .join("&");
        if (!headers['Content-Type']) {
            headers['Content-Type'] = 'application/x-www-form-urlencoded; charset=utf-8';
        }
    }

    var _timeout = setTimeout(function() {
        _callback("");
    }, 5000);

    fetch(_url, {
            method,
            headers,
            body
        })
        .then(res => {
            clearTimeout(_timeout);

            if (res.ok) {

                if (!_charset) {
                    res = res.text();
                }

                return res;
            } else {
                return false;
            }
        })
        .then(res => {
            clearTimeout(_timeout);

            if (!res) {
                _callback("");
                return;
            }

            if (_charset) {
                !async function() {
                    const ab = await res.arrayBuffer();
                    const td = new TextDecoder(_charset);
                    res = td.decode(ab);

                    //console.log("fetch res=", res);

                    _callback(res);
                }();
            } else {
                //console.log("fetch res=", res);
                _callback(res);
            }
        })
        .catch(error => {
            _callback("");
            return;
        });
}
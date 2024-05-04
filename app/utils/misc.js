
export function saveJson(data, filename){
    var url = 'data:application/json;base64,' + btoa(unescape(encodeURIComponent(JSON.stringify(data, null, 3))))
    chrome.runtime.sendMessage({action: "downloads", data: {url: url, filename, filename}}, function(response){
        
    });
    return true;
}

export function saveText(data, filename){
    var url = 'data:text/plain;base64,' + btoa(unescape(encodeURIComponent(data)))
    chrome.runtime.sendMessage({action: "downloads", data: {url: url, filename, filename}}, function(response){
        
    });
    return true;
}

export function defaultValue(value, def){
    if(value==undefined){
        return def
    }
    return value
}

export function check(elm, value, _default) {
    if(value!=true && value!=false){
        if(_default==undefined){
            value = false
        }else{
            value = _default;
        }
    }
    $(elm).attr('checked', value).prop('checked', value).change();
  }

export function getCSSRule(key, rules){
    var style = key + "{"
    rules.forEach(rule => {
        Object.keys(rule).forEach(k => {
            style += k + ":" + rule[k] + " !important;"
        })
    })
    style += "}\n"
    return style
}

export function getExtensionVersion(){
    return chrome.runtime.getManifest().version
}

export function getExtensionAuthor(){
    return chrome.i18n.getMessage("extAuthor")
}
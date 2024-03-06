
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

export function defaultValue(value, def){
    if(value==undefined){
        return def
    }
    return value
}

export function check(elm, value, _default) {
    if(value!=true && value!=false){
      value = _default;
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
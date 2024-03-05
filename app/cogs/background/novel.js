export function applyCSS(tab, index){
    function getRule(key, rules){
        var style = key + "{"
        rules.forEach(rule => {
            Object.keys(rule).forEach(k => {
                style += k + ":" + rule[k] + " !important;"
            })
        })
        style += "}\n"
        return style
    }

    chrome.storage.sync.get(["skins", "skin"], (data) => {
        const skin_idx = defaultValue(index, defaultValue(data.skin, 0))
        const skins = defaultValue(data.skins, defaultSkins)
        const skin = defaultValue(skins[skin_idx], defaultSkins[0])

        const s = skin.style
        var rule = ""
        rule += getRule("body.customlayout1", [{"background-color": s.novel.background}, {"background-image": s.novel.background_image}])
        rule += getRule("#novel_color.customlayout1", [{"color": s.novel.color}])
        rule += getRule("#novel_contents.customlayout1 div.novelrankingtag, #novel_contents.customlayout1 .customlayout-color", [{"color": s.novel.color}])
        rule += getRule("#novel_contents.customlayout1 a:link, #novel_contents.customlayout1 .customlayout-color a:link", [{"color": s.link.color_link}])
        rule += getRule("#novel_contents.customlayout1 a:visited, #novel_contents.customlayout1 .customlayout-color a:visited", [{"color": s.link.color_visited}])
        rule += getRule("#novel_contents.customlayout1 a:hover, #novel_contents.customlayout1 .customlayout-color a:hover", [{"color": s.link.color_hover}])
        rule += getRule(".novel_sublist2.underline.customlayout1", [{"border-bottom": defaultValue(s.sublist.underline_type, "1px solid") + " " + s.sublist.underline}])
        rule += getRule("dl.novel_sublist2.customlayout1", [{"border-color": s.sublist.default}])
        rule += getRule("dl.novel_sublist2.customlayout1:hover", [{"border-color": s.sublist.hover}])
        
        console.log(rule)
        chrome.scripting.insertCSS({
            css: rule,
            target: {
                tabId: tab.id,
            }
        })
    });    
}
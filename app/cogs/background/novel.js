import { defaultSkins } from "../../utils/data/default_skins.js";
import { defaultValue, getCSSRule } from "../../utils/misc.js";

export function applyCSS(tab, index){

    chrome.storage.sync.get(["skins", "skin"], (data) => {
        const getRule = getCSSRule
        const skin_idx = defaultValue(index, defaultValue(data.skin, 0))
        const skins = defaultValue(data.skins, defaultSkins)
        const skin = defaultValue(skins[skin_idx], defaultSkins[0])

        const s = skin.style
        var rule = ""
        rule += getRule("body.customlayout1", [{"background-color": defaultValue(s.novel.background, "#fff")}, {"background-image": "none"}])
        rule += getRule("#novel_color.customlayout1", [{"color": defaultValue(s.novel.color, "#444")}])
        rule += getRule("#novel_contents.customlayout1 div.novelrankingtag, #novel_contents.customlayout1 .customlayout-color", [{"color": defaultValue(s.novel.color, "#444")}])
        rule += getRule("#novel_contents.customlayout1 a:link, #novel_contents.customlayout1 .customlayout-color a:link", [{"color": defaultValue(s.link.color_link, "#03c")}])
        rule += getRule("#novel_contents.customlayout1 a:visited, #novel_contents.customlayout1 .customlayout-color a:visited", [{"color": defaultValue(s.link.color_visited, "#857")}])
        rule += getRule("#novel_contents.customlayout1 a:hover, #novel_contents.customlayout1 .customlayout-color a:hover", [{"color": defaultValue(s.link.color_hover, "#393")}])
        rule += getRule(".novel_sublist2.underline.customlayout1", [{"border-bottom": "1px solid " + defaultValue(s.sublist.color, "#444")}])
        rule += getRule("dl.novel_sublist2.customlayout1", [{"border-color": "transparent"}])
        rule += getRule("dl.novel_sublist2.customlayout1:hover", [{"border-color": defaultValue(s.sublist.hover, "#9df")}])
        
        chrome.scripting.insertCSS({
            css: rule,
            target: {
                tabId: tab.id,
            }
        })
    });    
}
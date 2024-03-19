import { defaultValue, getCSSRule } from "../../utils/misc.js";
import { defaultOption, localSkins, localFont } from "../../utils/option.js";

export function applySkin(tab){
    chrome.storage.local.get(null, (data) => {
        const getRule = getCSSRule

        const skin_idx = defaultValue(data.selectedSkin, defaultOption.selectedSkin)
        const skins = localSkins.concat(defaultValue(data.skins, defaultOption.skins))
        const skin = skins[skin_idx]

        const expand_skin = data.novelExpandSkin
        const novel_css = data.novelCustomStyle

        if (data.appliedSkinCSS!=undefined){
            chrome.scripting.removeCSS({
                css: data.appliedSkinCSS,
                target: {
                    tabId: tab.id,
                }
            })
        }

        const s = skin.style
        var rule = ""

        /* Skin */
        rule += getRule("body", [
            {"background-color": defaultValue(s.novel.background, "#fff")},
            {"background-image": "none"}
        ])
        rule += getRule("#novel_color", [
            {"color": defaultValue(s.novel.color, "#444")}
        ])
        rule += getRule("#novel_contents div.novelrankingtag, #novel_contents .customlayout-color", [
            {"color": defaultValue(s.novel.color, "#444")}
        ])
        rule += getRule("#novel_contents a:link, #novel_contents .customlayout-color a:link", [
            {"color": defaultValue(s.link.color_link, "#03c")}
        ])
        rule += getRule("#novel_contents a:visited, #novel_contents .customlayout-color a:visited", [
            {"color": defaultValue(s.link.color_visited, "#857")}
        ])
        rule += getRule("#novel_contents a:hover, #novel_contents .customlayout-color a:hover", [
            {"color": defaultValue(s.link.color_hover, "#393")}
        ])
        rule += getRule(".novel_sublist2.underline", [
            {"border-bottom": "1px solid " + defaultValue(s.sublist.color, "#444")}
        ])
        rule += getRule("dl.novel_sublist2", [
            {"border-color": "transparent"}
        ])
        rule += getRule("dl.novel_sublist2:hover", [
            {"border-color": defaultValue(s.sublist.hover, "#9df")}
        ])

        /* Expanded Skin */
        if(expand_skin){
            /*if(tab.url.match(/https:\/\/ncode\.syosetu\.com\/n\d{4}[a-z]{2}\/\d+\//)){ /* 本文ページ */
            /* Title */
            rule += getRule(".contents1", [
                {"color": defaultValue(s.novel.color, "#444")},
                {"background-color": defaultValue(s.novel.background, "#fff")},
                {"background-image": "none"}
            ])
            rule += getRule(".contents1 a:link", [
                {"color": defaultValue(s.link.color_link, "#03c")}
            ])
            rule += getRule(".contents1 a:visited", [
                {"color": defaultValue(s.link.color_visited, "#857")}
            ])
            rule += getRule(".contents1 a:hover", [
                {"color": defaultValue(s.link.color_hover, "#393")}
            ])
            
            /* Footer */
            rule += getRule(".wrap_menu_novelview_after", [
                {"background-color": defaultValue(s.novel.background, "#fff")},
                {"background-image": "none"},
                {"border-top": "1px solid " + defaultValue(s.sublist.color, "#444")},
                {"border-bottom": "1px solid " + defaultValue(s.sublist.color, "#444")}
            ])
            rule += getRule(".list_menu_novelview_after:first-child", [
                {"border-left": "1px solid " + defaultValue(s.sublist.color, "#444")}
            ])
            rule += getRule(".list_menu_novelview_after", [
                {"border-right": "1px solid " + defaultValue(s.sublist.color, "#444")}
            ])
            rule += getRule("..list_menu_novelview_after a:link", [
                {"color": defaultValue(s.link.color_link, "#03c")}
            ])
            rule += getRule(".list_menu_novelview_after a:visited", [
                {"color": defaultValue(s.link.color_visited, "#857")}
            ])
            rule += getRule(".list_menu_novelview_after a:hover", [
                {"color": defaultValue(s.link.color_hover, "#393")},
                {"background": "transparent"}
            ])
            rule += getRule(".footerbookmark .booklist .login", [
                {"background": "transparent"},
                {"border-color": defaultValue(s.sublist.color, "#444")}
            ])
            rule += getRule(".footerbookmark .booklist a.login:hover", [
                {"background": "transparent"},
                {"border-color": defaultValue(s.sublist.hover, "#444")}
            ])

            /* Novel Info */
            rule += getRule("#contents_main", [
                {"color": defaultValue(s.novel.color, "#444")},
                {"background-color": defaultValue(s.novel.background, "#fff")},
                {"background-image": "none"}
            ])
            rule += getRule("#contents_main a:link", [
                {"color": defaultValue(s.link.color_link, "#03c")}
            ])
            rule += getRule("#contents_main a:visited", [
                {"color": defaultValue(s.link.color_visited, "#857")}
            ])
            rule += getRule("#contents_main a:hover", [
                {"color": defaultValue(s.link.color_hover, "#393")}
            ])

            rule += getRule("#noveltable1 th, #noveltable2 th, #onazi .th", [
                {"color": defaultValue(s.novel.color, "#444")},
                {"background": defaultValue(s.novel.background_second, "#fff")}
            ])
            rule += getRule("#noveltable1 th, #noveltable2 th, #noveltable1 td, #noveltable2 td, h1, #onazi", [
                {"border-color": defaultValue(s.sublist.color, "#444")},
            ])

            /* Attention */
            rule += getRule("#novel_attention, .box_announce_bookmark", [
                {"color": defaultValue(s.novel.color, "#444")},
                {"background-color": defaultValue(s.novel.background, "#fff")},
                {"border-color": defaultValue(s.novel.background_second, "#444")}
            ])
        }

        /* Novel Page */
        if(novel_css) {
            rule += getRule(".narou-tweaker .novel-titles a", [
                {"color": "inherit"}
            ])
            rule += getRule(".narou-tweaker .novel-titles .novel-title, .narou-tweaker .novel-titles .novel-author, .narou-tweaker .novel-chapter", [
                {"color": "#999999"}
            ])
            rule += getRule(".narou-tweaker .novel-titles#ep-0 .novel-title, .narou-tweaker .novel-titles#ep-1 .novel-title", [
                {"color": "inherit"}
            ])
        }
        
        /* Custom CSS */
        rule += getRule(".narou-tweaker #novel_header ul li > a, .narou-tweaker #novel_header ul li > a:link, .narou-tweaker #novel_header ul li > a:visited, .narou-tweaker #novel_header ul li > form", [
            {"color": defaultValue(s.sublist.color, "#444")},
        ])
        rule += getRule(".narou-tweaker #novel_header ul li a:hover, .narou-tweaker #novel_header ul li a:active, .narou-tweaker #novel_header ul li > form:hover, .narou-tweaker #novel_header ul li > form:active", [
            {"color": defaultValue(s.sublist.hover, "#444")},
        ])
        rule += getRule(".narou-tweaker #novel_header_right ul li > a, .narou-tweaker #novel_header_right ul li > a:link, .narou-tweaker #novel_header_right ul li > a:visited, .narou-tweaker #novel_header_right ul li > form", [
            {"color": defaultValue(s.sublist.color, "#444")},
        ])
        rule += getRule(".narou-tweaker #novel_header_right ul li > a:hover, .narou-tweaker #novel_header_right ul li > a:active, .narou-tweaker #novel_header_right ul li > form:hover, .narou-tweaker #novel_header_right ul li > form:active", [
            {"color": defaultValue(s.sublist.hover, "#444")},
        ])

        chrome.scripting.insertCSS({
            css: rule,
            target: {
                tabId: tab.id,
            }
        })
        data.appliedSkinCSS = rule
        chrome.storage.local.set({appliedSkinCSS: data.appliedSkinCSS});
    });    
}

export function applyFont(tab){
    chrome.storage.local.get(null, (data) => {
        const getRule = getCSSRule
        var rule = ""

        if (data.appliedFontCSS!=undefined){
            chrome.scripting.removeCSS({
                css: data.appliedFontCSS,
                target: {
                    tabId: tab.id,
                }
            })
        }

        var fontFamily = defaultValue(data.fontFontFamily, defaultOption.fontFontFamily)
        var fontFamily_Custom = defaultValue(data.fontFontFamily_Custom, defaultOption.fontFontFamily_Custom)
        var fontFamily_Current 
        var fontSize = defaultValue(data.fontFontSize, defaultOption.fontFontSize) + localFont["font-size"]
        var lineHeight = defaultValue(data.fontLineHeight, defaultOption.fontLineHeight) + localFont["line-height"]
        var textRendering = defaultValue(data.fontTextRendering, defaultOption.fontTextRendering)
        var width = localFont["width"] * defaultValue(data.fontWidth, defaultOption.fontWidth)

        if(fontFamily=="custom"){
            fontFamily_Current = fontFamily_Custom
        }else{
            fontFamily_Current = localFont["font-family"][fontFamily]
        }
        rule += getRule("#novel_honbun", [
            {"line-height": lineHeight + "%"},
            {"font-size": fontSize + "%"},
        ])
        rule += getRule("body#container, #novel_color", [
            {"font-family": fontFamily},
            {"text-rendering": textRendering}
        ])
        rule += getRule(".novel-option--font-button#gothic", [
            {"font-family": localFont["font-family"].gothic},
        ])
        rule += getRule(".novel-option--font-button#serif", [
            {"font-family": localFont["font-family"].serif},
        ])
        rule += getRule(".novel-option--font-button#custom", [
            {"font-family": fontFamily_Custom},
        ])
        rule += getRule("#novel_color, #novel_honbun", [
            {"max-width": "100vw"},
            {"width": width + "px"}
        ])
        

        
        chrome.scripting.insertCSS({
            css: rule,
            target: {
                tabId: tab.id,
            }
        })
        data.appliedFontCSS = rule
        chrome.storage.local.set({appliedFontCSS: data.appliedFontCSS});
    })
}
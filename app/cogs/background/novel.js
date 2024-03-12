import { defaultSkins } from "../../utils/data/default_skins.js";
import { defaultValue, getCSSRule } from "../../utils/misc.js";

export function applyCSS(tab, index){

    chrome.storage.sync.get(["skins", "skin", "applied_skin", "options"], (data) => {
        const getRule = getCSSRule
        const skin_idx = defaultValue(index, defaultValue(data.skin, 0))
        const skins = defaultValue(data.skins, defaultSkins)
        const skin = defaultValue(skins[skin_idx], defaultSkins[0])
        var applied_skin = data.applied_skin
        const expand_skin = defaultValue(data.options.enable_novel_expand_skin, true)
        const custom_css = defaultValue(data.options.enable_novel_css, true)

        if (applied_skin[tab.id]!=undefined){
            chrome.scripting.removeCSS({
                css: applied_skin[tab.id],
                target: {
                    tabId: tab.id,
                }
            })
        }else{
            applied_skin = {}
        }

        const s = skin.style
        var rule = ""
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
        
        /* Custom CSS */
        rule += getRule("#novel_header ul li a, #novel_header ul li a:link, #novel_header ul li a:visited, #novel_header ul li form", [
            {"color": defaultValue(s.sublist.color, "#444")},
        ])
        rule += getRule("#novel_header ul li a:hover, #novel_header ul li a:active, #novel_header ul li form:hover, #novel_header ul li form:active", [
            {"color": defaultValue(s.sublist.hover, "#444")},
        ])

        chrome.scripting.insertCSS({
            css: rule,
            target: {
                tabId: tab.id,
            }
        })

        applied_skin[tab.id] = rule
        chrome.storage.sync.set({"applied_skin": applied_skin});
    });    
}
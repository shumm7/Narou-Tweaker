import { defaultFont, defaultFontSettings } from "../../utils/data/default_font.js";
import { defaultSkins } from "../../utils/data/default_skins.js";
import { defaultValue, getCSSRule } from "../../utils/misc.js";

export function applyCSS(tab, _index, _font){

    chrome.storage.local.get(["skins", "applied_css", "options", "applied_font", "applied_skin"], (data) => {
        const getRule = getCSSRule
        data.options = defaultValue(data.options, {})
        const skin_idx = defaultValue(_index, defaultValue(data.applied_skin, 0))
        const skins = defaultValue(data.skins, defaultSkins)
        const skin = defaultValue(skins[skin_idx], defaultSkins[0])
        const font = defaultValue(_font, defaultValue(data.applied_font, defaultFont))
        var applied_css = defaultValue(data.applied_css, {})
        const expand_skin = defaultValue(data.options.enable_novel_expand_skin, true)
        const novel_css = defaultValue(data.options.enable_novel_css, true)

        if (applied_css[tab.id]!=undefined){
            chrome.scripting.removeCSS({
                css: applied_css[tab.id],
                target: {
                    tabId: tab.id,
                }
            })
        }else{
            applied_css = {}
        }

        const s = skin.style
        const f = font
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

        /* Font */
        var font_family
        if(f["font-family"]=="custom"){
            font_family = defaultValue(f["custom-font-family"], defaultFont["custom-font-family"])
        }else{
            font_family = defaultFontSettings["font-family"][defaultValue(f["font-family"], "gothic")]
        }   
        rule += getRule("#novel_honbun", [
            {"line-height": defaultValue(Number(f["line-height"]), 0) + defaultFontSettings["line-height"] + "%"},
            {"font-size": defaultValue(Number(f["font-size"]), 0) + defaultFontSettings["font-size"] + "%"},
        ])
        rule += getRule("body#container, #novel_color", [
            {"font-family": font_family},
            {"text-rendering": defaultValue(f["text-rendering"], defaultFontSettings["text-rendering"])}
        ])
        rule += getRule(".novel-option--font-button#gothic", [
            {"font-family": defaultFontSettings["font-family"].gothic},
        ])
        rule += getRule(".novel-option--font-button#serif", [
            {"font-family": defaultFontSettings["font-family"].serif},
        ])
        rule += getRule(".novel-option--font-button#custom", [
            {"font-family": defaultValue(f["custom-font-family"], defaultFont["custom-font-family"])},
        ])

        chrome.scripting.insertCSS({
            css: rule,
            target: {
                tabId: tab.id,
            }
        })

        applied_css[tab.id] = rule
        chrome.storage.local.set({"applied_css": applied_css});
    });    
}
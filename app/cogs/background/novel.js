import { defaultValue, getCSSRule } from "../../utils/misc.js"
import { defaultOption, localSkins, localFont } from "../../utils/option.js"

export function applySkin(tab){
    chrome.storage.local.get(null, (data) => {
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
        console.log(s.novel.background)
        rule += `
        body {
            background-color: ${s.novel.background} !important;
            background-image: none !important;
        }
        #novel_color {
            color: ${s.novel.color} !important;
        }
        #novel_contents div.novelrankingtag,
        #novel_contents .customlayout-color {
            color: ${s.novel.color} !important;
        }

        #novel_contents a:link,
        #novel_contents .customlayout-color a:link {
            color: ${s.link.color_link} !important;
        }
        #novel_contents a:visited,
        #novel_contents .customlayout-color a:visited {
            color: ${s.link.color_visited} !important;
        }

        #novel_contents a:hover,
        #novel_contents .customlayout-color a:hover {
            color: ${s.link.color_hover} !important;
        }
        .novel_sublist2.underline {
            border-bottom: 1px solid ${s.sublist.color} !important;
        }
        dl.novel_sublist2 {
            border-color: transparent !important;
        }
        dl.novel_sublist2:hover {
            border-color: ${s.sublist.hover} !important;
        }
        `

        /* Expanded Skin */
        if(expand_skin){
            /*if(tab.url.match(/https:\/\/ncode\.syosetu\.com\/n\d{4}[a-z]{2}\/\d+\//)){ /* 本文ページ */
            /* Title */
            rule += `
            .contents1 {
                color: ${s.novel.color} !important;
                background-color: ${s.novel.background} !important;
                background-image: none !important;
            }
            .contents1 a:link {
                color: ${s.link.color_link} !important;
            }
            .contents1 a:visited {
                color: ${s.link.color_visited} !important;
            }
            .contents1 a:hover {
                color: ${s.link.color_hover} !important;
            }
            
            /* Footer */
            .wrap_menu_novelview_after {
                background-color: ${s.novel.background} !important;
                background-image: none !important;
                border-top: 1px solid ${s.sublist.color} !important;
                border-bottom: 1px solid ${s.sublist.color} !important;
            }
            .list_menu_novelview_after:first-child {
                border-left: 1px solid ${s.sublist.color} !important;
            }
            .list_menu_novelview_after {
                border-right: 1px solid ${s.sublist.color} !important;
            }
            .list_menu_novelview_after a:link {
                color: ${s.link.color_link} !important;
            }
            .list_menu_novelview_after a:visited {
                color: ${s.link.color_visited} !important;
            }
            .list_menu_novelview_after a:hover {
                color: ${s.link.color_hover} !important;
                background: transparent !important;
            }
            .footerbookmark .booklist .login {
                background: transparent !important;
                border-color: ${s.sublist.color} !important;
            }
            .footerbookmark .booklist a.login:hover {
                background: transparent !important;
                border-color: ${s.sublist.hover} !important;
            }

            /* Novel Info */
            #contents_main {
                color: ${s.novel.color} !important;
                background-color: ${s.novel.background} !important;
                background-image: none !important;
            }
            #contents_main a:link {
                color: ${s.link.color_link} !important;
            }
            #contents_main a:visited {
                color: ${s.link.color_visited} !important;
            }
            #contents_main a:hover {
                color: ${s.link.color_hover} !important;
            }

            #noveltable1 th, #noveltable2 th, #onazi .th {
                color: ${s.novel.color} !important;
                background: ${s.novel.background_second} !important;
            }
            #noveltable1 th, #noveltable2 th,
            #noveltable1 td, #noveltable2 td,
            h1,
            #onazi {
                border-color: ${s.sublist.color} !important;
            }

            /* Attention */
            #novel_attention,
            .box_announce_bookmark {
                color: ${s.novel.color} !important;
                background-color: ${s.novel.background} !important;
                border-color: ${s.novel.background_second} !important;
            }
            `
        }

        /* Novel Page */
        if(novel_css) { //WIP
            rule += `
            .narou-tweaker .novel-titles a {
                color: inherit !important;
            }
            .narou-tweaker .novel-titles .novel-title, .narou-tweaker .novel-titles .novel-author, .narou-tweaker .novel-chapter {
                color: #999999 !important;
            }
            .narou-tweaker .novel-titles#ep-0 .novel-title, .narou-tweaker .novel-titles#ep-1 .novel-title {
                color: inherit !important;
            }
            `
        }
        
        /* Custom CSS */
        rule += `
        .narou-tweaker-header #novel_header ul li > a,
        .narou-tweaker-header #novel_header ul li > a:link,
        .narou-tweaker-header #novel_header ul li > a:visited,
        .narou-tweaker-header #novel_header ul li > form {
            color: ${s.sublist.color} !important;
        }
        .narou-tweaker-header #novel_header ul li a:hover,
        .narou-tweaker-header #novel_header ul li a:active,
        .narou-tweaker-header #novel_header ul li > form:hover,
        .narou-tweaker-header #novel_header ul li > form:active {
            color: ${s.sublist.hover} !important;
        }
        .narou-tweaker-header #novel_header_right ul li > a,
        .narou-tweaker-header #novel_header_right ul li > a:link,
        .narou-tweaker-header #novel_header_right ul li > a:visited,
        .narou-tweaker-header #novel_header_right ul li > form {
            color: ${s.sublist.color} !important;
        }
        .narou-tweaker-header #novel_header_right ul li > a:hover,
        .narou-tweaker-header #novel_header_right ul li > a:active,
        .narou-tweaker-header #novel_header_right ul li > form:hover,
        .narou-tweaker-header #novel_header_right ul li > form:active {
            color: ${s.sublist.hover} !important;
        }
        `

        chrome.scripting.insertCSS({
            css: rule,
            target: {
                tabId: tab.id,
            }
        }, function(){
            data.appliedSkinCSS = rule
            chrome.storage.local.set({appliedSkinCSS: data.appliedSkinCSS});
        })
    });    
}

export function applyFont(tab){
    chrome.storage.local.get(null, (data) => {
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
        rule += `
        #novel_honbun {
            line-height: ${lineHeight}% !important;
            font-size: ${fontSize}% !important;
        }
        body#container, #novel_color, #contents_main {
            font-family: ${fontFamily_Current} !important;
            text-rendering: ${textRendering} !important;
        }
        .novel-option--font-button#gothic {
            font-family: ${localFont["font-family"].gothic} !important;
        }
        .novel-option--font-button#serif {
            font-family: ${localFont["font-family"].serif} !important;
        }
        .novel-option--font-button#custom {
            font-family: ${fontFamily_Custom} !important;
        }
        #novel_honbun,
        #novel_a,
        #novel_p {
            max-width: 100vw !important;
            width: ${width}px !important;
        }
        #novel_color,
        .contents1 {
            max-width: 100vw !important;
            width: calc(max(${width}px, 730px)) !important;
        }
        `
        chrome.scripting.insertCSS({
            css: rule,
            target: {
                tabId: tab.id,
            }
        })
        data.appliedFontCSS = rule
        chrome.storage.local.set({appliedFontCSS: data.appliedFontCSS})
    })
}
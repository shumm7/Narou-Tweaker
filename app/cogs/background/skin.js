import { check, defaultValue, getCSSRule } from "../../utils/misc.js"
import { defaultOption, localSkins, localFont } from "../../utils/option.js"
import { checkNovelPageDetail } from "../novel/utils.js";

export function skinUpdateListener(){
    /* First Load */
    chrome.tabs.onUpdated.addListener((tabId, info, tab) => {
        if (info.status == 'loading' && tab.url.match(/^https:\/\/(ncode|novelcom).syosetu.com\/*.*/)){
            applySkin(tab)
            applyFont(tab)
        };
    });

    /* Storage Listener ( for Skin ) */
    chrome.storage.local.onChanged.addListener(function(changes){
        if(changes.skins!=undefined || changes.selectedSkin!=undefined){
            chrome.tabs.query({lastFocusedWindow: true, url: ["https://ncode.syosetu.com/*", "https://novelcom.syosetu.com/*"]}, tabs => {
                for(let i=0; i<tabs.length; i++){
                    applySkin(tabs[i])
                };
            });
        }
        if(changes.fontFontFamily!=undefined || changes.fontFontFamily_Custom!=undefined || changes.fontFontSize!=undefined || changes.fontLineHeight!=undefined || changes.fontTextRendering!=undefined || changes.fontWidth!=undefined){
            chrome.tabs.query({lastFocusedWindow: true, url: ["https://ncode.syosetu.com/*", "https://novelcom.syosetu.com/*"]}, tabs => {
                for(let i=0; i<tabs.length; i++){
                    applyFont(tabs[i])
                };
            });
        }
    })
}

function applySkin(tab){
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
        rule += `
        html body,
        html body[class^="customlayout"] {
            /* ボディー背景色*/
            background-color: ${s.novel.background};
            background-image: none;
        }
        body #novel_color,
        body #novel_color[class^="customlayout"] {
            /* 本文文字色*/
            color: ${s.novel.color};
        }
        body #novel_contents div.novelrankingtag,
        body #novel_contents .customlayout-color,
        body #novel_contents[class^="customlayout"] div.novelrankingtag,
        body #novel_contents[class^="customlayout"] .customlayout-color {
            /* ランキングタグ / 評価欄 文字色*/
            color: ${s.novel.color};
        }

        body #novel_contents a:link,
        body #novel_contents .customlayout-color a:link,
        body #novel_contents[class^="customlayout"] a:link,
        body #novel_contents[class^="customlayout"] .customlayout-color a:link  {
            /* リンク色 */
            color: ${s.link.color_link};
        }
        body #novel_contents a:visited,
        body #novel_contents .customlayout-color a:visited,
        body #novel_contents[class^="customlayout"] a:visited,
        body #novel_contents[class^="customlayout"] .customlayout-color a:visited {
            /* リンク色（訪問済み） */
            color: ${s.link.color_visited};
        }
        body #novel_contents a:hover,
        body #novel_contents .customlayout-color a:hover,
        body #novel_contents[class^="customlayout"] a:hover,
        body #novel_contents[class^="customlayout"] .customlayout-color a:hover {
            /* リンク色（ホバー） */
            color: ${s.link.color_hover};
        }
        body .index_box dl.novel_sublist2.underline,
        body .index_box dl.novel_sublist2.underline[class^="customlayout"] {
            /* 目次の下線（しおりあり） */
            border-bottom: 1px solid ${s.sublist.color};
        }
        body .index_box dl.novel_sublist2,
        body .index_box dl.novel_sublist2[class^="customlayout"] {
            /* 目次の下線（デフォルトは非表示） */
            border-color: transparent;
        }
        body .index_box dl.novel_sublist2:hover,
        body .index_box dl.novel_sublist2:hover[class^="customlayout"] {
            /* 目次の下線（ホバー） */
            border-color: ${s.sublist.hover};
        }
        `

        /* Expanded Skin */
        if(expand_skin){
            /* 作品トップページ */
            rule += `
            body .contents1 {
                /* 文字色 / 背景色 */
                color: ${s.novel.color};
                background-color: ${s.novel.background};
                background-image: none;
            }
            body .contents1 a:link {
                /* リンク色 */
                color: ${s.link.color_link};
            }
            body .contents1 a:visited {
                /* リンク色（訪問済み） */
                color: ${s.link.color_visited};
            }
            body .contents1 a:hover {
                /* リンク色（ホバー） */
                color: ${s.link.color_hover};
            }
            body #novel_attention,
            body .box_announce_bookmark {
                /* Attention */
                color: ${s.novel.color};
                background-color: transparent;
                border-color: ${s.novel.background_second};
            }
            `
            
            /* 作品情報ページ */
            rule += `
            body #contents_main {
                color: ${s.novel.color};
                background-color: ${s.novel.background};
                background-image: none;
            }
            body #contents_main a:link {
                color: ${s.link.color_link};
            }
            body #contents_main a:visited {
                color: ${s.link.color_visited};
            }
            body #contents_main a:hover {
                color: ${s.link.color_hover};
            }

            body #noveltable1 th,
            body #noveltable2 th, #onazi .th {
                color: ${s.novel.color};
                background: ${s.novel.background_second};
            }
            body #noveltable1 th, body #noveltable2 th,
            body #noveltable1 td, body #noveltable2 td,
            body h1,
            body #onazi {
                border-color: ${s.sublist.color};
            }
            `

            /* 小説本文ページ */
            if(novel_css) {
                rule += `
                body.narou-tweaker .novel-titles a {
                    color: inherit;
                }
                body.narou-tweaker .novel-titles .novel-title, .narou-tweaker .novel-titles .novel-author, .narou-tweaker .novel-chapter {
                    color: ${s.sublist.color};
                }
                body.narou-tweaker .novel-titles#ep-0 .novel-title, .narou-tweaker .novel-titles#ep-1 .novel-title {
                    color: inherit;
                }
                `
            }

            /* 感想 */
            rule +=
            `
            body #contents_main .waku {
                /* 感想の枠 */
                border: 1px solid ${s.sublist.color};
            }
            body #contents_main .comment_h2 {
                /* ヘッダ（一言、気になる点など） */
                background: ${s.novel.background_second};
                border-top: 2px solid ${s.sublist.color};
            }
            body #contents_main .comment_authorbox,
            body #contents_main .comment_info {
                /* 投稿者ボックス */
                border-top: 1px solid ${s.sublist.color};
            }
            body #contents_main .res {
                /* 返信 */
                background: ${s.novel.background_second};
                border: 1px solid ${s.sublist.color};
            }
            body #contents_main .box_novelno .no_posted_impression {
                /* エピソード番号 */
                background: ${s.novel.background_second};
            }
            body #contents_main .rescomment {
                /* 返信 */
                border: 1px solid ${s.sublist.color};
                background: ${s.novel.background_second};
            }
            body #contents_main div#rescomment {
                /* 返信 送信確認画面 */
                background: ${s.novel.background_second};
            }
            body #contents_main #hyoukalan #impression,
            body #contents_main #hyoukalan #review {
                /* 感想ボックスの文字をもとに戻す */
                font-family: 'Hiragino Kaku Gothic ProN', 'ヒラギノ角ゴ ProN W3', sans-serif;
                font-size: 14px;
                color: #444444;
            }
            body #contents_main .nothing {
                background: ${s.novel.background_second};
            }
            `

            /* レビュー */
            rule += `
            body #contents_main .review_waku {
                /* レビューの枠 */
                border: 1px solid ${s.sublist.color};
                background: transparent;
            }
            body #contents_main .review_waku .hyoukawaku_in {
                /* レビューの内枠 */
                background: transparent;
            }
            body #contents_main .review_waku .hyoukawaku_in .review_user {
                /* 投稿者ボックス */
                border-bottom: 1px solid ${s.sublist.color};
            }
            body #contents_main .review_waku .hyoukawaku_in .review_user .comment_authorbox {
                /* 投稿者ボックス */
                border-top: 1px solid ${s.sublist.color};
            }
            body #contents_main #hyoukalan {
                /* ボックスの文字をもとに戻す */
                font-family: 'Hiragino Kaku Gothic ProN', 'ヒラギノ角ゴ ProN W3', sans-serif;
                font-size: 14px;
                color: #444444;
            }
            `

            /* 縦書きPDF */
            rule += `
            article.verticalpdf,
            main.verticalpdf-main {
                color: ${s.novel.color};
            }
            .verticalpdf-main .verticalpdf-info{
                border-bottom: 1px solid ${s.sublist.color};
            }
            .verticalpdf-main .verticalpdf-info dt,
            .verticalpdf-main .verticalpdf-info dd {
                border-top: 1px solid ${s.sublist.color};
            }
            .verticalpdf-main .verticalpdf-warning {
                border: 1px solid ${s.sublist.color};
            }
            .verticalpdf-main .verticalpdf-create--created {
                background: ${s.novel.background_second};
            }
            `

            /* 誤字報告 */
            rule += `
            table.table_novelreport {
                border: 1px solid ${s.sublist.color};
            }
            table.table_novelreport th {
                background: ${s.novel.background_second};
            }
            #novel_honbun.novelreport_novelview {
                border: 1px solid ${s.sublist.color};
            }
            #novel_honbun.novelreport_novelview {
                border: 1px solid ${s.sublist.color};
            }
            #novel_honbun.novelreport_novelview p[data-original] span:hover {
                background: ${s.novel.background_second};
            }
            `
        }
        
        /* Custom CSS */
        rule += `
        body.narou-tweaker-header #novel_header ul li > a,
        body.narou-tweaker-header #novel_header ul li > a:link,
        body.narou-tweaker-header #novel_header ul li > a:visited,
        body.narou-tweaker-header #novel_header ul li > form,
        body.narou-tweaker-header #novel_header_right ul li > a,
        body.narou-tweaker-header #novel_header_right ul li > a:link,
        body.narou-tweaker-header #novel_header_right ul li > a:visited,
        body.narou-tweaker-header #novel_header_right ul li > form {
            color: ${s.sublist.color};
        }
        /* クリック済みのアイコン */
        body.narou-tweaker-header #novel_header ul li.typo a:visited, /*誤字報告*/
        body.narou-tweaker-header #novel_header ul li.impression a:visited, /* 感想 */
        body.narou-tweaker-header #novel_header ul li.review a:visited, /*レビュー */
        body.narou-tweaker-header #novel_header_right ul li.typo a:visited, /*誤字報告*/
        body.narou-tweaker-header #novel_header_right ul li.impression a:visited, /* 感想 */
        body.narou-tweaker-header #novel_header_right ul li.review a:visited /*レビュー */ {
            color: ${s.sublist.visited};
        }
        body.narou-tweaker-header #novel_header ul li a:hover,
        body.narou-tweaker-header #novel_header ul li a:active,
        body.narou-tweaker-header #novel_header ul li > form:hover,
        body.narou-tweaker-header #novel_header ul li > form:active,
        body.narou-tweaker-header #novel_header_right ul li > a:hover,
        body.narou-tweaker-header #novel_header_right ul li > a:active,
        body.narou-tweaker-header #novel_header_right ul li > form:hover,
        body.narou-tweaker-header #novel_header_right ul li > form:active {
            color: ${s.sublist.hover} !important;
        }
        body:not(.narou-tweaker-header) .wrap_menu_novelview_after {
            /* 背景色 */
            background-color: transparent;
            background-image: none;
            border-top: 1px solid ${s.sublist.color};
            border-bottom: 1px solid ${s.sublist.color};
        }
        body:not(.narou-tweaker-header) .wrap_menu_novelview_after ul li:first-child {
            border-left: 1px solid ${s.sublist.color};
        }
        body:not(.narou-tweaker-header) .wrap_menu_novelview_after .box_menu_novelview_after ul li {
            border-right: 1px solid ${s.sublist.color};
            color: ${s.sublist.color};
        }
        
        body:not(.narou-tweaker-header) #novel_contents[class^="customlayout"] .wrap_menu_novelview_after .box_menu_novelview_after ul li > a:visited,
        body:not(.narou-tweaker-header) #novel_contents[class^="customlayout"] .wrap_menu_novelview_after .box_menu_novelview_after ul li > form:visited,
        body:not(.narou-tweaker-header) #novel_contents[class^="customlayout"] .wrap_menu_novelview_after .box_menu_novelview_after ul li > form:visited > *{
            color: ${s.sublist.visited};
        }
        body:not(.narou-tweaker-header) #novel_contents[class^="customlayout"] .wrap_menu_novelview_after .box_menu_novelview_after ul li > a,
        body:not(.narou-tweaker-header) #novel_contents[class^="customlayout"] .wrap_menu_novelview_after .box_menu_novelview_after ul li > form,
        body:not(.narou-tweaker-header) #novel_contents[class^="customlayout"] .wrap_menu_novelview_after .box_menu_novelview_after ul li > form > *,
        body:not(.narou-tweaker-header) #novel_contents[class^="customlayout"] .wrap_menu_novelview_after .box_menu_novelview_after ul li > a:link,
        body:not(.narou-tweaker-header) #novel_contents[class^="customlayout"] .wrap_menu_novelview_after .box_menu_novelview_after ul li > form:link,
        body:not(.narou-tweaker-header) #novel_contents[class^="customlayout"] .wrap_menu_novelview_after .box_menu_novelview_after ul li > form:link > * {
            color: ${s.sublist.color};
        }
        body:not(.narou-tweaker-header) #novel_contents[class^="customlayout"] .wrap_menu_novelview_after .box_menu_novelview_after ul li > a:hover,
        body:not(.narou-tweaker-header) #novel_contents[class^="customlayout"] .wrap_menu_novelview_after .box_menu_novelview_after ul li > a:active,
        body:not(.narou-tweaker-header) #novel_contents[class^="customlayout"] .wrap_menu_novelview_after .box_menu_novelview_after ul li > form:hover,
        body:not(.narou-tweaker-header) #novel_contents[class^="customlayout"] .wrap_menu_novelview_after .box_menu_novelview_after ul li > form:active,
        body:not(.narou-tweaker-header) #novel_contents[class^="customlayout"] .wrap_menu_novelview_after .box_menu_novelview_after ul li > form:hover > *,
        body:not(.narou-tweaker-header) #novel_contents[class^="customlayout"] .wrap_menu_novelview_after .box_menu_novelview_after ul li > form:active > * {
            color: ${s.sublist.hover} !important;
            background: transparent;
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

function applyFont(tab){
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
        body #novel_honbun:not(.novelreport_novelview) {
            line-height: ${lineHeight}% !important;
            font-size: ${fontSize}% !important;
        }
        body #novel_honbun:not(.novelreport_novelview),
        body #novel_a,
        body #novel_p {
            /* 本文 あとがき まえがき*/
            max-width: 100vw;
            width: ${width}px;
        }
        `
        
        rule += `
        html body#container, body #novel_color, body #contents_main {
            font-family: ${fontFamily_Current};
            text-rendering: ${textRendering};
        }
        
        body #novel_color,
        body .contents1 {
            max-width: 100vw;
            width: calc(max(${width}px, 730px));
        }
        `

        /* Option Modal */
        rule += `
        body .novel-option--font-button#gothic {
            font-family: ${localFont["font-family"].gothic};
        }
        body .novel-option--font-button#serif {
            font-family: ${localFont["font-family"].serif};
        }
        body .novel-option--font-button#custom {
            font-family: ${fontFamily_Custom};
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
import { defaultValue } from "../../utils/misc.js"
import { defaultOption, localFont, localSkins } from "../../utils/option.js"

export function skinListener(){
    makeSkin()

    chrome.storage.local.onChanged.addListener(function(changes){
        if(changes.skins!=undefined ||
            changes.selectedSkin!=undefined ||
            changes.fontFontFamily!=undefined ||
            changes.fontFontFamily_Custom!=undefined ||
            changes.fontFontSize!=undefined ||
            changes.fontLineHeight!=undefined ||
            changes.fontTextRendering!=undefined ||
            changes.fontWidth!=undefined
        ){
            makeSkin()
        }
    })
}

function makeSkin(){
    chrome.storage.local.get(null, (data) => {
        const skin_idx = defaultValue(data.selectedSkin, defaultOption.selectedSkin)
        const skins = localSkins.concat(defaultValue(data.skins, defaultOption.skins))
        const skin = skins[skin_idx]

        const novel_css = data.novelCustomStyle

        const s = skin.style
        var rule = ""

        /* Skin */
        rule += `
        body,
        body[class^="customlayout"] {
            /* ボディー背景色*/
            background-color: ${s.novel.background};
            background-image: none;
            font-family: 'Hiragino Kaku Gothic ProN', 'ヒラギノ角ゴ ProN W3', sans-serif;
        }
        #novel_color,
        #novel_color[class^="customlayout"] {
            /* 本文文字色*/
            color: ${s.novel.color};
        }
        #novel_contents div.novelrankingtag,
        #novel_contents .customlayout-color,
        #novel_contents[class^="customlayout"] div.novelrankingtag,
        #novel_contents[class^="customlayout"] .customlayout-color {
            /* ランキングタグ / 評価欄 文字色*/
            color: ${s.novel.color};
        }

        #novel_contents a:link,
        #novel_contents .customlayout-color a:link,
        #novel_contents[class^="customlayout"] a:link,
        #novel_contents[class^="customlayout"] .customlayout-color a:link  {
            /* リンク色 */
            color: ${s.link.color_link};
        }
        #novel_contents a:visited,
        #novel_contents .customlayout-color a:visited,
        #novel_contents[class^="customlayout"] a:visited,
        #novel_contents[class^="customlayout"] .customlayout-color a:visited {
            /* リンク色（訪問済み） */
            color: ${s.link.color_visited};
        }
        #novel_contents a:hover,
        #novel_contents .customlayout-color a:hover,
        #novel_contents[class^="customlayout"] a:hover,
        #novel_contents[class^="customlayout"] .customlayout-color a:hover {
            /* リンク色（ホバー） */
            color: ${s.link.color_hover};
        }
        .index_box dl.novel_sublist2.underline,
        .index_box dl.novel_sublist2.underline[class^="customlayout"] {
            /* 目次の下線（しおりあり） */
            border-bottom: 1px solid ${s.sublist.color};
        }
        .index_box dl.novel_sublist2,
        .index_box dl.novel_sublist2[class^="customlayout"] {
            /* 目次の下線（デフォルトは非表示） */
            border-color: transparent;
        }
        .index_box dl.novel_sublist2:hover,
        .index_box dl.novel_sublist2:hover[class^="customlayout"] {
            /* 目次の下線（ホバー） */
            border-color: ${s.sublist.hover};
        }
        `

        /* 作品トップページ */
        rule += `
        .contents1 {
            /* 文字色 / 背景色 */
            color: ${s.novel.color};
            background-color: ${s.novel.background};
            background-image: none;
        }
        .contents1 a:link {
            /* リンク色 */
            color: ${s.link.color_link};
        }
        .contents1 a:visited {
            /* リンク色（訪問済み） */
            color: ${s.link.color_visited};
        }
        .contents1 a:hover {
            /* リンク色（ホバー） */
            color: ${s.link.color_hover};
        }
        #novel_attention,
        .box_announce_bookmark {
            /* Attention */
            color: ${s.novel.color};
            background-color: transparent;
            border-color: ${s.novel.background_second};
        }
        `
            
        /* 作品情報ページ */
        rule += `
        #contents_main {
            color: ${s.novel.color};
            background-color: ${s.novel.background};
            background-image: none;
        }
        #contents_main a:link {
            color: ${s.link.color_link};
        }
        #contents_main a:visited {
            color: ${s.link.color_visited};
        }
        #contents_main a:hover {
            color: ${s.link.color_hover};
        }

        #noveltable1 th,
        #noveltable2 th, #onazi .th {
            color: ${s.novel.color};
            background: ${s.novel.background_second};
        }
        #noveltable1 th, #noveltable2 th,
        #noveltable1 td, #noveltable2 td{
            border-color: ${s.sublist.color};
        }
        h1 {
            border-color: ${s.sublist.color};
        }
        #onazi {
            border-color: ${s.sublist.color};
        }
        `

        /* 小説本文ページ */
        if(novel_css) {
            rule += `
            .narou-tweaker .novel-titles a {
                color: inherit;
            }
            .narou-tweaker .novel-titles .novel-title,
            .narou-tweaker .novel-titles .novel-author,
            .narou-tweaker .novel-chapter {
                color: ${s.sublist.color};
            }
            .narou-tweaker .novel-titles#ep-0 .novel-title,
            .narou-tweaker .novel-titles#ep-1 .novel-title {
                color: inherit;
            }
            `
        }

        /* 感想 */
        rule +=
        `
        #contents_main .waku {
            /* 感想の枠 */
            border: 1px solid ${s.sublist.color};
        }
        #contents_main .comment_h2 {
            /* ヘッダ（一言、気になる点など） */
            background: ${s.novel.background_second};
            border-top: 2px solid ${s.sublist.color};
        }
        #contents_main .comment_authorbox,
        #contents_main .comment_info {
            /* 投稿者ボックス */
            border-top: 1px solid ${s.sublist.color};
        }
        #contents_main .res {
            /* 返信 */
            background: ${s.novel.background_second};
            border: 1px solid ${s.sublist.color};
        }
        #contents_main .box_novelno .no_posted_impression {
            /* エピソード番号 */
            background: ${s.novel.background_second};
        }
        #contents_main .rescomment {
            /* 返信 */
            border: 1px solid ${s.sublist.color};
            background: ${s.novel.background_second};
        }
        #contents_main div#rescomment {
            /* 返信 送信確認画面 */
            background: ${s.novel.background_second};
        }
        #contents_main #hyoukalan #impression,
        #contents_main #hyoukalan #review {
            /* 感想ボックスの文字をもとに戻す */
            font-family: 'Hiragino Kaku Gothic ProN', 'ヒラギノ角ゴ ProN W3', sans-serif;
            font-size: 14px;
            color: #444444;
        }
        #contents_main .nothing {
            background: ${s.novel.background_second};
        }
        `

        /* レビュー */
        rule += `
        #contents_main .review_waku {
            /* レビューの枠 */
            border: 1px solid ${s.sublist.color};
            background: transparent;
        }
        #contents_main .review_waku .hyoukawaku_in {
            /* レビューの内枠 */
            background: transparent;
        }
        #contents_main .review_waku .hyoukawaku_in .review_user {
            /* 投稿者ボックス */
            border-bottom: 1px solid ${s.sublist.color};
        }
        #contents_main .review_waku .hyoukawaku_in .review_user .comment_authorbox {
            /* 投稿者ボックス */
            border-top: 1px solid ${s.sublist.color};
        }
        #contents_main #hyoukalan {
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

        /* Skin CSS */
        rule += defaultValue(skin.css, "")

        /* Font */
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
        #novel_honbun:not(.novelreport_novelview) {
            line-height: ${lineHeight}% !important;
            font-size: ${fontSize}% !important;
        }
        #novel_honbun:not(.novelreport_novelview),
        #novel_a,
        #novel_p {
            /* 本文 あとがき まえがき*/
            max-width: 100vw;
            width: ${width}px;
        }
        `
        
        rule += `
        html body#container,
        #novel_color,
        #contents_main {
            font-family: ${fontFamily_Current};
            text-rendering: ${textRendering};
        }
        
        #novel_color,
        .contents1 {
            max-width: 100vw;
            width: calc(max(${width}px, 730px));
        }
        `

        /* Option Modal */
        rule += `
        .novel-option--font-button#gothic {
            font-family: ${localFont["font-family"].gothic};
        }
        .novel-option--font-button#serif {
            font-family: ${localFont["font-family"].serif};
        }
        .novel-option--font-button#custom {
            font-family: ${fontFamily_Custom};
        }
        `

        chrome.storage.local.set({appliedSkinCSS: rule})
    })
}
import { defaultValue } from "./misc.js"

/* 重複しないスキン名を作成 */
export function generateNoDuplicateName(skins, name, selected){
    if(checkSkinNameDuplicate(skins, name, selected)){
        for(var i=1; i<=10000; i++){
            if(!checkSkinNameDuplicate(skins, name + "("+i+")")){
            name = name + "("+i+")"
            break
            }
        }
    }
    return name

    function checkSkinNameDuplicate(skins, name, selected){
      var res = false
      $.each(skins, (i, skin)=>{
          if(skin.name==name && i!=selected){
              res = true;
          }
      })
      return res;
  }
}

export function formatSkinData(raw){
  
    // name
    if("name" in raw === false){raw.name = "" }
    if(typeof raw.name != typeof ""){raw.name = "" }
    if(raw.name.trim().length==0){raw.name="新規スキン"}

    // style
    if("style" in raw === false){raw.style = {}}
    if("novel" in raw.style === false){raw.style.novel = {}}
    if("link" in raw.style === false){raw.style.link = {}}
    if("sublist" in raw.style === false){raw.style.sublist = {}}

    return {
        name: raw.name,
        description: defaultValue(raw.description, ""),
        show: true,
        customizable: true,
        style: {
        novel: {
            background: defaultValue(raw.style.novel.background, "#fff"),
            background_second: defaultValue(raw.style.novel.background_second, "#dfdfdf"),
            color: defaultValue(raw.style.novel.color, "#444")
        },
        link: {
            color_link: defaultValue(raw.style.link.color_link, "#03c"),
            color_visited: defaultValue(raw.style.link.color_visited, "#857"),
            color_hover: defaultValue(raw.style.link.color_visited, "#393"),
        },
        sublist: {
            color: defaultValue(raw.style.sublist.color, "#444"),
            hover: defaultValue(raw.style.sublist.hover, "#9df"),
            visited: defaultValue(raw.style.sublist.visited, "#73a6bf"),
        }
        },
        css: defaultValue(raw.css, ""),
    }
}

export function makeSkinCSS(skin, novel_css){
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
    div.novelrankingtag,
    .customlayout-color {
        /* ランキングタグ / 評価欄 文字色*/
        color: ${s.novel.color};
    }

    #novel_contents a:link,
    #novel_contents.customlayout1 a:link,
    #novel_contents .customlayout-color a:link,
    a:link,
    .customlayout-color a:link  {
        /* リンク色 */
        color: ${s.link.color_link};
    }
    #novel_contents a:visited,
    #novel_contents.customlayout1 a:visited,
    #novel_contents .customlayout-color a:visited,
    a:visited,
    .customlayout-color a:visited {
        /* リンク色（訪問済み） */
        color: ${s.link.color_visited};
    }
    #novel_contents a:hover,
    #novel_contents.customlayout1 a:hover,
    #novel_contents .customlayout-color a:hover,
    a:hover,
    .customlayout-color a:hover {
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
    .novelview_history-box {
        background: ${s.novel.background_second};
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
        .narou-tweaker .novel-titles a,
        .narou-tweaker #novel_vertical_items .novel-titles a /* 縦書き */ {
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
    .p-novel__body.novelreport_novelview {
        border: 1px solid ${s.sublist.color};
    }
    .p-novel__body.novelreport_novelview {
        border: 1px solid ${s.sublist.color};
    }
    .p-novel__body.novelreport_novelview p[data-original] span:hover {
        background: ${s.novel.background_second};
    }
    `

    /* シリーズ */
    rule += `
    .narou-tweaker--series #content,
    .narou-tweaker--series .serieslist .ex,
    .narou-tweaker--series .serieslist .novel_info {
        /* 本文文字色*/
        color: ${s.novel.color};
    }
    .narou-tweaker--series .serieslist {
        border-bottom: 2px dotted ${s.sublist.color};
    }
    .narou-tweaker--series a:link {
        /* リンク色 */
        color: ${s.link.color_link};
    }
    .narou-tweaker--series a:visited {
        /* リンク色（訪問済み） */
        color: ${s.link.color_visited};
    }
    .narou-tweaker--series a:hover {
        /* リンク色（ホバー） */
        color: ${s.link.color_hover};
    }
    `
    
    /* Custom CSS */
    rule += `
    .narou-tweaker-header--mode-1 .novel-icon-wrapper ul li > a,
    .narou-tweaker-header--mode-1 .novel-icon-wrapper ul li > a:link,
    .narou-tweaker-header--mode-1 .novel-icon-wrapper ul li > a:visited,
    .narou-tweaker-header--mode-1 .novel-icon-wrapper ul li > form,
    .narou-tweaker-header--mode-1 .novel-icon-wrapper ul li > div > button {
        color: ${s.sublist.color} !important;
    }
    /* クリック済みのアイコン */
    .narou-tweaker-header--mode-1 .novel-icon-wrapper ul li.typo a:visited, /*誤字報告*/
    .narou-tweaker-header--mode-1 .novel-icon-wrapper ul li.impression a:visited, /* 感想 */
    .narou-tweaker-header--mode-1 .novel-icon-wrapper ul li.review a:visited /*レビュー */ {
        color: ${s.sublist.visited} !important;
    }
    .narou-tweaker-header--mode-1 .novel-icon-wrapper ul li a:hover,
    .narou-tweaker-header--mode-1 .novel-icon-wrapper ul li a:active,
    .narou-tweaker-header--mode-1 .novel-icon-wrapper ul li > form:hover,
    .narou-tweaker-header--mode-1 .novel-icon-wrapper ul li > form:active,
    .narou-tweaker-header--mode-1 .novel-icon-wrapper ul li > div > button:hover,
    .narou-tweaker-header--mode-1 .novel-icon-wrapper ul li > div > button:active {
        color: ${s.sublist.hover} !important;
    }

    .narou-tweaker-header--mode-0 .wrap_menu_novelview_after {
        /* 背景色 */
        background-color: transparent;
        background-image: none;
        border-top: 1px solid ${s.sublist.color};
        border-bottom: 1px solid ${s.sublist.color};
    }
    .narou-tweaker-header--mode-0 .wrap_menu_novelview_after ul li:first-child {
        border-left: 1px solid ${s.sublist.color};
    }
    .narou-tweaker-header--mode-0 .wrap_menu_novelview_after .box_menu_novelview_after ul li {
        border-right: 1px solid ${s.sublist.color};
        color: ${s.sublist.color};
    }
    
    .narou-tweaker-header--mode-0 .wrap_menu_novelview_after .box_menu_novelview_after ul li:not(.enactive) > a:visited,
    .narou-tweaker-header--mode-0 .wrap_menu_novelview_after .box_menu_novelview_after ul li:not(.enactive) > form:visited,
    .narou-tweaker-header--mode-0 .wrap_menu_novelview_after .box_menu_novelview_after ul li:not(.enactive) > form:visited > *{
        color: ${s.sublist.visited} !important;
    }
    .narou-tweaker-header--mode-0 .wrap_menu_novelview_after .box_menu_novelview_after ul li:not(.enactive) > a,
    .narou-tweaker-header--mode-0 .wrap_menu_novelview_after .box_menu_novelview_after ul li:not(.enactive) > form,
    .narou-tweaker-header--mode-0 .wrap_menu_novelview_after .box_menu_novelview_after ul li:not(.enactive) > form > *,
    .narou-tweaker-header--mode-0 .wrap_menu_novelview_after .box_menu_novelview_after ul li:not(.enactive) > a:link,
    .narou-tweaker-header--mode-0 .wrap_menu_novelview_after .box_menu_novelview_after ul li:not(.enactive) > form:link,
    .narou-tweaker-header--mode-0 .wrap_menu_novelview_after .box_menu_novelview_after ul li:not(.enactive) > form:link > * {
        color: ${s.sublist.color} !important;
    }
    .narou-tweaker-header--mode-0 .wrap_menu_novelview_after .box_menu_novelview_after ul li:not(.enactive) > a:hover,
    .narou-tweaker-header--mode-0 .wrap_menu_novelview_after .box_menu_novelview_after ul li:not(.enactive) > a:active,
    .narou-tweaker-header--mode-0 .wrap_menu_novelview_after .box_menu_novelview_after ul li:not(.enactive) > form:hover,
    .narou-tweaker-header--mode-0 .wrap_menu_novelview_after .box_menu_novelview_after ul li:not(.enactive) > form:active,
    .narou-tweaker-header--mode-0 .wrap_menu_novelview_after .box_menu_novelview_after ul li:not(.enactive) > form:hover > *,
    .narou-tweaker-header--mode-0 .wrap_menu_novelview_after .box_menu_novelview_after ul li:not(.enactive) > form:active > * {
        color: ${s.sublist.hover} !important;
        background: transparent;
    }
    .narou-tweaker-header--mode-0 #novel_header ul li.siori:not(.enactive) > * {
        color: #666666 !important;
    }
    
    .novel-icon-wrapper ul li.enactive > a,
    .novel-icon-wrapper ul li.enactive > form,
    .novel-icon-wrapper ul li.enactive > a:hover,
    .novel-icon-wrapper ul li.enactive > form:hover,
    .novel-icon-wrapper ul li.enactive > a:active,
    .novel-icon-wrapper ul li.enactive > form:active {
        /* Enactive アイコン */
        color: ${s.novel.background_second} !important;
    }
    `

    return rule
}
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
    :root {
        --00-text: ${s.novel.color};
        --01-link: ${s.link.color_link};
        --02-link-visited: ${s.link.color_visited};
        --03-link-hover: ${s.link.color_hover};
        --04-bg: ${s.novel.background};
    }
    .js-customlayout1 {
        --00-text: ${s.novel.color};
        --01-link: ${s.link.color_link};
        --02-link-visited: ${s.link.color_visited};
        --03-link-hover: ${s.link.color_hover};
        --04-bg: ${s.novel.background};
        --color-custom-epilist-underline: transparent;
        --color-custom-epilist-underline-favorited: ${s.sublist.visited};
        --color-custom-epilist-underline-hover: ${s.sublist.hover};
        --color-custom-pager-text-disabled: ${s.sublist.color};
    }
    .narou-tweaker-header--mode-0 .l-scrollheader,
    .narou-tweaker-header--mode-1 .l-scrollheader {
        /* ヘッダの残像を非表示 */
        display: none !important;
    }
    .p-announce-bkmfix {
        color: #444;
    }

    `
    /* 本文ページ以外 */
    rule += `
    body.narou-tweaker--novelcom-page {
        background: var(--04-bg);
    }
    .narou-tweaker--novelcom-page {
        --color-text: var(--00-text);
    }
    `

    /* 作品情報ページ */
    rule += `
    #contents_main {
        color: var(--00-text);
        background-color: var(--04-bg);
        background-image: none;
    }
    #contents_main #novel_attention {
        color: #333;
    }
    #contents_main a:link {
        color: var(--01-link);
    }
    #contents_main a:visited {
        color: var(--02-link-visited);
    }
    #contents_main a:hover {
        color: var(--03-link-hover);
    }

    #noveltable1 th,
    #noveltable2 th, #onazi .th {
        color: var(--00-text);
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
    rule += `
    .c-announce-box {
        background-color: var(--04-bg);
        color: var(--00-text);
    }
    `
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
            color: var(--color-custom-text);
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
        color: var(--00-text);
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
        color: var(--00-text);
    }
    .narou-tweaker--series .serieslist {
        border-bottom: 2px dotted ${s.sublist.color};
    }
    .narou-tweaker--series a:link {
        /* リンク色 */
        color: var(--01-link);
    }
    .narou-tweaker--series a:visited {
        /* リンク色（訪問済み） */
        color: var(--02-link-visited);
    }
    .narou-tweaker--series a:hover {
        /* リンク色（ホバー） */
        color: var(--03-link-hover);
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
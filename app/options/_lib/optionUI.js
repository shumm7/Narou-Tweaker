import { defaultOption } from "../../utils/option.js";
import { customUIList } from "./customUI.js";
import { getOptionCategory, getOptionFromId, getOptionPageFromId, removeFavoriteOption, appendFavoriteOption, getOptionChildsFromId, getOptionParentFromId, moveFavoriteOption } from "./optionLib.js";

import { general_optionsList } from "../general/_options.js";
import { narou_optionsList } from "../narou/_options.js";
import { novel_optionsList } from "../novel/_options.js";
import { yomou_optionsList } from "../yomou/_options.js";
import { workspace_optionsList } from "../workspace/_options.js";
import { mypage_optionsList } from "../mypage/_options.js";
import { mitemin_optionsList } from "../mitemin/_options.js";
import { kasasagi_optionsList } from "../kasasagi/_options.js";

export const optionCategoryList = [
    {
        title: "検索",
        description: "設定項目を絞り込み検索することができます。",
        id: "search",
        defaultCategory: "general",
        categories: [
            {
                title: "検索",
                id: "general",
            },
        ],
        tabs: false,
        sidebar: false,
        popup: {
            defaultPage: true
        },
        noindex: true,
    },
    {
        title: "全般",
        description: "Narou Tweaker全体の設定を変更することが出来ます。",
        id: "general",
        icon: "fa-solid fa-gear",
        defaultCategory: "introduction",
        popup: {
            hide: true,
            defaultPage: true
        },
        categories: [
            {
                title: "デバッグ",
                id: "debug",
                description: {
                    attention: "【デバッグモード】開発者向けの機能です。不具合が発生する可能性がありますのでご注意ください。"
                }
            },
            {
                title: "Narou Tweaker",
                id: "introduction",
            },
            {
                title: "基本設定",
                id: "config",
                description: {
                    text: "Narou Tweaker全体に影響する設定を変更します。"
                }
            },
            {
                title: "設定データ",
                id: "data",
                description: {
                    text: "Narou Tweakerの設定データを変更します。",
                    attention: "すべての設定がリセットされる場合があります。操作にはご注意ください。"
                }
            },
            {
                title: "パッチノート",
                id: "version",
            }
        ]
    },
    {
        title: "お気に入り",
        description: "お気に入りのオプションを登録できます。",
        id: "favorite",
        icon: "fa-solid fa-heart",
        defaultCategory: "general",
        categories: [
            {
                title: "全般",
                id: "general",
            },
        ],
        tabs: false,
        popup: {
            hide: true,
            defaultPage: true
        },
    },
    {
        title: "favorite-separator",
        id: "favorite-separator",
        categories: [],
        noindex: true,
        separator: true,
        popup: {
            hide: true,
        },
    },
    {
        title: "小説家になろう",
        description: "小説家になろうの表示を設定することが出来ます。",
        id: "narou",
        icon: "fa-solid fa-house",
        targetUrl: ["*.syosetu.com", "eparet.net"],
        defaultCategory: "general",
        popup: {
            defaultPage: true
        },
        categories: [
            {
                title: "全般",
                id: "general",
                description: {
                    text: "小説家になろうの全般に影響する設定を変更します。"
                }
            },
        ]
    },
    {
        title: "小説ページ",
        description: "小説本文やその関連ページの設定を変更することが出来ます。",
        id: "novel",
        icon: "fa-solid fa-book",
        targetUrl: ["ncode.syosetu.com", "novelcom.syosetu.com", "novel18.syosetu.com", "novelcom18.syosetu.com"],
        defaultCategory: "general",
        popup: {
            defaultPage: true
        },
        categories: [
            {
                title: "全般",
                id: "general",
                description: {
                    text: "小説ページ全体に影響する設定を変更します。"
                }
            },
            {
                title: "本文",
                id: "novel",
                description: {
                    text: "本文ページに影響する設定を変更します。"
                }
            },
            {
                title: "スキン",
                id: "style",
                description: {
                    text: "ページの外観を変更します。",
                    small: "これらの設定は、小説ページ内から直接変更できます。",
                }
            },
            {
                title: "書体",
                id: "font",
                description: {
                    text: "フォントや行間などの文章レイアウトを変更します。",
                    small: "これらの設定は、小説ページ内から直接変更できます。",
                }
            },
            {
                title: "文章校正",
                id: "correction",
                description: {
                    text: "小説本文を指定した方法で校正します。",
                    small: "これらの設定は、小説ページ内から直接変更できます。",
                }
            },
        ]
    },
    {
        title: "小説を読もう！",
        description: "ランキングや検索ページの表示を設定することが出来ます。",
        id: "yomou",
        icon: "fa-solid fa-crown",
        targetUrl: ["yomou.syosetu.com", "noc.syosetu.com", "mnlt.syosetu.com", "mid.syosetu.com"],
        defaultCategory: "rank",
        popup: {
            defaultPage: true
        },
        categories: [
            {
                title: "ランキング",
                id: "rank",
                description: {
                    text: "ランキング全般の設定を変更します。"
                }
            },
            {
                title: "ランキング（トップ）",
                id: "ranktop",
                description: {
                    text: "ランキングのトップページの設定を変更します。"
                }
            },
        ]
    },
    {
        title: "ユーザページ",
        description: "ユーザページの表示を設定することが出来ます。",
        id: "workspace",
        icon: "fa-solid fa-pen-nib",
        targetUrl: ["syosetu.com"],
        defaultCategory: "general",
        popup: {
            defaultPage: true
        },
        categories: [
            {
                title: "全般",
                id: "general",
                description: {
                    text: "ユーザページの全体に影響する設定を変更します。"
                }
            },
            {
                title: "小説管理",
                id: "manage",
                description: {
                    text: "小説の管理画面を変更します。"
                }
            },
            {
                title: "エディタ",
                id: "editor",
                description: {
                    text: "小説の編集画面を変更します。"
                }
            },
            {
                title: "お気に入り",
                id: "favorite",
                description: {
                    text: "ブックマークやお気に入りユーザの設定を変更します。"
                }
            },
            {
                title: "リアクション",
                id: "reaction",
                description: {
                    text: "感想やレビューなどの設定を変更します。"
                }
            },
        ]
    },
    {
        title: "マイページ",
        description: "マイページの表示を設定することが出来ます。",
        id: "mypage",
        icon: "fa-solid fa-user",
        targetUrl: ["mypage.syosetu.com", "xmypage.syosetu.com"],
        defaultCategory: "general",
        popup: {
            defaultPage: true
        },
        categories: [
            {
                title: "全般",
                id: "general",
                description: {
                    text: "マイページの全体に影響する設定を変更します。"
                }
            },
            {
                title: "活動報告",
                id: "blog",
                description: {
                    text: "活動報告の設定を変更します。"
                }
            },
            {
                title: "プロフィール",
                id: "profile",
                description: {
                    text: "プロフィールの設定を変更します。"
                }
            },
        ]
    },
    {
        title: "みてみん",
        description: "みてみん・えぱれっとの表示を設定することが出来ます。",
        id: "mitemin",
        icon: "fa-solid fa-palette",
        targetUrl: ["mitemin.net", "eparet.net"],
        defaultCategory: "general",
        popup: {
            defaultPage: true
        },
        categories: [
            {
                title: "全般",
                id: "general",
                description: {
                    text: "みてみん全体に影響する設定を変更します。"
                }
            },
        ]
    },
    {
        title: "アクセス解析",
        description: "KASASAGI（アクセス解析ページ）の表示を設定することが出来ます。",
        id: "kasasagi",
        icon: "fa-solid fa-chart-line",
        targetUrl: ["kasasagi.hinaproject.com"],
        defaultCategory: "general",
        popup: {
            defaultPage: true
        },
        categories: [
            {
                title: "全般",
                id: "general",
                description: {
                    text: "KASASAGIの全体に影響する設定を変更します。"
                }
            },
            {
                title: "総合PV",
                id: "pageview",
                description: {
                    text: "総合PVの設定を変更します。"
                }
            },
            {
                title: "エピソード別",
                id: "episode",
                description: {
                    text: "エピソード別ユニークの設定を変更します。"
                }
            },
            {
                title: "日別",
                id: "day",
                description: {
                    text: "日別PV・ユニークの設定を変更します。"
                }
            },
            {
                title: "月別",
                id: "month",
                description: {
                    text: "月別PV・ユニークの設定を変更します。"
                }
            },
        ]
    },
]

export const optionList = [
    /* 検索 */
    {
        id: "extSearch",
        title: "検索",
        description: {
            text: "キーワードを入力してください",
            small: "・スペース区切りでAND検索ができます。<br>・「\"◯◯\"」と括ると完全一致する語句を検索します。<br>・「-◯◯」で特定の語句を除外します。"
        },
        ui: {
            type: "custom",
            name: "default",
            data: "ui_extSearchBox"
        },
        location: {
            page: "search",
            category: "general",
            noindex: true,
        },
        value: {
            buttons: {
                reset: false,
                favorite: false,
            },
        },
    },

    /* 全般 */
    ...general_optionsList,

    /* 小説家になろう */
    ...narou_optionsList,

    /* 小説ページ */
    ...novel_optionsList,
    
    /* 小説を読もう！ */
    ...yomou_optionsList,

    /* ユーザページ */
    ...workspace_optionsList,

    /* マイページ */
    ...mypage_optionsList,

    /* みてみん */
    ...mitemin_optionsList,

    /* アクセス解析 */
    ...kasasagi_optionsList,
]

export function getOptionElement(option, mode){
    const page = option.location.page
    const category = option.location.category
    const id = option.id
    const title = option.title
    const style = option.style
    const elmClass = option.class
    const description = option.description
    const uiType = option.ui.type
    const uiName = option.ui.name
    const uiData = option.ui.data
    const uiStyle = option.ui.style
    const uiClass = option.ui.class
    var uiPrefix = option.ui.prefix
    var uiSuffix = option.ui.suffix
    const buttons = option.value.buttons
    const related = option.value.related
    const requirement = option.value.requirement
    const isExperimental = option.value.isExperimental
    const isAdvanced = option.value.isAdvanced
    const isDebug = option.value.isDebug
    const hasParent = option.location.hasParent
    const parent = option.location.parent

    var elm
    
    /* Outer */
    if(hasParent && mode!=="search"){
        elm = $(`<div class="contents-option" name="${id}"></div>`)
    }else{
        elm = $(`<div class="contents-wide" name="${id}"><div class="contents-option"></div></div>`)
    }
    
    elm.addClass("option-outer")
    if(mode==="search"){
        elm.addClass(["search-result-box", "search-result--option"])
    }
    
    /* Option Items */
    if(uiType == "parent"){
        elm.append(`
            <div class="contents-option-head"></div>
            <div class="contents-wide-column"></div>
        `)
        
    }else{
        if(elm.hasClass("contents-option")){
            elm.append(`<div class="contents-option-head"></div>`)
        }else{
            elm.find(".contents-option").append(`<div class="contents-option-head"></div>`)
        }

        if(!uiPrefix){
            uiPrefix = ""
        }
        if(!uiSuffix){
            uiSuffix = ""
        }

        /* Contents */
        if(uiType === "toggle"){
            if(elm.hasClass("contents-option")){
                elm.append(`<div class="contents-option-content"></div>`)
            }else{
                elm.find(".contents-option").append(`<div class="contents-option-content"></div>`)
            }

            if(uiName==="default" || uiName === "toggle" || uiName===undefined){
                var item = $(`<input type="checkbox" id="${id}" class="options toggle">`)
                if(uiStyle){
                    item.css(uiStyle)
                }
                if(uiClass){
                    item.addClass(uiClass)
                }

                var toggleElm = $(`
                    ${uiPrefix}
                    ${item[0].outerHTML}
                    <label for="${id}" class="toggle"></label>
                    ${uiSuffix}
                `)

                elm.find(".contents-option-content").append(toggleElm)
            }else if(uiName==="checkbox"){
                var item = $(`<input type="checkbox" id="${id}" class="options ui-checkbox">`)
                if(uiStyle){
                    item.css(uiStyle)
                }
                if(uiClass){
                    item.addClass(uiClass)
                }

                var toggleElm = $(`
                    ${uiPrefix}
                    ${item[0].outerHTML}
                    <label for="${id}" class="tui-checkbox">${uiSuffix}</label>
                `)

                elm.find(".contents-option-content").append(toggleElm)
            }
        }
        else if(uiType === "dropdown"){
            if(elm.hasClass("contents-option")){
                elm.append(`<div class="contents-option-content"></div>`)
            }else{
                elm.find(".contents-option").append(`<div class="contents-option-content"></div>`)
            }

            if(uiName==="default" || uiName===undefined){
                var dropdownElm = $(`
                    <div class="dropdown">
                        ${uiPrefix}
                        <select id="${id}" class="options">
                        </select>
                        ${uiSuffix}
                    </div>
                `)

                if(uiStyle){
                    dropdownElm.css(uiStyle)
                }
                if(uiClass){
                    dropdownElm.addClass(uiClass)
                }

                $.each(uiData, function(_, val){
                    var value = ""
                    var title = ""
                    if(val.value){
                        value = val.value
                    }else{
                        return true
                    }
                    if(val.title){
                        title = val.title
                    }else{
                        if(value){
                            title = value
                        }else{
                            return true
                        }
                    }

                    dropdownElm.find("select").append(`
                        <option value="${value}">${title}</option>
                    `)
                })

                elm.find(".contents-option-content").append(dropdownElm)
            }
        }
        else if(uiType === "input"){
            if(elm.hasClass("contents-option")){
                elm.append(`<div class="contents-option-content"></div>`)
            }else{
                elm.find(".contents-option").append(`<div class="contents-option-content"></div>`)
            }

            if(uiName==="default" || uiName===undefined || uiName==="text" || uiName==="number"){
                var item = $(`
                    <div class="textfield">
                        ${uiPrefix}<input class="options" type="text" id="${id}">${uiSuffix}
                    </div>
                `)

                if(uiStyle){
                    item.css(uiStyle)
                }
                if(uiClass){
                    item.addClass(uiClass)
                }

                elm.find(".contents-option-content").append(item)
            }
            else if(uiName==="integer"){
                var item = $(`
                    <div class="textfield">
                        <label>${uiPrefix}</label>
                        <input class="options" type="number" id="${id}">
                        <label>${uiSuffix}</label>
                    </div>
                `)
                
                if(uiData){
                    if(uiData.min){
                        item.find("input").attr("min", uiData.min)
                    }
                    if(uiData.max){
                        item.find("input").attr("max", uiData.max)
                    }
                }

                if(uiStyle){
                    item.css(uiStyle)
                }
                if(uiClass){
                    item.addClass(uiClass)
                }

                elm.find(".contents-option-content").append(item)
            }
            else if(uiName==="color"){
                var item = $(`
                    <div class="textfield">
                        <label>${uiPrefix}</label>
                        <input class="options color" type="text" id="${id}" data-coloris>
                        <label>${uiSuffix}</label>
                    </div>
                `)

                if(uiStyle){
                    item.css(uiStyle)
                }
                if(uiClass){
                    item.addClass(uiClass)
                }

                elm.find(".contents-option-content").append(item)
            }
        }
        else if(uiType === "textarea"){
            if(elm.hasClass("contents-option")){
                elm.append(`<div class="contents-option-content"></div>`)
            }else{
                elm.find(".contents-option").append(`<div class="contents-option-content"></div>`)
            }

            if(uiName==="default" || uiName===undefined){
                var item = $(`
                    <div class="textarea-outer">
                        <label>${uiPrefix}</label>
                        <textarea class="textarea options" id="${id}"></textarea>
                        <label>${uiSuffix}</label>
                    </div>
                `)

                if(uiStyle){
                    item.css(uiStyle)
                }
                if(uiClass){
                    item.addClass(uiClass)
                }

                elm.find(".contents-option-content").append(item)
            }else if(uiName === "syntax-highlight"){
                var item = $(`
                    <div class="textarea-outer">
                        <label>${uiPrefix}</label>
                        <textarea class="textarea options syntax-highlight" id="${id}" data="${uiData}"></textarea>
                        <label>${uiSuffix}</label>
                    </div>
                `)

                if(uiStyle){
                    item.css(uiStyle)
                }
                if(uiClass){
                    item.addClass(uiClass)
                }

                elm.find(".contents-option-content").append(item)
            }
        }
        else if(uiType === "custom"){
            if(elm.hasClass("contents-option")){
                elm.append(`<div class="contents-option-content"></div>`)
            }else{
                elm.find(".contents-option").append(`<div class="contents-option-content"></div>`)
            }
            
            if(uiName==="default" || uiName===undefined){
                if(customUIList[uiData]){
                    elm.find(".contents-option-content").append(customUIList[uiData])
                }
            }else if(uiName==="wide"){
                if(customUIList[uiData]){
                    elm.empty()
                    elm.append(customUIList[uiData])
                }
            }
        }
        /*
        else if(mode==="search"){ //検索用例外設定
            if(elm.hasClass("contents-option")){
                elm.append(`<div class="contents-option-content"></div>`)
            }else{
                elm.find(".contents-option").append(`<div class="contents-option-content"></div>`)
            }

            elm.addClass("search-result--option-disabled")
            var item = $(`
                <div class="search-result--items">
                    <div class="search-result--items-disabled">
                            <a href="/options/${page}/index.html?id=${id}&focus=1" target="_self">
                                <div class="search-result--items-disabled-box">このオプションはここでは設定できません。</div>
                            </a>
                        </span>
                    </div>
                </div>
            `)

            elm.find(".contents-option-content").append(item)
        }
        */
    }

    /* Title / Description */
    if(title || description){
        const pageData = getOptionPageFromId(page)
        const categoryData = getOptionCategory(pageData, category)

        //title
        if(title){
            if(mode === "favorite"){
                if(!elm.find(".contents-item--heading").length){
                    elm.find(".contents-option-head").append(`<div class="contents-item--heading"><a href="/options/${page}/index.html?id=${id}&focus=1" target="_self">${title}</a></div>`)
                }else{
                    elm.find(".contents-item--heading").empty()
                    elm.find(".contents-item--heading").append(`<a href="/options/${page}/index.html?id=${id}&focus=1" target="_self">${title}</a>`)
                }
            }
            else if(mode==="search"){
                var crumbs = ""
                var optionTag = ""
                /*
                optionTag = `
                    <span class="search-result--items-crumbs-item search-result--items-id">
                        <a class="search-result--items-id-tag" href="/options/${page}/index.html?id=${id}&focus=1" target="_self">${id}</a>
                    </span>
                `
                */

                if(hasParent){
                    const parentData = getOptionFromId(parent)
                    if(parentData){
                        crumbs = `
                            <div class="search-result--items-crumbs">
                                <span class="search-result--items-crumbs-item"><a href="/options/${pageData.id}/index.html" target="_self">${pageData.title}</a></span>
                                <span class="search-result--items-crumbs-item"><a href="/options/${pageData.id}/index.html?category=${categoryData.id}" target="_self">${categoryData.title}</a></span>
                                <span class="search-result--items-crumbs-item"><a href="/options/${pageData.id}/index.html?id=${parentData.id}" target="_self">${parentData.title}</a></span>
                                ${optionTag}
                            </div>
                        `
                    }else{
                        crumbs = `
                            <div class="search-result--items-crumbs">
                                <span class="search-result--items-crumbs-item"><a href="/options/${pageData.id}/index.html" target="_self">${pageData.title}</a></span>
                                <span class="search-result--items-crumbs-item"><a href="/options/${pageData.id}/index.html?category=${categoryData.id}" target="_self">${categoryData.title}</a></span>
                                ${optionTag}
                            </div>
                        `
                    }
                }else{
                    crumbs = `
                        <div class="search-result--items-crumbs">
                            <span class="search-result--items-crumbs-item"><a href="/options/${pageData.id}/index.html" target="_self">${pageData.title}</a></span>
                            <span class="search-result--items-crumbs-item"><a href="/options/${pageData.id}/index.html?category=${categoryData.id}" target="_self">${categoryData.title}</a></span>
                            ${optionTag}
                        </div>
                    `
                }

                if(!elm.find(".contents-item--heading").length){
                    elm.find(".contents-option-head").append(`
                        <div class="contents-item--heading">
                            ${crumbs}
                            <div class="search-result--items-title">
                                <a href="/options/${page}/index.html?id=${id}&focus=1" target="_self">${title}</a>
                            </div>
                        </div>
                    `)
                }else{
                    elm.find(".contents-item--heading").empty()
                    elm.find(".contents-item--heading").append(`
                        ${crumbs}
                        <div class="search-result--items-title">
                            <a href="/options/${page}/index.html?id=${id}&focus=1" target="_self">${title}</a>
                        </div>
                    `)
                }
            }
            else{
                if(!elm.find(".contents-item--heading").length){
                    elm.find(".contents-option-head").append(`<div class="contents-item--heading">${title}</div>`)
                }else{
                    elm.find(".contents-item--heading").empty()
                    elm.find(".contents-item--heading").append(title)
                }
            }
        }
        
        // description
        var descriptionText = []

        if(description){
            if(description.text){
                descriptionText.push(`<div class="contents-item--description-item">${description.text}</div>`)
            }
            if(description.small){
                descriptionText.push(`<div class="contents-item--description-item description-small">${description.small}</div>`)
            }
            if(description.attention){
                descriptionText.push(`<div class="contents-item--description-item description-attention">${description.attention}</div>`)
            }
        }

        if(descriptionText.length > 0){
            if(!elm.find(".contents-item--description").length){
                elm.find(".contents-option-head").append(`<div class="contents-item--description">${descriptionText.join("")}</div>`)
            }else{
                elm.find(".contents-item--description").empty()
                elm.find(".contents-item--description").append(descriptionText.join(""))
            }
        }
    }

    /* Buttons */
    if(buttons){
        var buttonElm = $(`<div class="contents-item--buttons"></div>`)

        if(buttons.favorite){
            /* favorite buttons */
            var buttonOuterElm = $(`<div class="contents-item--button-item contents-item--button-favorite"></div>`)

            if(mode==="favorite"){
                /* arrows */
                if(!hasParent){
                    var buttonIconElm_Up = $(`
                        <div class="contents-item--button-icon contents-item--button-favorite--prev">
                            <i class="fa-solid fa-arrow-up"></i>
                        </div>
                    `).on("click", function(e){
                        moveFavoriteOption(id, -1)
                    })
        
                    var buttonIconElm_Down = $(`
                        <div class="contents-item--button-icon contents-item--button-favorite--next">
                            <i class="fa-solid fa-arrow-down"></i>
                        </div>
                    `).on("click", function(e){
                        moveFavoriteOption(id, 1)
                    })
        
                    buttonElm.append(buttonIconElm_Up)
                    buttonElm.append(buttonIconElm_Down)
                    buttonElm.append(`<div class="contents-item--button-item contents-item--button-separator"></div>`)
                }

                
                /* remove button */
                var buttonIconElm_On = $(`
                    <div class="contents-item--button-icon contents-item--button-favorite-icon contents-item--button-favorite--on">
                        <i class="fa-solid fa-trash"></i>
                    </div>
                `).on("click", function(e){
                    removeFavoriteOption(id)
                })
    
                buttonOuterElm.append(buttonIconElm_On)
                buttonElm.append(buttonOuterElm)

            }else{
                var buttonIconElm_Off = $(`
                    <div class="contents-item--button-icon contents-item--button-favorite-icon contents-item--button-favorite--off">
                        <i class="fa-regular fa-heart"></i>
                    </div>
                `).on("click", function(e){
                    appendFavoriteOption(id)
                })
    
                var buttonIconElm_On = $(`
                    <div class="contents-item--button-icon contents-item--button-favorite-icon contents-item--button-favorite--on">
                        <i class="fa-solid fa-heart"></i>
                    </div>
                `).on("click", function(e){
                    removeFavoriteOption(id)
                })
    
                buttonOuterElm.append(buttonIconElm_Off)
                buttonOuterElm.append(buttonIconElm_On)
                buttonElm.append(buttonOuterElm)
            }
        }

        // separator
        if(buttons.favorite && buttons.reset){
            buttonElm.append(`<div class="contents-item--button-item contents-item--button-separator"></div>`)
        }

        // reset button
        if(buttons.reset){
            var buttonElm_Reset = $(`
                <div class="contents-item--button-item contents-item--button-reset">
                    <div class="contents-item--button-icon contents-item--button-reset-icon">
                        <i class="fa-solid fa-rotate-left"></i>
                    </div>
                </div>
            `).on("click", function(e){
                if(window.confirm(`この設定データをリセットします。よろしいですか？\n項目：${title}`)){

                    var reset = (option, ret) => {
                        if(option.value){
                            if(Array.isArray(option.value.related)){
                                $.each(option.value.related, function(_, key){
                                    if(key in defaultOption){
                                        ret[key] = defaultOption[key]
                                    }
                                })
                            }else if(option.value.related === "child"){
                                var childs = getOptionChildsFromId(option.id)
                                $.each(childs, function(_, child){
                                    ret = reset(child, ret)
                                })
                            }
                        }
                        return ret
                    }

                    var ret = {}
                    var option = getOptionFromId(id)
                    ret = reset(option, ret)
                    chrome.storage.local.set(ret, function(){})
                }
            })

            buttonElm.append(buttonElm_Reset)
        }

        
        
        /* place elements */
        elm.find(".contents-option-head").append(buttonElm)
        var p = buttonElm.clone(true)
        p.addClass("contents-item--buttons-vertical")
        elm.find(".contents-option-head").prepend(p)

    }

    /* Hide Settings */
    if(requirement){
        var hsDataFor = requirement.dataFor
        var hsData = requirement.data
        var hsMode = requirement.mode
        var hsRule = requirement.rule

        if(!Array.isArray(hsDataFor)){
            hsDataFor = [hsDataFor]
        }

        const len = hsDataFor.length
        if(!Array.isArray(hsData)){
            hsData = new Array(len).fill(hsData)
        }

        var hsDataType = new Array(len)
            .fill(undefined)
            .map((v, k) => {
                var t = typeof hsData[k]
                if(t==="boolean" || t==="number" || t==="string"){
                    return t
                }else if(hsData[k]===null){
                    return "null"
                }else{
                    return "undefined"
                }
            })
        
        elm.addClass("option-hide")
        elm.attr("data-for", hsDataFor.join(" "))
        if(hsData){
            elm.attr("data", hsData.join(" "))
        }
        if(hsMode){
            elm.attr("mode", hsMode)
        }
        if(hsDataType){
            elm.attr("data-type", hsDataType.join(" "))
        }
        if(hsRule){
            elm.attr("data-rule", hsRule)
        }
    }

    /* Advanced / Experimental settings */
    if(isAdvanced){
        elm.addClass("advanced-hide")
    }
    if(isExperimental){
        elm.addClass("experimental-hide")
    }
    if(isDebug){
        elm.addClass("debug-option-hide")
    }

    /* Style */
    if(style){
        elm.css(style)
    }

    /* Class */
    if(elmClass){
        elm.addClass(elmClass)
    }

    return elm
}
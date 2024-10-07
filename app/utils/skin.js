export const skinDefaultKeyName = {
    "00-text": "本文",
    "01-link": "リンク",
    "02-link-visited": "リンク（訪問済み）",
    "03-link-hover": "リンク（ホバー中）",
    "04-bg": "背景"
}

export const localNovelSkin = [
    {
        name: "標準設定〔小説家になろう〕",
        description: "サイトのデフォルト",
        customizable: false,
        version: 2,
        style: [],
        css: ""
    },
    {
        name: "ダーク（基本）",
        description: "Narou Tweaker オリジナル",
        customizable: false,
        version: 2,
        style: [
            {
                key: "00-text",
                value: "rgba(255, 255, 255, 0.92)",
                type: "color",
            },
            {
                key: "01-link",
                value: "rgb(83, 155, 245)",
                type: "color",
            },
            {
                key: "02-link-visited",
                value: "rgb(135, 122, 245)",
                type: "color",
            },
            {
                key: "03-link-hover",
                value: "rgb(152, 189, 235)",
                type: "color",
            },
            {
                key: "04-bg",
                value: "#1d2020",
                type: "color",
            },
            {
                key: "color-custom-link-disabled",
                value: "#666",
                type: "color",
            },
            {
                key: "color-custom-bg--sub",
                value: "#2f2f2f",
                type: "color",
            },
            {
                key: "color-custom-border--sub",
                value: "rgba(255, 255, 255, 0.1)",
                type: "color",
            },
            {
                key: "color-custom-text--danger",
                value: "#ff1f1f",
                type: "color"
            },  
            {
                key: "color-custom-attention-bg",
                value: "color-custom-bg",
                type: "color",
            },
            {
                key: "color-custom-attention-text",
                value: "color-custom-text",
                type: "variable",
            },
            {
                key: "color-custom-attention-border",
                value: "rgba(255, 255, 255, 0.1)",
                type: "color",
            },
            {
                key: "color-custom-pager-border-disabled",
                value: "color-custom-link-disabled",
                type: "variable",
            },
            {
                key: "color-custom-pager-text-disabled",
                value: "color-custom-link-disabled",
                type: "variable",
            },
            {
                key: "color-custom-epilist-underline-hover",
                value: "rgba(152, 189, 235, 0.7)",
                type: "color",
            },
            {
                key: "color-custom-header-item",
                value: "rgba(255, 255, 255, 0.3)",
                type: "color",
            },
            {
                key: "color-custom-header-item--visited",
                value: "rgba(114, 142, 176, 0.7)",
                type: "color",
            },
            {
                key: "color-custom-header-item--hover",
                value: "rgba(152, 189, 235, 0.7)",
                type: "color",
            },
            {
                key: "color-custom-header-item--disabled",
                value: "#333",
                type: "color",
            },
            {
                key: "color-custom-novelinfo-table-border",
                value: "color-custom-border--sub",
                type: "variable",
            },
            {
                key: "color-custom-novelinfo-datatable-border",
                value: "color-custom-border--sub",
                type: "variable",
            },
            {
                key: "color-custom-novelcom-box-bg",
                value: "color-custom-bg--sub",
                type: "variable",
            },
            {
                key: "color-custom-novelcom-box-border",
                value: "color-custom-border--sub",
                type: "variable",
            },
            {
                key: "color-custom-novelcom-box-bg--res",
                value: "color-custom-bg--sub",
                type: "variable",
            },
            {
                key: "color-custom-novelcom-box-border--res",
                value: "color-custom-border--sub",
                type: "variable",
            },
            {
                key: "color-custom-novelcom-box-bg--review",
                value: "color-custom-bg--sub",
                type: "variable",
            },
            {
                key: "color-custom-novelcom-box-border--review",
                value: "color-custom-border--sub",
                type: "variable",
            },
            {
                key: "color-custom-novelcom-form-bg",
                value: "transparent",
                type: "color",
            },
            {
                key: "color-custom-novelcom-form-border",
                value: "color-custom-border--sub",
                type: "variable",
            },
            {
                key: "color-custom-novelcom-episode-bg",
                value: "color-custom-bg--sub",
                type: "variable",
            },
            {
                key: "color-custom-novelcom-episode-text",
                value: "color-custom-text--sub",
                type: "variable",
            },
            {
                key: "color-custom-novelcom-warning-bg",
                value: "color-custom-bg--sub",
                type: "variable",
            },
            {
                key: "color-custom-novelreport-highlight",
                value: "color-custom-bg--sub",
                type: "variable",
            },
            {
                key: "color-custom-novelreport-box-bg",
                value: "color-custom-bg--sub",
                type: "variable",
            },
            {
                key: "color-custom-novelreport-box-border",
                value: "color-custom-border--sub",
                type: "variable",
            },


        ],
        css: ""
    },

]

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

/* スキンのデータを整形 */
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

/* スキン用CSSを生成 */
export function makeSkinCSS(skin, local){
    var rule = ""
    if(!skin){
        skin = {}
    }

    var root = ""
    
    if(Array.isArray(skin.style)){
        /* .js-customlayout1 */
        skin.style.forEach(function(s){
            if(s){
                if(typeof s.value ==="string" && typeof s.key ==="string"){
                    if(s.type=="variable"){
                        root += `--${s.key}:var(--${s.value})!important;`
                    }else{
                        root += `--${s.key}:${s.value}!important;`
                    }
                }
            }
        })
        rule += `:root,body,.js-customlayout1,.narou-tweaker--custom-skin.js-customlayout1{${root}}`
    }

    // スキンが適用されるまでの一時的な繋ぎ（画面のチラツキ防止）
    rule += `
        body:not(.narou-tweaker--custom-skin) {
            background: var(--color-custom-body-bg);
            color: var(--color-custom-text);
        }
        body:not(.narou-tweaker--custom-skin) {
            a:link {
                color: var(--color-custom-link);
            }
            a:visited {
                color: var(--color-custom-link-visited);
            }
            a:hover {
                color: var(--color-custom-link-hover);
            }
        }
    `
    rule += `
        .c-announce-box {
            background-color: var(--color-custom-body-bg);
            color: var(--color-custom-text);
        }
    `
    if(local.novelCustomStyle){
        rule += `
        .novel-titles .novel-title,
        .novel-titles .novel-author,
        .novel-chapter {
            color: var(--color-custom-text--sub) !important;
        }
        .novel-titles#ep-0 .novel-title,
        .novel-titles#ep-1 .novel-title {
            color: var(--color-custom-text) !important;
        }

        .novel-titles {
            line-height: normal;
            word-break: break-word;
            text-align: left;
        }
        .novel-titles .novel-title {
            line-height: normal;
            font-weight: bold;
            word-break: break-word;
            word-break: auto-phrase;
        }
        .novel-titles .novel-author {
            margin-top: .5em;
            font-size: 90%;
        }
        .novel-titles#ep-0,
        .novel-titles#ep-1 {
            text-align: center;
            margin-top: 4em;
            margin-bottom: 4em;
        }
        .novel-titles#ep-0 .novel-title,
        .novel-titles#ep-1 .novel-title {
            font-size: 3em;
        }
        .novel-titles#ep-0 .novel-author,
        .novel-titles#ep-1 .novel-author {
            text-align: center;
            font-size: 2em;
            margin-top: .5em;
        }
        .novel-chapter {
            text-align: center;
            font-size: 90%;
        }
        .novel-titles a,
        #novel_vertical_items .novel-titles a {
            color: inherit !important;
        }
        `
    }

    /* ヘッダ有効化時の残像を非表示 */
    if(local.novelCustomHeaderType == "1" || local.novelCustomHeaderType=="2"){
        rule += `
        .l-scrollheader,
        .l-scrollheader {
            display: none !important;
        }
        `
    }



    return rule
}
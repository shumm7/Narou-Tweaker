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
        show: true,
        version: 2,
        style: [
            {
                key: "00-text",
                value: "#444",
                type: "color",
            },
            {
                key: "01-link",
                value: "#03c",
                type: "color",
            },
            {
                key: "02-link-visited",
                value: "#857",
                type: "color",
            },
            {
                key: "03-link-hover",
                value: "#393",
                type: "color",
            },
            {
                key: "04-bg",
                value: "#fff",
                type: "color",
            },
            {   
                key: "color-custom-announce-border",
                value: "01-link",
                type: "variable"
            },
            {   
                key: "color-custom-body-bg",
                value: "04-bg",
                type: "variable"
            },
            {   
                key: "color-custom-epilist-underline",
                value: "transparent",
                type: "color"
            },
            {   
                key: "color-custom-epilist-underline-favorited",
                value: "00-text",
                type: "variable"
            },
            {   
                key: "color-custom-epilist-underline-hover",
                value: "#9df",
                type: "color"
            },
            {   
                key: "color-custom-link",
                value: "01-link",
                type: "variable"
            },
            {   
                key: "color-custom-link-hover",
                value: "03-link-hover",
                type: "variable"
            },
            {   
                key: "color-custom-link-visited",
                value: "02-link-visited",
                type: "variable"
            },
            {   
                key: "color-custom-pager-border-disabled",
                value: "#44444433",
                type: "color"
            },
            {   
                key: "color-custom-pager-text-disabled",
                value: "#44444480",
                type: "color"
            },
            {   
                key: "color-custom-text",
                value: "00-text",
                type: "variable"
            },
            {   
                key: "color-custom-bkmfix-box",
                value: "#e7f5ff",
                type: "color"
            },
            {   
                key: "color-custom-bkmfix-text",
                value: "#1971c2",
                type: "color"
            },
            {   
                key: "color-custom-favep-empty",
                value: "#ced4da",
                type: "color"
            },
        ],
        css: ""
    },
    {
        name: "ダーク（基本）",
        description: "Narou Tweaker オリジナル",
        customizable: false,
        show: true,
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
                key: "color-text",
                value: "00-text",
                type: "variable",
            },
            {
                key: "color-bg",
                value: "04-bg",
                type: "variable",
            },
            {
                key: "color-custom-epilist-underline-hover",
                value: "rgba(152, 189, 235, 0.7)",
                type: "color",
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
export function makeSkinCSS(skin){
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
                        root += `--${s.key}:var(--${s.value});`
                    }else{
                        root += `--${s.key}:${s.value};`
                    }
                }
            }
        })
        rule += `.js-customlayout1,:root{${root}}`
    }

    return rule
}
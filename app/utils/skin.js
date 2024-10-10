import { localNovelSkinV2 } from "./skins/skin_v2.js"
import { makeCSS } from "./skins/skinCSS.js"

export const skinDefaultKeyName = {
    "00-text": "本文",
    "01-link": "リンク",
    "02-link-visited": "リンク（訪問済み）",
    "03-link-hover": "リンク（ホバー中）",
    "04-bg": "背景"
}

export const localNovelSkin = localNovelSkinV2

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
    return makeCSS(skin, local)
}
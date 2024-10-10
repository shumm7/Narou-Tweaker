import { defaultValue } from "../misc.js"

export const maxLocalSkins = 30
export const maxSyncSkins = 10

export const localNovelSkinV2 = [
    {
        name: "標準設定〔小説家になろう〕",
        description: "サイトのデフォルト",
        version: 2,
        preview: {
            text: "#444",
            background: "#fff"
        },
        style: [],
        css: ""
    },
    {
        name: "ダーク（基本）",
        description: "Narou Tweaker オリジナル",
        version: 2,
        preview: {
            text: "rgba(255, 255, 255, 0.92)",
            background: "#1d2020"
        },
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
                key: "color-custom-header-item--disabled",
                value: "color-custom-border--sub",
                type: "variable"
            },
            {
                key: "color-custom-header-item--hover",
                value: "color-custom-epilist-underline-hover",
                type: "variable"
            },
        ],
        css: ""
    },
    {
        name: "sample",
        description: "サイトのデフォルト",
        version: 2,
        preview: {
            text: "#444",
            background: "#fff"
        },
        style: [],
        css: ""
    },
]

export function formatSkinDataV2(raw){
    if(typeof raw !== "object"){
        raw = {}
    }

    // name
    if("name" in raw === false){raw.name = "" }
    if(typeof raw.name !== "string" ){raw.name = "" }
    if(raw.name.trim().length==0){raw.name="新規スキン"}

    // style
    if(Array.isArray(raw.style)){
        var list = []
        raw.style.forEach(function(style){
            if(typeof style==="object"){
                if(typeof style.key==="string"){
                if(typeof style.value==="string"){
                if(typeof style.type==="string"){
                if(style.type==="color" || style.type==="variable"){
                    list.push({
                        key: style.key,
                        value: style.value,
                        type: style.type
                    })
                }
                }
                }
                }
            }
        })
        raw.style = list
    }else{
        raw.style = []
    }

    return {
        name: raw.name,
        description: defaultValue(raw.description, ""),
        version: 2,
        style: style,
        css: defaultValue(raw.css, ""),
    }
}
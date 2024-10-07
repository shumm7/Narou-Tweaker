import { formatSkinDataV1 } from "./skin_v1.js";
import { formatSkinDataV2 } from "./skin_v2.js";

export function checkSkinVersion(skin){
    try{
        if(skin.version===2){
            return 2
        }else{
            return 1
        }
    }catch{
        return 1
    }
}

export function convertSkin(skin){
    const skinVer = checkSkinVersion(skin)

    try{
        if(skinVer===1){
            return convertSkinV1(skin)
        }else if(skinVer===2){
            return convertSkinV2(skin)
        }
    }catch{
        return
    }
}

function convertSkinV1(skin){
    skin = formatSkinDataV1(skin)

    return {
        name: skin.name,
        description: skin.description,
        version: 2,
        style: [
            {
                key: "00-text",
                value: skin.style.novel.color,
                type: "color",
            },
            {
                key: "01-link",
                value: skin.style.link.color,
                type: "color",
            },
            {
                key: "02-link-visited",
                value: skin.style.link.visited,
                type: "color",
            },
            {
                key: "03-link-hover",
                value: skin.style.link.hover,
                type: "color",
            },
            {
                key: "04-bg",
                value: skin.style.novel.background,
                type: "color",
            },
            {
                key: skin.style.novel.background_second,
                value: "#2f2f2f",
                type: "color",
            },
            {
                key: "color-custom-border--sub",
                value: skin.style.sublist.color,
                type: "color",
            },
            {
                key: "color-custom-attention-bg",
                value: "color-custom-bg",
                type: "variable",
            },
            {
                key: "color-custom-attention-text",
                value: "color-custom-text",
                type: "variable",
            },
            {
                key: "color-custom-attention-border",
                value: skin.style.sublist.color,
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
                value: skin.style.sublist.hover,
                type: "color",
            },
            {
                key: "color-custom-header-item",
                value: skin.style.sublist.color,
                type: "color",
            },
            {
                key: "color-custom-header-item--visited",
                value: skin.style.sublist.visited,
                type: "color",
            },
            {
                key: "color-custom-header-item--hover",
                value: skin.style.sublist.hover,
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
        css: skin.css
    }
}

function convertSkinV2(skin){
    return formatSkinDataV2(skin)
}
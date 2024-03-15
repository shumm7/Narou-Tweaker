import { applySkin } from "../cogs/novel/cogs.js";
import { defaultValue } from "./misc.js";

/* Options*/
export function saveOptions(options){
    chrome.storage.local.set({"options": options});
}

export function saveOptionValue(key, value){
    chrome.storage.local.get(["options"], function(data) {
        data.options[key] = value;
        saveOptions(data.options)
    })
}

/* Skins */
export function saveSkins(skins){
    chrome.storage.local.set({"skins": skins});
}

export function saveSkin(skin){
    chrome.storage.local.set({"applied_skin": skin});
}

export function saveFont(font){
    chrome.storage.local.set({"applied_font": font});
}
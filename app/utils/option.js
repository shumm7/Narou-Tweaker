import { applySkin } from "../cogs/novel/cogs.js";
import { defaultValue } from "./misc.js";

/* Options*/
export function saveOptions(options){
    chrome.storage.sync.set({"options": options});
}

export function saveOptionValue(key, value){
    chrome.storage.sync.get(["options"], function(data) {
        data.options[key] = value;
        saveOptions(data.options)
    })
}

/* Skins */
export function saveSkins(skins){
    chrome.storage.sync.set({"skins": skins});
}

export function saveSkin(skin){
    chrome.storage.sync.set({"applied_skin": skin});
}

export function saveFont(font){
    chrome.storage.sync.set({"applied_font": font});
}
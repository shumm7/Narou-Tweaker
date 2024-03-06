import { applySkin } from "../cogs/novel/cogs.js";
import { defaultValue } from "./misc.js";

/* Options*/
export function saveOptions(options){
    chrome.storage.sync.set({"options": options});
}

export function saveOptionValue(key, value){
    var options = loadOptions()
    options[key] = value;
    saveOptions(options)
}

/* Skins */
export function saveSkins(skins){
    chrome.storage.sync.set({"skins": skins});
}

export function saveSkin(skin){
    chrome.storage.sync.set({"skin": skin});
}
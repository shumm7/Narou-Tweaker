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

export function loadSkin(index){
    chrome.storage.sync.get(null, (options) => {
        var skins = loadSkins()
        if(index==undefined){
            var def = defaultValue(options.skin, 1)
            return skins[def]
        }
        return skins[index]
    });
}

export function appendSkin(skin){
    var skin = loadSkins()
    skin.push(skin)
    saveSkins(skin)
}

export function updateSkin(index, skin){
    var skins = loadSkins()
    if(skins[index]==undefined){
        return false
    }else{
        if(skins[index].customizable){
            skins[index] = skin
            saveSkins(skins)
            return true;
        }else{
            return false;
        }
    }
}

export function removeSkin(index){
    var skins = loadSkins()
    if(skins[index]==undefined){
        return false
    }else{
        if(skins[index].customizable){
            skins.splice(index, 1)
            saveSkins(skins)
            return true;
        }else{
            return false;
        }
    }
}

export function copySkin(index){
    var skins = loadSkins()
    if(skins[index]==undefined){
        return false
    }else{
        skins[index].customizable = true
        appendSkin(skins[index])
        return true;
    }
}
import { getOptionFromId } from "../_lib/optionLib.js";
import { getOptionElement } from "../_lib/optionUI.js";
import { optionHide } from "../_lib/utils.js";
import { restoreOptions, setup } from "../general.js";

setup()
setupContents()

/*
ToDo: customタイプのオプションの処理
*/

function markFavoriteOptions(list){
    $(".contents-item--button-favorite.selected").removeClass("selected")
    if(Array.isArray(list)){
        $.each(list, function(_, id){
            $(`.option-outer[name=${id}] > .contents-option-head > .contents-item--buttons .contents-item--button-favorite, .option-outer[name=${id}] > .contents-option > .contents-option-head > .contents-item--buttons .contents-item--button-favorite`).addClass("selected")
        })
    }
}

function setupContents(){
    chrome.storage.local.get("extFavoriteOptions", function(data){
        var list = data.extFavoriteOptions
        if(!Array.isArray(list)){
            list = []
        }
        $.each(list, function(_, id){
            var option = getOptionFromId(id)
            if(option){
                if(option.location){
                    if(!option.location.hide){
                        const hasParent = option.location.hasParent
                        const parent = option.location.parent

                        var elm = getOptionElement(option, "favorite")

                        /* Placement */
                        if(hasParent){
                            $(`.contents-container[name="general"] .contents-wide[name="${parent}"] .contents-wide-column`).append(elm)
                        }else{
                            $(`.contents-container[name="general"]`).append(elm)
                        }
                    }
                }
            }
        })

        optionHide()
        restoreOptions()
        markFavoriteOptions(data.extFavoriteOptions)
        
        chrome.storage.local.onChanged.addListener(function(changes){
            if(changes.extFavoriteOptions){
                markFavoriteOptions(changes.extFavoriteOptions.newValue)
            }
        })
    })
}



chrome.storage.local.onChanged.addListener(function(changes){
    if(changes.extFavoriteOptions){
        $(`.contents-container[name="general"]`).empty()
        setupContents()
    }
})
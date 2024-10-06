import { localNovelSkin } from "../../utils/skin.js"


export function restoreSkins(){

    /* dropdownに値を設定 */
    chrome.storage.local.get(null, function(data){
        chrome.storage.sync.get(null, function(g_data){
            var skins = g_data.novelSkins
            if(Array.isArray(skins)){
                skins = []
            }
            skins = localNovelSkin.concat(skins)

            $.each(skins, function(i, skin){
                $("#novelSkinSelected").append(`<option value="${i}">${skin.name}</option>`)
            })

            var selected = data.novelSkinSelected
            if(selected < 0){
                selected = 0
                chrome.storage.local.set({novelSkinSelected: selected}, function(){})
            }else if(selected >= skins.length){
                selected = skins.length - 1
                chrome.storage.local.set({novelSkinSelected: selected}, function(){})
            }

            $("#novelSkinSelected").val(selected)
        })
    })

    /* 外部でスキンが変更されたときにdropdownを変更 */
    chrome.storage.local.onChanged.addListener(function(changes){
        if(changes.novelSkinSelected){
            restoreSkins()
        }
    })
    chrome.storage.sync.onChanged.addListener(function(changes){
        if(changes.novelSkins){
            restoreSkins()
        }
    })

    /* dropdown変更時 */
    $("#novelSkinSelected").on("change", function(e){
        var selected = Number($(this).val())

        chrome.storage.local.get(null, function(data){
            chrome.storage.sync.get(null, function(g_data){
                var skins = g_data.novelSkins
                if(Array.isArray(skins)){
                    skins = []
                }
                skins = localNovelSkin.concat(skins)

                if(isNaN(selected)){
                    selected = 0
                }
                if(selected < 0){
                    selected = 0
                }else if(selected >= skins.length){
                    selected = skins.length - 1
                }

                chrome.storage.local.set({novelSkinSelected: selected}, function(){})
            })
        })
    })
}
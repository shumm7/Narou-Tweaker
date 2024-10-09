import { getAvailableSkinList, getSelectedSkinIndex, getSkin, getUnavailableSkinList } from "../../../utils/skins/skinUtils.js";
import { escapeHtml } from "../../../utils/text.js";

export function skinSelector(){

    /* draggable itemにイベントを設定 */
    setSortable()
}

function setSortable(){
    chrome.storage.sync.get(null, function(storage_sync){
    chrome.storage.local.get(null, function(storage_local){
        /* D&Dオブジェクトを配置 */
        restoreItems(storage_local, storage_sync)
        chrome.storage.local.onChanged.addListener(function(changes){
            if(changes.novelSkinSelected || changes.novelSkinsAvailable){
                chrome.storage.sync.get(null, function(storage_sync){
                chrome.storage.local.get(null, function(storage_local){
                    restoreItems(storage_local, storage_sync)
                })
                })
            }
        })

        /* D&Dを可能にする */
        if($("#skin-selector--available .skin-selector--draggable").length){
            Sortable.create($("#skin-selector--available .skin-selector--draggable")[0], {
                handle: '.skin-selector--draggable-item',
                sort: 1,
                group: {
                    name: 'skin-selector--draggable-item',
                    pull: true,
                    put: true
                },
                animation: 150,
                onSort: function (e) {
                    storeItems()
                },
            });
        }
    })
    })
}

function restoreItems(storage_local, storage_sync){
    /* 使用可能でないスキン一覧 */
    $("#skin-selector--unavailable .skin-selector--draggable").empty()
    var unavailableSkinList = getUnavailableSkinList(storage_local, storage_sync)
    $.each(unavailableSkinList, function(i, skinInfo){
        var elm = getSkinElement(skinInfo, getSkin(skinInfo.src, skinInfo.key, storage_local, storage_sync))

        $("#skin-selector--unavailable .skin-selector--draggable").append(elm)
    })


    /* 使用可能なスキン一覧 */
    $("#skin-selector--available .skin-selector--draggable").empty()

    var availableSkinList = getAvailableSkinList(storage_local)
    const selectedSkinIndex = getSelectedSkinIndex(storage_local)

    $.each(availableSkinList, function(i, skinInfo){
        var elm = getSkinElement(skinInfo, getSkin(skinInfo.src, skinInfo.key, storage_local, storage_sync))
        
        if(i===selectedSkinIndex){
            elm.addClass(["selected"])
        }

        $("#skin-selector--available .skin-selector--draggable").append(elm)
    })

    /* クリック時（スキンをフォーカス） */
    $("#skin-selector .skin-selector--draggable-item").on("click", function(e){
        //$("#skin-selector .skin-selector--draggable-item.focused").removeClass("focused")
        //$(this).addClass("focused")
    })
}

function getSkinElement(skinInfo, skinData){
    var srcText = ""
    if(skinInfo.src==="internal"){
        srcText = `<div class="skin-selector--draggable-item--storage" title="標準"><i class="fa-solid fa-pen-fancy"></i></div>`
    }else if(skinInfo.src==="local"){
        srcText = `<div class="skin-selector--draggable-item--storage" title="ローカル"><i class="fa-solid fa-box"></i></div>`
    }else if(skinInfo.src==="sync"){
        srcText = `<div class="skin-selector--draggable-item--storage" title="クラウド"><i class="fa-solid fa-cloud"></i></div>`
    }

    var elm = $(`
        <div class="skin-selector--draggable-item" skin-key="${escapeHtml(skinInfo.key)}" skin-src="${escapeHtml(skinInfo.src)}">
            ${srcText}
            <div class="skin-selector--draggable-item--title">${escapeHtml(skinData.name)}</div>
            <div class="skin-selector--draggable-item--sample">あAa</div>
        </div>
    `)
    
    if(skinData.preview){
        if(skinData.preview.text && skinData.preview.background){
            elm.find(".skin-selector--draggable-item--sample").css("color", skinData.preview.text)
            elm.find(".skin-selector--draggable-item--sample").css("background", skinData.preview.background)
        }
    }else{
        elm.find(".skin-selector--draggable-item--sample").remove()
    }

    return elm
}

function storeItems(){
    chrome.storage.local.get(null, function(storage_local){
    chrome.storage.sync.get(null, function(storage_sync){

        var list = []
        var selected
        $("#skin-selector--available .skin-selector--draggable-item").each(function(e){
            var key = Number($(this).attr("skin-key"))
            var src = $(this).attr("skin-src")
            if(src !=="internal" && src!=="local" && src!=="sync"){
                return true
            }
            if(isNaN(key)){
                return true
            }

            if(getSkin(src, key, storage_local, storage_sync)){
                list.push({src: src, key: key})

                if($(this).hasClass("selected") && selected===undefined){
                    selected = list.length - 1
                }
            }
        })

        if(selected===undefined){
            selected = 0
        }

        chrome.storage.local.set({novelSkinsAvailable: list, novelSkinSelected: selected})
    })
    })
}
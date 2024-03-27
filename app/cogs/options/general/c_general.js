import { getExtensionVersion } from "../../../utils/misc.js";
import { defaultOption } from "../../../utils/option.js";
import { restoreOptions, setupDOM } from "../general.js";
import { buttonHide, optionHide } from "../utils.js";

setupDOM()
buttonHide()
optionHide()

document.addEventListener('DOMContentLoaded', function(){
    restoreOptions()

    const version = getExtensionVersion()
    $(".extension-version").append(`<a href="https://github.com/shumm7/Narou-Tweaker/releases/tag/${version}">${version}</version>`)

    exportOptionText()
    removeOptionData()
})


/* 設定データを閲覧 */
function exportOptionText() {
    function change(){
        chrome.storage.local.get(null, (data)=>{
            var text = JSON.stringify(data, null, 4)
            $("#exportOptionText_Output").text(text)
        })
    }
    change()
    chrome.storage.local.onChanged.addListener(function(changes){
        change()
    })
}

function removeOptionData(){
    $("#removeOptionData").on("click", function(){
        if(window.confirm('スキンを含む、保存されているデータが全てリセットされます。')){
            chrome.storage.local.clear(()=>{
                chrome.storage.local.set(defaultOption)
                console.log("Reset all options.")
            })
        }
    })
}
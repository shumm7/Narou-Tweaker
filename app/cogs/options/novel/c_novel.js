import { restoreOptions, setupDOM } from "../general.js";
import { addFontAwesomeOriginaIcons, getExceptedIcon, novelIconList } from "../../../utils/header.js"
import { buttonHide, colorPicker, optionHide, syntaxHighlight } from "../utils.js";
import { addFontEditButtonEvent, restoreFont } from "./font.js";
import { addReplacePatternEditButtonEvent, restoreReplacePattern } from "./correction.js";
import { addSkinEditButtonEvent, restoreSkins } from "./skins.js";

setupDOM()
buttonHide()
optionHide()
addFontAwesomeOriginaIcons()
addFontEditButtonEvent()
addSkinEditButtonEvent()
addReplacePatternEditButtonEvent()

document.addEventListener('DOMContentLoaded', function(){
    restoreOptions()
    restoreHeaderIconList()
    setSortable()

    restoreFont()
    chrome.storage.local.get(null, function(data) {
        restoreSkins(data.skins, data.selectedSkin)
        colorPicker()
    })
    restoreReplacePattern()
    syntaxHighlight()
});

function setSortable(){
    Sortable.create($(".draggable_area#left")[0], {
        handle: '.icon-element',
        sort: 1,
        group: {
            name: 'header-icon',
            pull: true,
            put: true
        },
        animation: 150,
        onAdd: function (e) {
            storeCustomHeader();
        },
        onChange: function (e) {
          storeCustomHeader();
        },
    });
    Sortable.create($(".draggable_area#right")[0], {
        handle: '.icon-element',
        sort: 1,
        group: {
            name: 'header-icon',
            pull: true,
            put: true
        },
        animation: 150,
        onAdd: function (e) {
          storeCustomHeader();
        },
        onChange: function (e) {
          storeCustomHeader();
        },
    });
    Sortable.create($(".draggable_area#disabled")[0], {
        handle: '.icon-element',
        animation: 150,
        sort: 1,
        group: {
            name: 'header-icon',
            pull: true,
            put: true,
        },
        animation: 150,
        onAdd: function (e) {
          storeCustomHeader();
        },
        onChange: function (e) {
          storeCustomHeader();
        },
        
    });
}

function storeCustomHeader(){
    chrome.storage.local.set(
        {
            novelCustomHeaderLeft: getHeaderIconList("left"),
            novelCustomHeaderRight: getHeaderIconList("right")
        }
    )

    function getHeaderIconList(position){
        if(position!="right" && position!="left" && position!="disabled") { return }
    
        var list = []
        $(".draggable_area#"+position+" .icon-element").each((_, icon)=>{
            list.push($(icon).attr("id"))
        })
        return list;
    }
}

function restoreHeaderIconList(){
    function getIconElement(id){
        let icon = novelIconList[id]
        return `
        <div id="`+id+`" class="icon-element" draggable="true">
            <i class="`+icon.icon+`"></i>
            <span class="title">`+icon.text+`</span>
        </div>`
    }

    chrome.storage.local.get(["novelCustomHeaderLeft", "novelCustomHeaderRight"], function(data){
        restore(data.novelCustomHeaderLeft, "left")
        restore(data.novelCustomHeaderRight, "right")
        restore(getExceptedIcon([data.novelCustomHeaderLeft, data.novelCustomHeaderRight]), "disabled")

        function restore(data, position){
            $(".draggable_area#"+position).empty()
            $.each(data, (_, icon)=>{
                $(".draggable_area#"+position).append(getIconElement(icon))
            })
        }
    })
}
import { getExceptedIcon, workspaceIconList } from "../../../utils/header.js";
import { restoreOptions, setupDOM } from "../general.js";
import { buttonHide, optionHide } from "../utils.js";

setupDOM()
buttonHide()
optionHide()

document.addEventListener('DOMContentLoaded', function(){
    restoreOptions()
    restoreHeaderIconList()
    setSortable()
})

function setSortable(){
    Sortable.create($(".draggable_area#active")[0], {
        handle: '.icon-element',
        sort: 1,
        group: {
            name: 'header-icon',
            pull: true,
            put: function(to, from){
                return to.el.children.length < 6;
            }
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
            workspaceCustomHeader: getHeaderIconList("active"),
        }
    )

    function getHeaderIconList(position){
        if(position!="active" && position!="disabled") { return }
    
        var list = []
        $(".draggable_area#"+position+" .icon-element").each((_, icon)=>{
            list.push($(icon).attr("id"))
        })
        return list;
    }
}

function restoreHeaderIconList(){
    function getIconElement(id){
        console.log(id)
        let icon = workspaceIconList[id]
        var c = ""
        if("isDropdown" in icon){
            if(icon.isDropdown){
                c = `<i class="fa-solid fa-caret-down" style="margin-left: .2em;"></i>`
            }
        }

        return `
        <div id="${id}" class="icon-element" draggable="true">
            <i class="${icon.icon}"></i>
            <span class="title">${icon.text}</span>
            ${c}
        </div>`
    }

    chrome.storage.local.get(["workspaceCustomHeader"], function(data){
        restore(data.workspaceCustomHeader, "active")
        restore(getExceptedIcon([data.workspaceCustomHeader], workspaceIconList), "disabled")

        function restore(data, position){
            $(".draggable_area#"+position).empty()
            $.each(data, (_, icon)=>{
                $(".draggable_area#"+position).append(getIconElement(icon))
            })
        }
    })
}
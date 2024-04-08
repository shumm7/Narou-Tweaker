import { getExceptedIcon, workspaceIconList, workspaceMenuIconList } from "../../../utils/header.js";
import { restoreOptions, setupDOM } from "../general.js";
import { buttonHide, optionHide } from "../utils.js";

setupDOM()
buttonHide()
optionHide()

document.addEventListener('DOMContentLoaded', function(){
    restoreOptions()
    restoreHeaderIconList()
    restoreHeaderMenuIconList()
    setSortableHeader()
    setSortableHeaderMenu()
})

function setSortableHeader(){
    Sortable.create($(".draggable_area_header .draggable_area#active")[0], {
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
    Sortable.create($(".draggable_area_header .draggable_area#disabled")[0], {
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

function setSortableHeaderMenu(){
    Sortable.create($(".draggable_area_menu .draggable_area#left")[0], {
        handle: '.icon-element',
        sort: 1,
        group: {
            name: 'menu-icon',
            pull: true,
            put: true
        },
        animation: 150,
        onAdd: function (e) {
            storeCustomHeaderMenu();
        },
        onChange: function (e) {
          storeCustomHeaderMenu();
        },
    });
    Sortable.create($(".draggable_area_menu .draggable_area#middle")[0], {
        handle: '.icon-element',
        sort: 1,
        group: {
            name: 'menu-icon',
            pull: true,
            put: true
        },
        animation: 150,
        onAdd: function (e) {
            storeCustomHeaderMenu();
        },
        onChange: function (e) {
          storeCustomHeaderMenu();
        },
    });
    Sortable.create($(".draggable_area_menu .draggable_area#right")[0], {
        handle: '.icon-element',
        sort: 1,
        group: {
            name: 'menu-icon',
            pull: true,
            put: true
        },
        animation: 150,
        onAdd: function (e) {
            storeCustomHeaderMenu();
        },
        onChange: function (e) {
          storeCustomHeaderMenu();
        },
    });
    Sortable.create($(".draggable_area_menu .draggable_area#disabled")[0], {
        handle: '.icon-element',
        sort: 1,
        group: {
            name: 'menu-icon',
            pull: true,
            put: true
        },
        animation: 150,
        onAdd: function (e) {
            storeCustomHeaderMenu();
        },
        onChange: function (e) {
          storeCustomHeaderMenu();
        },
    });
}

function storeCustomHeader(){
    chrome.storage.local.set({
        workspaceCustomHeader: getHeaderIconList("active"),
    })

    function getHeaderIconList(position){
        if(position!="active" && position!="disabled") { return }
    
        var list = []
        $(".draggable_area_header .draggable_area#"+position+" .icon-element").each((_, icon)=>{
            list.push($(icon).attr("id"))
        })
        return list;
    }
}

function storeCustomHeaderMenu(){
    chrome.storage.local.set({
        workspaceCustomMenu_Left: getMenuIconList("left"),
        workspaceCustomMenu_Middle: getMenuIconList("middle"),
        workspaceCustomMenu_Right: getMenuIconList("right"),
    })

    function getMenuIconList(position){
        if(position!="left" && position!="middle" && position!="right" && position!="disabled") { return }
    
        var list = []
        $(".draggable_area_menu .draggable_area#"+position+" .icon-element").each((_, icon)=>{
            list.push($(icon).attr("id"))
        })
        return list;
    }
}

function restoreHeaderIconList(){
    function getIconElement(id){
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
            $(".draggable_area_header .draggable_area#"+position).empty()
            $.each(data, (_, icon)=>{
                $(".draggable_area_header .draggable_area#"+position).append(getIconElement(icon))
            })
        }
    })
}

function restoreHeaderMenuIconList(){
    function getIconElement(id){
        let icon = workspaceMenuIconList[id]

        return `
        <div id="${id}" class="icon-element" draggable="true">
            <i class="${icon.icon}"></i>
            <span class="title">${icon.text}</span>
        </div>`
    }

    chrome.storage.local.get(["workspaceCustomMenu_Left", "workspaceCustomMenu_Middle", "workspaceCustomMenu_Right"], function(data){
        restore(data.workspaceCustomMenu_Left, "left")
        restore(data.workspaceCustomMenu_Middle, "middle")
        restore(data.workspaceCustomMenu_Right, "right")
        restore(getExceptedIcon([data.workspaceCustomMenu_Left, data.workspaceCustomMenu_Middle, data.workspaceCustomMenu_Right], workspaceMenuIconList), "disabled")
        function restore(data, position){
            $(".draggable_area_menu .draggable_area#"+position).empty()
            $.each(data, (_, icon)=>{
                $(".draggable_area_menu .draggable_area#"+position).append(getIconElement(icon))
            })
        }
    })
}
import { getExceptedIcon, workspaceIconList, workspaceMenuIconList } from "../../utils/header.js"

export function workspace_customHeaderSortable(){
    /* Workspace Header */
    function storeWorkspaceHeader(){
        chrome.storage.local.set({
            workspaceCustomHeader: getHeaderIconList("active"),
        })
    
        function getHeaderIconList(position){
            if(position!="active" && position!="disabled") { return }
        
            var list = []
            $(".draggable_area[name='workspace-header']#"+position+" .icon-element").each((_, icon)=>{
                list.push($(icon).attr("id"))
            })
            return list;
        }
    }

    if($(".draggable_area[name='workspace-header']").length){
        Sortable.create($(".draggable_area[name='workspace-header']#active")[0], {
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
            onSort: function (e) {
                storeWorkspaceHeader();
            },
        });
        Sortable.create($(".draggable_area[name='workspace-header']#disabled")[0], {
            handle: '.icon-element',
            animation: 150,
            sort: 1,
            group: {
                name: 'header-icon',
                pull: true,
                put: true,
            },
            animation: 150,
            onSort: function (e) {
                storeWorkspaceHeader();
            },
            
        });
    }



    /* Workspace Header */
    function getWorkspaceHeaderIconElement(id){
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

    function restoreSortable(){
        function restore(data, position){
            $(".draggable_area[name='workspace-header']#"+position).empty()
            $.each(data, (_, icon)=>{
                $(".draggable_area[name='workspace-header']#"+position).append(getWorkspaceHeaderIconElement(icon))
            })
        }
        chrome.storage.local.get(["workspaceCustomHeader"], function(data){
            restore(data.workspaceCustomHeader, "active")
            restore(getExceptedIcon([data.workspaceCustomHeader], workspaceIconList), "disabled")
        })
    }

    restoreSortable()
    chrome.storage.local.onChanged.addListener(function(changes){
        if(changes.workspaceCustomHeader){
            restoreSortable()
        }
    })
}

export function workspace_customHeaderMenuSortable(){
    /* Workspace Header Menu */
    function storeWorkspaceHeaderMenu(){
        chrome.storage.local.set({
            workspaceCustomMenu_Left: getMenuIconList("left"),
            workspaceCustomMenu_Middle: getMenuIconList("middle"),
            workspaceCustomMenu_Right: getMenuIconList("right"),
        })
    
        function getMenuIconList(position){
            if(position!="left" && position!="middle" && position!="right" && position!="disabled") { return }
        
            var list = []
            $(".draggable_area[name='workspace-header-menu']#"+position+" .icon-element").each((_, icon)=>{
                list.push($(icon).attr("id"))
            })
            return list;
        }
    }
    
    if($(".draggable_area[name='workspace-header-menu']").length){
        Sortable.create($(".draggable_area[name='workspace-header-menu']#left")[0], {
            handle: '.icon-element',
            sort: 1,
            group: {
                name: 'menu-icon',
                pull: true,
                put: true
            },
            animation: 150,
            onSort: function (e) {
                storeWorkspaceHeaderMenu();
            },
        });
        Sortable.create($(".draggable_area[name='workspace-header-menu']#middle")[0], {
            handle: '.icon-element',
            sort: 1,
            group: {
                name: 'menu-icon',
                pull: true,
                put: true
            },
            animation: 150,
            onSort: function (e) {
                storeWorkspaceHeaderMenu();
            },
        });
        Sortable.create($(".draggable_area[name='workspace-header-menu']#right")[0], {
            handle: '.icon-element',
            sort: 1,
            group: {
                name: 'menu-icon',
                pull: true,
                put: true
            },
            animation: 150,
            onSort: function (e) {
                storeWorkspaceHeaderMenu();
            },
        });
        Sortable.create($(".draggable_area[name='workspace-header-menu']#disabled")[0], {
            handle: '.icon-element',
            sort: 1,
            group: {
                name: 'menu-icon',
                pull: true,
                put: true
            },
            animation: 150,
            onSort: function (e) {
                storeWorkspaceHeaderMenu();
            },
        });
    }

    /* Workspace Header Menu */
    function getWorkspaceHeaderMenuIconElement(id){
        let icon = workspaceMenuIconList[id]

        return `
        <div id="${id}" class="icon-element" draggable="true">
            <i class="${icon.icon}"></i>
            <span class="title">${icon.text}</span>
        </div>`
    }

    function restoreSortable(){
        function restore(data, position){
            $(".draggable_area[name='workspace-header-menu']#"+position).empty()
            $.each(data, (_, icon)=>{
                $(".draggable_area[name='workspace-header-menu']#"+position).append(getWorkspaceHeaderMenuIconElement(icon))
            })
        }
        chrome.storage.local.get(["workspaceCustomMenu_Left", "workspaceCustomMenu_Middle", "workspaceCustomMenu_Right"], function(data){
            restore(data.workspaceCustomMenu_Left, "left")
            restore(data.workspaceCustomMenu_Middle, "middle")
            restore(data.workspaceCustomMenu_Right, "right")
            restore(getExceptedIcon([data.workspaceCustomMenu_Left, data.workspaceCustomMenu_Middle, data.workspaceCustomMenu_Right], workspaceMenuIconList), "disabled")
        })
    }

    restoreSortable()
    chrome.storage.local.onChanged.addListener(function(changes){
        if(changes.workspaceCustomMenu_Left || changes.workspaceCustomMenu_Middle || changes.workspaceCustomMenu_Right){
            restoreSortable()
        }
    })
}
import { getExceptedIcon, novelIconList, workspaceIconList, workspaceMenuIconList } from "/utils/header.js"

export function setSortable(){
    /* Novel Header */
    if($(".draggable_area[name='novel-header']").length){
        Sortable.create($(".draggable_area[name='novel-header']#left")[0], {
            handle: '.icon-element',
            sort: 1,
            group: {
                name: 'header-icon',
                pull: true,
                put: true
            },
            animation: 150,
            onAdd: function (e) {
                storeNovelHeader();
            },
            onChange: function (e) {
            storeNovelHeader();
            },
        });
        Sortable.create($(".draggable_area[name='novel-header']#right")[0], {
            handle: '.icon-element',
            sort: 1,
            group: {
                name: 'header-icon',
                pull: true,
                put: true
            },
            animation: 150,
            onAdd: function (e) {
            storeNovelHeader();
            },
            onChange: function (e) {
            storeNovelHeader();
            },
        });
        Sortable.create($(".draggable_area[name='novel-header']#disabled")[0], {
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
            storeNovelHeader();
            },
            onChange: function (e) {
            storeNovelHeader();
            },
        });
    }

    /* Workspace Header */
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
            onAdd: function (e) {
                storeWorkspaceHeader();
            },
            onChange: function (e) {
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
            onAdd: function (e) {
            storeWorkspaceHeader();
            },
            onChange: function (e) {
            storeWorkspaceHeader();
            },
            
        });
    }

    /* Workspace Header Menu */
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
            onAdd: function (e) {
                storeWorkspaceHeaderMenu();
            },
            onChange: function (e) {
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
            onAdd: function (e) {
                storeWorkspaceHeaderMenu();
            },
            onChange: function (e) {
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
            onAdd: function (e) {
                storeWorkspaceHeaderMenu();
            },
            onChange: function (e) {
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
            onAdd: function (e) {
                storeWorkspaceHeaderMenu();
            },
            onChange: function (e) {
            storeWorkspaceHeaderMenu();
            },
        });
    }
}

export function restoreHeaderIconList(){
    /* Novel Header */
    function getNovelHeaderIconElement(id){
        let icon = novelIconList[id]
        var text = icon.text

        return `
        <div id="`+id+`" class="icon-element" draggable="true">
            <i class="`+icon.icon+`"></i>
            <span class="title">`+text+`</span>
        </div>`
    }
    chrome.storage.local.get(["novelCustomHeaderLeft", "novelCustomHeaderRight"], function(data){
        restore(data.novelCustomHeaderLeft, "left")
        restore(data.novelCustomHeaderRight, "right")
        restore(getExceptedIcon([data.novelCustomHeaderLeft, data.novelCustomHeaderRight]), "disabled")

        function restore(data, position){
            $(".draggable_area[name='novel-header']#"+position).empty()
            $.each(data, (_, icon)=>{
                if(icon in novelIconList)
                $(".draggable_area[name='novel-header']#"+position).append(getNovelHeaderIconElement(icon))
            })
        }
    })


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
    chrome.storage.local.get(["workspaceCustomHeader"], function(data){
        restore(data.workspaceCustomHeader, "active")
        restore(getExceptedIcon([data.workspaceCustomHeader], workspaceIconList), "disabled")

        function restore(data, position){
            $(".draggable_area[name='workspace-header']#"+position).empty()
            $.each(data, (_, icon)=>{
                $(".draggable_area[name='workspace-header']#"+position).append(getWorkspaceHeaderIconElement(icon))
            })
        }
    })


    /* Workspace Header Menu */
    function getWorkspaceHeaderMenuIconElement(id){
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
            $(".draggable_area[name='workspace-header-menu']#"+position).empty()
            $.each(data, (_, icon)=>{
                $(".draggable_area[name='workspace-header-menu']#"+position).append(getWorkspaceHeaderMenuIconElement(icon))
            })
        }
    })

}

function storeNovelHeader(){
    chrome.storage.local.set(
        {
            novelCustomHeaderLeft: getHeaderIconList("left"),
            novelCustomHeaderRight: getHeaderIconList("right")
        }
    )

    function getHeaderIconList(position){
        if(position!="right" && position!="left" && position!="disabled") { return }
    
        var list = []
        $(".draggable_area[name='novel-header']#"+position+" .icon-element").each((_, icon)=>{
            list.push($(icon).attr("id"))
        })
        return list;
    }
}

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

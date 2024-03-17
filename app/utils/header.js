export const icon_list = {
    home: {
        icon: "fa-solid fa-house",
        text: "ホーム"
    },
    author: {
        icon: "fa-solid fa-user",
        text: "作者"
    },
    kasasagi: {
        icon: "fa-solid fa-chart-line",
        text: "アクセス解析"
    },
    "narou-api": {
        icon: "fa-solid fa-file-code",
        text: "なろうAPI"
    },
    rss: {
        icon: "fa-solid fa-rss",
        text: "RSS"
    },
    info: {
        icon: "fa-solid fa-info",
        text: "作品情報"
    },
    impression: {
        icon: "fa-solid fa-comments",
        text: "感想"
    },
    review: {
        icon: "fa-solid fa-flag",
        text: "レビュー"
    },
    pdf: {
        icon: "fa-solid fa-file-pdf",
        text: "縦書きPDF"
    },
    booklist: {
        icon: "fa-solid fa-book-bookmark",
        text: "ブックマーク"
    },
    edit: {
        icon: "fa-solid fa-pen-to-square",
        text: "編集"
    },
    siori: {
        icon: "fa-solid fa-bookmark",
        text: "しおり"
    },
    text: {
        icon: "fa-solid fa-file-lines",
        text: "TXT"
    },
    search: {
        icon: "fa-solid fa-magnifying-glass",
        text: "検索"
    },
    option: {
        icon: "fa-solid fa-gear",
        text: "設定"
    }
}
// https://fontawesome.com/search?o=r&m=free

export function getExceptedIcon(lists){
    var v = []
    $.each(lists, function(_, list){
        $.each(list, function(_, key){
            v.push(key)
        })
    })

    var ret = []
    $.each(icon_list, function(key, _){
        if(!v.includes(key)){
            ret.push(key)
        }
    })
    return ret;
}

export function getHeaderIconList(position){
    if(position!="right" && position!="left" && position!="disabled") { return }

    var list = []
    $(".draggable_area#"+position+" .icon-element").each((_, icon)=>{
        list.push($(icon).attr("id"))
    })
    return list;
}

export function restoreHeaderIconList(data, position){
    if(position!="right" && position!="left" && position!="disabled") { return }

    $(".draggable_area#"+position).empty()
    $.each(data, (_, icon)=>{
        $(".draggable_area#"+position).append(getIconElement(icon))
    })
}

function getIconElement(id){
    let icon = icon_list[id]
    return `
    <div id="`+id+`" class="icon-element" draggable="true">
        <i class="`+icon.icon+`"></i>
        <span class="title">`+icon.text+`</span>
    </div>`
}
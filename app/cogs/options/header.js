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
        icon: "fa-solid fa-file-lines",
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
    siori: {
        icon: "fa-solid fa-bookmark",
        text: "しおり"
    },
    option: {
        icon: "fa-solid fa-gear",
        text: "設定"
    }
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
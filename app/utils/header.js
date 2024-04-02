export const icon_list = {
    home: {
        icon: "fa-solid fa-house",
        text: "ホーム"
    },
    narou: {
        icon: "fa-solid fa-pen-nib",
        text: "トップページ"
    },
    login: {
        icon: "fa-solid fa-right-to-bracket",
        text: "ログイン"
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
    typo: {
        icon: "fa-solid fa-keyboard",
        text: "誤字報告"
    },
    report: {
        icon: "fa-solid fa-bullhorn",
        text: "情報提供"
    },
    scroll: {
        icon: "fa-solid fa-angles-up",
        text: "スクロール"
    },
    /*
    "copy-url": {
        icon: "fa-solid fa-link",
        text: "URLをコピー"
    },
    */
    twitter: {
        icon: "fa-brands fa-x-twitter",
        text: "X"
    },
    facebook: {
        icon: "fa-brands fa-facebook",
        text: "Facebook"
    },
    line: {
        icon: "fa-brands fa-line",
        text: "LINE"
    },
    qrcode: {
        icon: "fa-solid fa-qrcode",
        text: "QRコード"
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
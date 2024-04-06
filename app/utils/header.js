import { defaultValue } from "./misc.js"

export const novelIconList = {
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
    "copy-url": {
        icon: "fa-solid fa-link",
        text: "URLをコピー"
    },
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
    "hatena-bookmark": {
        icon: "fa-brands fa-hatena-bookmark",
        text: "はてなブックマーク"
    },
    feedly: {
        icon: "fa-brands fa-feedly",
        text: "Feedly"
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

export const workspaceIconList = {
    user: {
        icon: "fa-solid fa-user",
        text: "ユーザ",
        isDropdown: true
    },
    message: {
        icon: "fa-regular fa-envelope",
        text: "メッセージ"
    },
    home: {
        icon: "fa-solid fa-house",
        text: "ユーザホーム"
    },
    menu: {
        icon: "fa-solid fa-bars",
        text: "メニュー",
        isDropdown: true
    },
    favorite: {
        icon: "fa-regular fa-star",
        text: "お気に入り",
        isDropdown: true
    },
    favuser: {
        icon: "fa-solid fa-heart",
        text: "お気に入りユーザ"
    },
    favnovel: {
        icon: "fa-solid fa-book-bookmark",
        text: "ブックマーク"
    },
    edit: {
        icon: "fa-solid fa-pen",
        text: "投稿",
        isDropdown: true
    },
    usernovel: {
        icon: "fa-solid fa-plus",
        text: "作品の作成・編集"
    },
    novelseries: {
        icon: "fa-solid fa-list",
        text: "シリーズ設定"
    },
    blog: {
        icon: "fa-regular fa-newspaper",
        text: "活動報告"
    },
    reaction: {
        icon: "fa-regular fa-comment-dots",
        text: "リアクション",
        isDropdown: true
    },
    impression: {
        icon: "fa-regular fa-comment",
        text: "感想"
    },
    review: {
        icon: "fa-solid fa-flag",
        text: "イチオシレビュー"
    },
    blogcomment: {
        icon: "fa-regular fa-newspaper",
        text: "活動報告コメント"
    },
    novelreport: {
        icon: "fa-solid fa-keyboard",
        text: "誤字報告"
    },
    "block-mute": {
        icon: "fa-solid fa-ban",
        text: "ブロック・ミュート",
        isDropdown: true
    },
    "x-home": {
        icon: "fa-solid fa-house",
        text: "ホーム↔Xホーム"
    },
    find: {
        icon: "fa-solid fa-magnifying-glass",
        text: "作品を探す",
        isDropdown: true
    },
    support: {
        icon: "fa-regular fa-circle-question",
        text: "お困りの方は",
        isDropdown: true
    }
}

export function getExceptedIcon(lists, parent){
    var v = []
    $.each(lists, function(_, list){
        $.each(list, function(_, key){
            v.push(key)
        })
    })

    parent = defaultValue(parent, novelIconList)

    var ret = []
    $.each(parent, function(key, _){
        if(!v.includes(key)){
            ret.push(key)
        }
    })
    return ret;
}

export function addFontAwesomeOriginaIcons(){
    /* はてなブックマーク */
    FontAwesome.library.add({
        prefix: 'fab',
        iconName: 'hatena-bookmark',
        icon: [ 
            512,
            512,
            [],
            'xxxx',
            'M509 0h-94v284h94V0ZM4 426h136s67 0 96-6c48-9 102-37 102-116 0-83-59-105-96-108 55-13 77-43 77-92 0-61-45-95-115-101a1131 1131 0 0 0-104-3H4v426Zm172-169h1c6 1 27 3 38 12 11 10 13 25 13 35 0 20-6 33-32 41-13 3-27 4-33 4a2462 2462 0 0 1-51 0v-93l64 1ZM119 94a285 285 0 0 1 60 4c13 3 31 8 31 41 0 31-24 36-38 39-14 2-60 2-60 2V94h7Zm397 278a54 54 0 1 1-108 0 54 54 0 0 1 108 0Z'
        ]
    })

    FontAwesome.library.add({
            prefix: 'fab',
            iconName: 'feedly',
            icon: [ 
                512,
                512,
                [],
                'xxxx',
                'M296 17a56 56 0 0 0-80 0L16 221a58 58 0 0 0 0 81l143 145c10 9 23 14 37 14h120a56 56 0 0 0 40-17l140-142a58 58 0 0 0 0-81L296 17Zm-6 372-20 20a8 8 0 0 1-6 3h-17l-5-2-20-21a8 8 0 0 1 0-12l28-29a8 8 0 0 1 12 0l28 30a8 8 0 0 1 0 11Zm0-122-80 82a8 8 0 0 1-5 2h-17l-6-2-20-21a8 8 0 0 1 0-11l88-90a8 8 0 0 1 12 0l28 29a8 8 0 0 1 0 11Zm0-121L151 288a8 8 0 0 1-6 2h-17l-5-2-21-21a8 8 0 0 1 0-11l148-151a8 8 0 0 1 12 0l28 29a8 8 0 0 1 0 12Z'
            ]
        })
}
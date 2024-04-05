export function _header(){
    headerIcons()
    changeHeaderScrollMode()

}

function changeHeaderScrollMode(){
    var elm = ".l-header"

    function changeMode(elm){
        chrome.storage.local.get(null, (data) => {
            const header_mode = data.workspaceCustomHeaderMode
            const hidden_begin = data.workspaceCustomHeaderScrollHidden
            if(!$(elm).length){return}

            $(elm).removeClass("header-mode--fixed")
            $(elm).removeClass("header-mode--absolute")
            $(elm).removeClass("header-mode--scroll")
            $(elm).css({"position": ""})
            $("#novelnavi_right").css({"position": ""})
            $("#novelnavi_right > *").css({"position": ""})

            if(header_mode=="fixed"){
                $(elm).addClass("header-mode--fixed")
            }else if(header_mode=="absolute"){
                $(elm).addClass("header-mode--absolute")
            }else if(header_mode=="scroll"){
                $(elm).addClass("header-mode--scroll")
                if(hidden_begin){
                    $(elm + '.header-mode--scroll').addClass('hide');
                }
            }
        })
    }
    changeMode(elm)

    var pos = $(window).scrollTop();
    $(window).on("scroll", function(){
        if(Math.abs($(this).scrollTop() - pos)>100 ){
            if($(this).scrollTop() < pos ){
                $(elm + '.header-mode--scroll').removeClass('hide'); /* Scroll Up */
                $("#novel_header_search_box.show").removeClass("show")
            }else{
                $(elm + '.header-mode--scroll').addClass('hide'); /* Scroll Down */
                $("#novel_header_search_box.show").removeClass("show")
            }
            pos = $(this).scrollTop();
        }
    });

    chrome.storage.local.onChanged.addListener(function(changes){
        if(changes.novelCustomHeaderMode!=undefined || changes.novelCustomHeaderScrollHidden!=undefined){
            changeMode(elm)
        }
    })
}

const icon_list = {
    user: {
        icon: "fa-solid fa-user",
        text: "ユーザ"
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
        text: "メニュー"
    },
    favorite: {
        icon: "fa-regular fa-star",
        text: "お気に入り"
    },
    edit: {
        icon: "fa-solid fa-pen",
        text: "投稿"
    },
    blog: {
        icon: "fa-regular fa-newspaper",
        text: "活動報告"
    },
    reaction: {
        icon: "fa-regular fa-comment",
        text: "リアクション"
    },
    "block-mute": {
        icon: "fa-solid fa-ban",
        text: "ブロック・ミュート"
    },
    "x-home": {
        icon: "fa-solid fa-house",
        text: "ホーム↔Xホーム"
    },
    find: {
        icon: "fa-solid fa-magnifying-glass",
        text: "作品を探す"
    },
    support: {
        icon: "fa-regular fa-circle-question",
        text: "お困りの方は"
    }
}

function headerIcons(){
    var headerParent = $(".p-up-header-pc .p-up-header-pc__nav")
    function getLink(selector){
        return $(".p-up-header-pc__gmenu-list").find(selector)[0].outerHTML
    }

    // ユーザ
    var elm = $(".p-up-header-pc__nav-item:has(.p-up-header-pc__account)")
    if(elm.length){
        elm.addClass("user")
    }

    //メッセージ
    var elm = $(".p-up-header-pc__nav-item:has(.p-icon--envelope)")
    if(elm.length){
        elm.addClass("message")
    }

    //ユーザホーム
    var elm = $(".p-up-header-pc__nav-item:has(a > .p-icon--home)")
    if(elm.length){
        elm.addClass("home")
    }

    //メニュー
    var elm = $(".p-up-header-pc__nav-item:has(.p-up-header-pc__gmenu)")
    if(elm.length){
        elm.addClass("menu")
    }

    /* 複数カテゴリ */
    //お気に入り
    headerParent.append(`
        <li class="p-up-header-pc__nav-item favorite">
            <div class="p-up-header-pc__account">
                <span class="p-up-header-pc__nav-label p-up-header-pc__username">
                    <span class="p-icon p-icon--star-line p-up-header-pc__nav-icon" aria-hidden="true"></span>お気に入り
                </span>
                <div class="p-up-header-pc__account-menu">
                    <ul class="p-up-header-pc__account-menu-list">
                        <li>${getLink("a[href='https://syosetu.com/favnovelmain/list/'], a[href='https://syosetu.com/favnovelmain18/list/']")}</li>
                        <li>${getLink("a[href='https://syosetu.com/favuser/list/'], a[href='https://syosetu.com/favuser18/list/']")}</li>
                    </ul>
                </div>
            </div>
        </li>
    `)

    //投稿
    headerParent.append(`
        <li class="p-up-header-pc__nav-item edit">
            <div class="p-up-header-pc__account">
                <span class="p-up-header-pc__nav-label p-up-header-pc__username">
                    <span class="p-icon p-icon--pen p-up-header-pc__nav-icon" aria-hidden="true"></span>投稿
                </span>
                <div class="p-up-header-pc__account-menu">
                    <ul class="p-up-header-pc__account-menu-list">
                        <li>${getLink("a[href='https://syosetu.com/usernovel/list/']")}</li>
                        <li>${getLink("a[href='https://syosetu.com/novelseriesmanage/list/'], a[href='https://syosetu.com/novelseries18manage/list/']")}</li>
                        <li>${getLink("a[href='https://syosetu.com/novelinitialsetting/updateinput/']")}</li>
                        <li>${getLink("a[href='https://syosetu.com/userwrittingnovel/backup/']")}</li>
                    </ul>
                </div>
            </div>
        </li>
    `)

    //活動報告
    var elm = $(`
        <li class="p-up-header-pc__nav-item blog">
            ${getLink("a[href='https://syosetu.com/userblog/list/'], a[href='https://syosetu.com/userxblog/list/']")}
        </li>
    `)
    elm.find("a").addClass("p-up-header-pc__nav-label").prepend(`<span class="p-icon p-icon--article p-up-header-pc__nav-icon" aria-hidden="true"></span>`)
    headerParent.append(elm)

    //リアクション
    headerParent.append(`
        <li class="p-up-header-pc__nav-item reaction">
            <div class="p-up-header-pc__account">
                <span class="p-up-header-pc__nav-label p-up-header-pc__username">
                    <span class="p-icon p-icon--comment-dots-line p-up-header-pc__nav-icon" aria-hidden="true"></span>リアクション
                </span>
                <div class="p-up-header-pc__account-menu">
                    <ul class="p-up-header-pc__account-menu-list">
                        <li>${getLink("a[href='https://syosetu.com/usernovelimpression/passivelist/']")}</li>
                        <li>${getLink("a[href='https://syosetu.com/usernovelreview/passivelist/']")}</li>
                        <li>${getLink("a[href='https://syosetu.com/userblogcomment/passivelist/'], a[href='https://syosetu.com/userxblogcomment/passivelist/']")}</li>
                        <li>${getLink("a[href='https://syosetu.com/usernovelreport/passivelist/']")}</li>
                    </ul>
                </div>
            </div>
        </li>
    `)

    //ブロック・ミュート
    headerParent.append(`
        <li class="p-up-header-pc__nav-item block-mute">
            <div class="p-up-header-pc__account">
                <span class="p-up-header-pc__nav-label p-up-header-pc__username">
                    <span class="p-icon p-icon--block p-up-header-pc__nav-icon" aria-hidden="true"></span>ブロック・ミュート
                </span>
                <div class="p-up-header-pc__account-menu">
                    <ul class="p-up-header-pc__account-menu-list">
                        <li>${getLink("a[href='https://syosetu.com/userblock/list/'], a[href='https://syosetu.com/xuserblock/list/']")}</li>
                        <li>${getLink("a[href='https://syosetu.com/mute/list/'], a[href='https://syosetu.com/mute18/list/']")}</li>
                    </ul>
                </div>
            </div>
        </li>
    `)

    //Xユーザホーム
    var elm = $(`
        <li class="p-up-header-pc__nav-item x-home">
            ${getLink("a[href='https://syosetu.com/xuser/top/'], a[href='https://syosetu.com/user/top/']")}
        </li>
    `)
    elm.find("a").addClass("p-up-header-pc__nav-label").prepend(`<span class="p-icon p-icon--home p-up-header-pc__nav-icon" aria-hidden="true"></span>`)
    headerParent.append(elm)


    //ヘッダ設定
    $(".p-up-header-pc__nav .p-up-header-pc__nav-item").addClass("disabled")
    chrome.storage.local.get(null, (data) => {
        $.each(data.workspaceCustomHeader, function(_, key){
            var elm = $(".p-up-header-pc__nav-item."+key)
            if(elm.length){
                elm.removeClass("disabled")
                $(".p-up-header-pc__nav").append(elm)
            }
        })
    })
}
export const mypage_optionsList = [
    /* 全般 (general) */
    {
        id: "mypageShowUserId",
        title: "ユーザIDを表示",
        description: {
            text: "ユーザ名の横にIDを表示します。",
            keywords: ["ゆーざIDをひょうじ", "ユーザID", "マイページ"],
        },
        ui: {
            type: "toggle",
            name: "default"
        },
        location: {
            page: "mypage",
            category: "general",
        },
        value: {
            related: ["mypageShowUserId"],
            buttons: {
                reset: true,
                favorite: true,
            },
        },
    },

    {
        id: "mypageShowFavUserId",
        title: "お気に入りユーザのIDを表示",
        description: {
            text: "お気に入りユーザ名の下にIDを表示します。",
            keywords: ["おきにいりゆーざのIDをひょうじ", "お気に入りユーザ", "ユーザID", "マイページ"],
        },
        ui: {
            type: "toggle",
            name: "default"
        },
        location: {
            page: "mypage",
            category: "general",
        },
        value: {
            related: ["mypageShowFavUserId"],
            buttons: {
                reset: true,
                favorite: true,
            },
        },
    },

    {
        id: "mypageNovellistData",
        title: "作品の情報表示",
        noindex: true,
        ui: {
            type: "parent",
            name: "default"
        },
        location: {
            page: "mypage",
            category: "general",
        },
        value: {
            related: "child",
            buttons: {
                reset: true,
                favorite: true,
            },
        },
    },

    {
        id: "mypageNovellistShowReaction",
        title: "評価情報",
        description: {
            text: "作品のポイントやブックマーク数などを表示します。",
            keywords: ["しょうせつのひょうかじょうほうをひょうじ", "評価ポイント", "評価", "マイページ"],
        },
        ui: {
            type: "toggle",
            name: "default"
        },
        location: {
            page: "mypage",
            category: "general",
            hasParent: true,
            parent: "mypageNovellistData"
        },
        value: {
            related: ["mypageNovellistShowReaction"],
            buttons: {
                reset: true,
                favorite: true,
            },
        },
    },

    {
        id: "mypageNovellistShowLength",
        title: "読了時間",
        description: {
            text: "作品の読了時間や文字数を表示します。",
            keywords: ["しょうせつのどくりょうじかんをひょうじ", "マイページ"],
        },
        ui: {
            type: "toggle",
            name: "default"
        },
        location: {
            page: "mypage",
            category: "general",
            hasParent: true,
            parent: "mypageNovellistData"
        },
        value: {
            related: ["mypageNovellistShowLength"],
            buttons: {
                reset: true,
                favorite: true,
            },
        },
    },

    {
        id: "mypageNovellistShowKasasagi",
        title: "アクセス解析",
        description: {
            text: "作品のアクセス解析ページへのリンクを表示します。",
            keywords: ["しょうせつのあくせすかいせきへのりんくをひょうじ", "マイページ", "アクセス解析", "KASASAGI"],
        },
        ui: {
            type: "toggle",
            name: "default",
        },
        location: {
            page: "mypage",
            category: "general",
            hasParent: true,
            parent: "mypageNovellistData"
        },
        value: {
            related: ["mypageNovellistShowKasasagi"],
            buttons: {
                reset: true,
                favorite: true,
            },
        },
    },

    {
        id: "mypageNovellistShowRaWi",
        title: "RaWi",
        description: {
            text: "作品のRaWiへのリンクを表示します。",
            keywords: ["RaWiへのりんくをひょうじ", "マイページ", "RaWi"],
        },
        ui: {
            type: "toggle",
            name: "default",
        },
        location: {
            page: "mypage",
            category: "general",
            hasParent: true,
            parent: "mypageNovellistData"
        },
        value: {
            related: ["mypageNovellistShowRaWi"],
            buttons: {
                reset: true,
                favorite: true,
            },
        },
    },

    {
        id: "mypageDisableExternalURLWarning",
        title: "外部リンク警告を非表示",
        description: {
            text: "外部リンクのクリック時に表示される警告画面を無効化します。",
            keywords: ["がいぶりんくけいこくをひひょうじ", "マイページ"],
        },
        ui: {
            type: "toggle",
            name: "default"
        },
        location: {
            page: "mypage",
            category: "general",
        },
        value: {
            related: ["mypageDisableExternalURLWarning"],
            buttons: {
                reset: true,
                favorite: true,
            },
            isAdvanced: true
        },
    },

    /* 活動報告 (blog) */
    {
        id: "mypageBlogAutoURL",
        title: "自動URL化（活動報告の本文）",
        description: {
            text: "活動報告の本文に含まれるURL文字列を、自動的にリンクに変換します。",
            keywords: ["じどうURLか（かつどうほうこくのほんぶん）", "活動報告", "自動URL化"],
        },
        ui: {
            type: "toggle",
            name: "default"
        },
        location: {
            page: "mypage",
            category: "blog",
        },
        value: {
            related: ["mypageBlogAutoURL"],
            buttons: {
                reset: true,
                favorite: true,
            },
        },
    },

    {
        id: "mypageBlogCommentAutoURL",
        title: "自動URL化（活動報告のコメント）",
        description: {
            text: "活動報告のコメントに含まれるURL文字列を、自動的にリンクに変換します。",
            keywords: ["じどうURLか（かつどうほうこくのこめんと）", "活動報告", "自動URL化"],
        },
        ui: {
            type: "toggle",
            name: "default"
        },
        location: {
            page: "mypage",
            category: "blog",
        },
        value: {
            related: ["mypageBlogCommentAutoURL"],
            buttons: {
                reset: true,
                favorite: true,
            },
        },
    },

    /* プロフィール (profile) */
    {
        id: "mypageProfileStatics",
        title: "統計を表示",
        description: {
            text: "ユーザの統計情報を表示します。",
            keywords: ["ゆーざとうけいをひょうじ", "マイページ", "プロフィール", "なろうAPI"],
        },
        ui: {
            type: "toggle",
            name: "default"
        },
        location: {
            page: "mypage",
            category: "profile",
        },
        value: {
            related: ["mypageProfileStatics"],
            buttons: {
                reset: true,
                favorite: true,
            },
        },
    },

    {
        id: "mypageProfileBooklist",
        title: "書報を表示",
        description: {
            text: "ユーザが刊行した書籍情報を書報から取得します。",
            keywords: ["しょほうをひょうじ", "マイページ", "プロフィール", "書報"],
        },
        ui: {
            type: "toggle",
            name: "default"
        },
        location: {
            page: "mypage",
            category: "profile",
        },
        value: {
            related: ["mypageProfileBooklist"],
            buttons: {
                reset: true,
                favorite: true,
            },
        },
    },

    {
        id: "mypageProfileBooklist",
        title: "自動URL化（プロフィール）",
        description: {
            text: "プロフィールに含まれるURL文字列を、自動的にリンクに変換します。",
            keywords: ["じどうURLか（ぷろふぃーる）", "マイページ", "プロフィール", "自動URL化"],
        },
        ui: {
            type: "toggle",
            name: "default"
        },
        location: {
            page: "mypage",
            category: "profile",
        },
        value: {
            related: ["mypageProfileAutoURL"],
            buttons: {
                reset: true,
                favorite: true,
            },
        },
    },
]
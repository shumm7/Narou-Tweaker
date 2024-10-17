export const narou_optionsList = [
    /* 全般 (general) */
    {
        id: "narouSyuppanShowBookImage",
        title: "書報（作品一覧）ページの書影を取得",
        description: {
            text: "書報（作品一覧）ページ上にある作品の書影をAmazonから取得します。",
            small: "（負荷軽減のため、アイコンをクリックした時に書影を取得します）",
            keywords: ["しょほう（さくひんいちらん）ぺーじのしょえいをしゅとく", "書報", "書影"],
        },
        ui: {
            type: "toggle",
            name: "default",
        },
        location: {
            page: "narou",
            category: "general",
        },
        value: {
            related: ["narouSyuppanShowBookImage"],
            buttons: {
                reset: true,
                favorite: true,
            },
        }
    },

    {
        id: "narouSyuppanShowBookViewImage",
        title: "書報（作品詳細）ページの書影を取得",
        description: {
            text: "書報（作品詳細）ページ上にある作品の書影をAmazonから取得します。",
            keywords: ["しょほう（さくひんしょうさい）ぺーじのしょえいをしゅとく", "書報", "書影"],
        },
        ui: {
            type: "toggle",
            name: "default",
        },
        location: {
            page: "narou",
            category: "general",
        },
        value: {
            related: ["narouSyuppanShowBookViewImage"],
            buttons: {
                reset: true,
                favorite: true,
            },
        }
    },
    
    {
        id: "narouSkipAgeauth",
        title: "アダルトコンテンツの年齢認証をスキップ",
        description: {
            text: "各種R18小説サイト、および、えぱれっとの年齢認証画面をスキップします。",
            attention: "18歳未満の方は有効にしないでください。",
            keywords: ["あだるとこんてんつのねんれいにんしょうをすきっぷ", "R18", "アダルト", "ノクターンノベルズ", "ミッドナイトノベルズ", "ムーンライトノベルズ", "えぱれっと"],
        },
        ui: {
            type: "toggle",
            name: "default",
        },
        location: {
            page: "narou",
            category: "general",
        },
        value: {
            related: ["narouSkipAgeauth"],
            buttons: {
                reset: true,
                favorite: true,
            },
            isExperimental: true,
        }
    },
    
]
export const yomou_optionsList = [
    /* ランキング (rank) */
    {
        id: "parent_yomouRank_data",
        title: "表示内容",
        description: {
            text: "各作品に表示する情報を設定します。"
        },
        ui: {
            type: "parent",
            name: "column",
        },
        location: {
            page: "yomou",
            category: "rank",
            noindex: true,
        },
        value: {
            related: "child",
            buttons: {
                reset: true,
                favorite: true,
            },
        }
    },

    {
        id: "parent_yomouRank_point",
        title: "ポイント表示",
        ui: {
            type: "parent",
            name: "column",
        },
        location: {
            page: "yomou",
            category: "rank",
            noindex: true,
        },
        value: {
            related: "child",
            buttons: {
                reset: true,
                favorite: true,
            },
            isAdvanced: true,
        }
    },

    {
        id: "yomouRank_ShowDescription",
        title: "あらすじ",
        description: {
            hidden: "ランキング上の作品にあらすじを表示します。",
            keywords: ["あらすじ", "ランキング"],
        },
        ui: {
            type: "toggle",
            name: "default",
        },
        location: {
            page: "yomou",
            category: "rank",
            hasParent: true,
            parent: "parent_yomouRank_data",
        },
        value: {
            related: ["yomouRank_ShowDescription"],
            buttons: {
                reset: true,
                favorite: true,
            },
        },
    },

    {
        id: "yomouRank_ShowTags",
        title: "キーワード",
        description: {
            hidden: "ランキング上の作品にキーワードを表示します。",
            keywords: ["きーわーど", "ランキング", "キーワード", "タグ"],
        },
        ui: {
            type: "toggle",
            name: "default",
        },
        location: {
            page: "yomou",
            category: "rank",
            hasParent: true,
            parent: "parent_yomouRank_data",
        },
        value: {
            related: ["yomouRank_ShowTags"],
            buttons: {
                reset: true,
                favorite: true,
            },
        },
    },

    {
        id: "yomouRank_ShowNovelInfoLink",
        title: "作品情報へのリンク",
        description: {
            hidden: "ランキング上の作品に作品情報ページへのリンクを表示します。",
            keywords: ["さくひんじょうほうへのりんく", "ランキング", "作品情報"],
        },
        ui: {
            type: "toggle",
            name: "default",
        },
        location: {
            page: "yomou",
            category: "rank",
            hasParent: true,
            parent: "parent_yomouRank_data",
        },
        value: {
            related: ["yomouRank_ShowNovelInfoLink"],
            buttons: {
                reset: true,
                favorite: true,
            },
        },
    },

    {
        id: "yomouRank_ShowKasasagi",
        title: "アクセス解析へのリンク",
        description: {
            hidden: "ランキング上の作品にアクセス解析ページへのリンクを表示します。",
            keywords: ["あくせすかいせきへのりんく", "ランキング", "アクセス解析", "KASASAGI"],
        },
        ui: {
            type: "toggle",
            name: "default",
        },
        location: {
            page: "yomou",
            category: "rank",
            hasParent: true,
            parent: "parent_yomouRank_data",
        },
        value: {
            related: ["yomouRank_ShowKasasagi"],
            buttons: {
                reset: true,
                favorite: true,
            },
        },
    },

    {
        id: "yomouRank_ShowRaWi",
        title: "RaWiへのリンク",
        description: {
            hidden: "ランキング上の作品にRaWiへのリンクを表示します。",
            keywords: ["RaWiへのりんく", "ランキング", "RaWi"],
        },
        ui: {
            type: "toggle",
            name: "default",
        },
        location: {
            page: "yomou",
            category: "rank",
            hasParent: true,
            parent: "parent_yomouRank_data",
        },
        value: {
            related: ["yomouRank_ShowRaWi"],
            buttons: {
                reset: true,
                favorite: true,
            },
        },
    },

    {
        id: "yomouRank_DevidePointsUnit",
        title: "ポイント表示の数値と単位の色を分ける",
        description: {
            text: "評価ポイントの数値と単位の文字色を分けます。",
            keywords: ["ぽいんとひょうじのすうちとたんいのいろをわける", "ランキング", "評価ポイント", "CSS"],
        },
        ui: {
            type: "toggle",
            name: "default",
        },
        location: {
            page: "yomou",
            category: "rank",
            hasParent: true,
            parent: "parent_yomouRank_point",
        },
        value: {
            related: ["yomouRank_DevidePointsUnit"],
            buttons: {
                reset: true,
                favorite: true,
            },
            isAdvanced: true,
        },
    },

    {
        id: "yomouRank_PointsColor",
        title: "ポイント表示色",
        description: {
            hidden: "評価ポイントの文字色を指定します。",
            keywords: ["ぽいんとひょうじしょく", "ランキング", "評価ポイント", "CSS"],
        },
        ui: {
            type: "input",
            name: "color",
        },
        location: {
            page: "yomou",
            category: "rank",
            hasParent: true,
            parent: "parent_yomouRank_point",
        },
        value: {
            related: ["yomouRank_PointsColor"],
            buttons: {
                reset: true,
                favorite: true,
            },
            isAdvanced: true,
        },
    },

    {
        id: "yomouRank_CustomCSS",
        title: "追加CSS",
        description: {
            text: "任意のCSSをランキングページに追加することができます。",
            keywords: ["ついかCSS", "追加CSS"],
        },
        ui: {
            type: "textarea",
            name: "syntax-highlight",
            data: "css",
        },
        location: {
            page: "yomou",
            category: "rank",
        },
        value: {
            related: ["yomouRank_CustomCSS"],
            buttons: {
                reset: true,
                favorite: true,
            },
            isAdvanced: true,
        },
    },

    /* ランキング（トップ） (ranktop) */
    {
        id: "parent_yomouRankTop_data",
        title: "表示内容",
        description: {
            text: "各作品に表示する情報を設定します。",
        },
        ui: {
            type: "parent",
            name: "column",
        },
        location: {
            page: "yomou",
            category: "ranktop",
            noindex: true,
        },
        value: {
            related: "child",
            buttons: {
                reset: true,
                favorite: true,
            },
        }
    },

    {
        id: "yomouRankTop_ShowPoints",
        title: "ポイント",
        ui: {
            type: "toggle",
            name: "default",
        },
        location: {
            page: "yomou",
            category: "ranktop",
            hasParent: true,
            parent: "parent_yomouRankTop_data"
        },
        value: {
            related: ["yomouRankTop_ShowPoints"],
            buttons: {
                reset: true,
                favorite: true,
            },
        },
    },

    {
        id: "yomouRankTop_ShowDescription",
        title: "あらすじ",
        description: {
            hidden: "ランキングのトップページ上の作品にあらすじを表示します。",
            keywords: ["あらすじ", "ランキング（トップ）"],
        },
        ui: {
            type: "toggle",
            name: "default",
        },
        location: {
            page: "yomou",
            category: "ranktop",
            hasParent: true,
            parent: "parent_yomouRankTop_data"
        },
        value: {
            related: ["yomouRankTop_ShowDescription"],
            buttons: {
                reset: true,
                favorite: true,
            },
        },
    },

    {
        id: "yomouRankTop_ShowTags",
        title: "キーワード",
        description: {
            hidden: "ランキングのトップページ上の作品にキーワードを表示します。",
            keywords: ["きーわーど", "ランキング（トップ）", "キーワード", "タグ"],
        },
        ui: {
            type: "toggle",
            name: "default",
        },
        location: {
            page: "yomou",
            category: "ranktop",
            hasParent: true,
            parent: "parent_yomouRankTop_data"
        },
        value: {
            related: ["yomouRankTop_ShowTags"],
            buttons: {
                reset: true,
                favorite: true,
            },
        },
    },

    {
        id: "yomouRankTop_ShowLength",
        title: "読了時間・文字数",
        description: {
            hidden: "ランキングのトップページ上の作品に読了時間・文字数を表示します。",
            keywords: ["どくりょうじかん・もじすう", "ランキング（トップ）"],
        },
        ui: {
            type: "toggle",
            name: "default",
        },
        location: {
            page: "yomou",
            category: "ranktop",
            hasParent: true,
            parent: "parent_yomouRankTop_data"
        },
        value: {
            related: ["yomouRankTop_ShowLength"],
            buttons: {
                reset: true,
                favorite: true,
            },
        },
    },

    {
        id: "yomouRankTop_ShowNovelInfoLink",
        title: "作品情報へのリンク",
        description: {
            hidden: "ランキングのトップページ上の作品に作品情報ページへのリンクを表示します。",
            keywords: ["さくひんじょうほうへのりんく", "ランキング（トップ）", "作品情報"],
        },
        ui: {
            type: "toggle",
            name: "default",
        },
        location: {
            page: "yomou",
            category: "ranktop",
            hasParent: true,
            parent: "parent_yomouRankTop_data"
        },
        value: {
            related: ["yomouRankTop_ShowNovelInfoLink"],
            buttons: {
                reset: true,
                favorite: true,
            },
        },
    },

    {
        id: "yomouRankTop_ShowUpdateDate",
        title: "最終更新日時",
        description: {
            hidden: "ランキングのトップページ上の作品に最終更新日時を表示します。",
            keywords: ["さいしゅうこうしんにちじ", "ランキング（トップ）"],
        },
        ui: {
            type: "toggle",
            name: "default",
        },
        location: {
            page: "yomou",
            category: "ranktop",
            hasParent: true,
            parent: "parent_yomouRankTop_data"
        },
        value: {
            related: ["yomouRankTop_ShowUpdateDate"],
            buttons: {
                reset: true,
                favorite: true,
            },
        },
    },

    {
        id: "yomouRankTop_ShowKasasagi",
        title: "アクセス解析へのリンク",
        description: {
            hidden: "ランキングのトップページ上の作品にアクセス解析ページへのリンクを表示します。",
            keywords: ["あくせすかいせきへのりんく", "ランキング（トップ）", "アクセス解析", "KASASAGI"],
        },
        ui: {
            type: "toggle",
            name: "default",
        },
        location: {
            page: "yomou",
            category: "ranktop",
            hasParent: true,
            parent: "parent_yomouRankTop_data"
        },
        value: {
            related: ["yomouRankTop_ShowKasasagi"],
            buttons: {
                reset: true,
                favorite: true,
            },
        },
    },

    {
        id: "yomouRankTop_ShowRaWi",
        title: "RaWiへのリンク",
        description: {
            hidden: "ランキングのトップページ上の作品にRaWiへのリンクを表示します。",
            keywords: ["RaWiへのりんく", "ランキング（トップ）", "RaWi"],
        },
        ui: {
            type: "toggle",
            name: "default",
        },
        location: {
            page: "yomou",
            category: "ranktop",
            hasParent: true,
            parent: "parent_yomouRankTop_data"
        },
        value: {
            related: ["yomouRankTop_ShowRaWi"],
            buttons: {
                reset: true,
                favorite: true,
            },
        },
    },
    
    {
        id: "yomouRankTop_CustomCSS",
        title: "追加CSS",
        description: {
            text: "任意のCSSをランキングのトップページに追加することができます。",
            keywords: ["ついかCSS", "追加CSS"],
        },
        ui: {
            type: "textarea",
            name: "syntax-highlight",
            data: "css"
        },
        location: {
            page: "yomou",
            category: "ranktop",
        },
        value: {
            related: ["yomouRankTop_CustomCSS"],
            buttons: {
                reset: true,
                favorite: true,
            },
            isAdvanced: true,
        },
    },
]
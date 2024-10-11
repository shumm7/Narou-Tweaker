export const workspace_optionsList = [
    /* 全般 (general) */
    {
        id: "workspaceCustomHeaderData",
        title: "ヘッダのアイテム配置",
        description: {
            text: "ヘッダに表示するアイテムを指定します。",
            small: "（最大6つまで）",
            keywords: ["へっだのあいてむはいち", "ヘッダ", "レイアウト", "外観"],
        },
        ui: {
            type: "custom",
            name: "default",
            data: "ui_workspaceCustomHeaderDraggable",
            action: workspace_customHeaderSortable,
        },
        location: {
            page: "workspace",
            category: "general",
        },
        value: {
            buttons: {
                reset: true,
                favorite: true,
            },
            related: ["workspaceCustomHeader"],
        },
    },

    {
        id: "workspaceCustomHeaderMenuData",
        title: "メニューのアイテム配置",
        description: {
            text: "ヘッダのメニューに表示するアイテムを指定します。",
            keywords: ["めにゅーのあいてむはいち", "ヘッダ", "レイアウト", "外観"],
        },
        ui: {
            type: "custom",
            name: "default",
            data: "ui_workspaceCustomHeaderMenuDraggable",
            action: workspace_customHeaderMenuSortable,
        },
        location: {
            page: "workspace",
            category: "general",
        },
        value: {
            buttons: {
                reset: true,
                favorite: true,
            },
            related: ["workspaceCustomMenu_Left", "workspaceCustomMenu_Middle", "workspaceCustomMenu_Right"],
        },
    },
    
    {
        id: "workspaceCustomHeaderMode",
        title: "ヘッダの追従モード",
        description: {
            text: "ヘッダの配置場所を設定します。",
            small: "・上部：ページ上部に固定<br>・追従：スクロールしても常に表示<br>・スクロール：基本は非表示、上にスクロールした時だけ表示",
            keywords: ["へっだのついじゅうもーど", "ヘッダ", "追従モード"],
        },
        ui: {
            type: "dropdown",
            name: "default",
            data: [
                {value: "absolute", title: "上部"},
                {value: "fixed", title: "追従"},
                {value: "scroll", title: "スクロール"},
            ]
        },
        location: {
            page: "workspace",
            category: "general",
        },
        value: {
            related: ["workspaceCustomHeaderMode"],
            buttons: {
                reset: true,
                favorite: true,
            },
            isExperimental: true,
        },
    },

    {
        id: "workspaceCustomHeaderScrollHidden",
        title: "ページ読み込み時にヘッダを隠す",
        description: {
            text: "オンの場合、ページ読み込み時にヘッダを隠します。",
            small: "（ヘッダの追従モードが「スクロール」でのみ有効）",
            keywords: ["ぺーじよみこみじにへっだをかくす", "ヘッダ", "追従モード"],
        },
        ui: {
            type: "toggle",
            name: "default"
        },
        location: {
            page: "workspace",
            category: "general",
        },
        value: {
            related: ["workspaceCustomHeaderScrollHidden"],
            buttons: {
                reset: true,
                favorite: true,
            },
            requirement: {
                dataFor: ["workspaceCustomHeaderMode"],
                data: "scroll",
                mode: "show"
            },
            isAdvanced: true,
        },
    },


    /* 小説管理 (manage) */
    {
        id: "workspaceNovelmanageDeleteConfirm",
        title: "小説削除の誤操作防止機能",
        description: {
            text: "うっかり小説を削除してしまうことを防ぐため、削除操作時の確認画面を変更します。",
            keywords: ["しょうせつさくじょのごそうさぼうしきのう", "削除", "安全"],
        },
        ui: {
            type: "toggle",
            name: "default"
        },
        location: {
            page: "workspace",
            category: "manage",
        },
        value: {
            related: ["workspaceNovelmanageDeleteConfirm"],
            buttons: {
                reset: true,
                favorite: true,
            },
        },
    },

    {
        id: "workspaceUserblogmanageDeleteConfirm",
        title: "活動報告削除の誤操作防止機能",
        description: {
            text: "うっかり活動報告を削除してしまうことを防ぐため、削除操作時の確認画面を変更します。",
            keywords: ["かつどうほうこくさくじょのごそうさぼうしきのう", "削除", "安全"],
        },
        ui: {
            type: "toggle",
            name: "default"
        },
        location: {
            page: "workspace",
            category: "manage",
        },
        value: {
            related: ["workspaceUserblogmanageDeleteConfirm"],
            buttons: {
                reset: true,
                favorite: true,
            },
        },
    },

    {
        id: "workspaceNovelmanageShowPointAverage",
        title: "作品詳細ページで評価ポイント平均を表示",
        description: {
            text: "作品詳細ページ上で、評価ポイント平均の星マークの横に数値を表示します。",
            keywords: ["さくひんしょうさいぺーじでひょうかぽいんとへいきんをひょうじ", "評価ポイント"],
        },
        ui: {
            type: "toggle",
            name: "default"
        },
        location: {
            page: "workspace",
            category: "manage",
        },
        value: {
            related: ["workspaceNovelmanageShowPointAverage"],
            buttons: {
                reset: true,
                favorite: true,
            },
            isAdvanced: true
        },
    },
    
    /* エディタ (editor) */
    {
        id: "workspaceCustomEditor",
        title: "エディタ",
        description: {
            text: "小説の編集画面をオリジナルのエディタに変更します。",
            keywords: ["えでぃた", "エディタ", "編集", "レイアウト", "外観", "デザイン"],
        },
        ui: {
            type: "toggle",
            name: "default"
        },
        location: {
            page: "workspace",
            category: "editor",
        },
        value: {
            related: ["workspaceCustomEditor"],
            buttons: {
                reset: true,
                favorite: true,
            },
        },
    },

    /* お気に入り (favorite) */
    {
        id: "parent_workspaceFavorite_Bookmark",
        title: "ブックマーク",
        ui: {
            type: "parent",
            name: "column",
        },
        location: {
            page: "workspace",
            category: "favorite",
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
        id: "workspaceBookmarkLayout",
        title: "ブックマークのレイアウト",
        description: {
            text: "ブックマーク画面のレイアウトを変更します。",
            keywords: ["ぶっくまーくのれいあうと", "レイアウト", "外観", "デザイン", "ブックマーク", "お気に入り"],
        },
        ui: {
            type: "dropdown",
            name: "default",
            data: [
                {value: "0", title: "デフォルト"},
                {value: "1", title: "旧デザイン風"},
                {value: "2", title: "リスト表示"}
            ]
        },
        location: {
            page: "workspace",
            category: "favorite",
            hasParent: true,
            parent: "parent_workspaceFavorite_Bookmark",
        },
        value: {
            related: ["workspaceBookmarkLayout"],
            buttons: {
                reset: true,
                favorite: true,
            },
        },
    },

    {
        id: "workspaceBookmarkCategoryLayout",
        title: "カテゴリ表示",
        description: {
            text: "ブックマークカテゴリのレイアウトを変更します。",
            keywords: ["ぶっくまーくかてごりひょうじ", "レイアウト", "外観", "デザイン", "ブックマーク", "お気に入り"],
        },
        ui: {
            type: "dropdown",
            name: "default",
            data: [
                {value: "0", title: "ドロップダウン"},
                {value: "1", title: "サイドバー"},
                {value: "2", title: "ドロップダウン・サイドバー両方"}
            ]
        },
        location: {
            page: "workspace",
            category: "favorite",
            hasParent: true,
            parent: "parent_workspaceFavorite_Bookmark",
        },
        value: {
            related: ["workspaceBookmarkCategoryLayout"],
            buttons: {
                reset: true,
                favorite: true,
            },
        },
    },

    {
        id: "workspaceBookmarkReplaceEpisode",
        title: "「部分」表記へ変更",
        description: {
            text: "「エピソード(ep.)」の表記を「部分」に変更します。",
            keywords: ["「えぴそーど」 → 「ぶぶん」ひょうき", "ブックマーク", "お気に入り"],
        },
        ui: {
            type: "toggle",
            name: "default"
        },
        location: {
            page: "workspace",
            category: "favorite",
            hasParent: true,
            parent: "parent_workspaceFavorite_Bookmark",
        },
        value: {
            related: ["workspaceBookmarkReplaceEpisode"],
            buttons: {
                reset: true,
                favorite: true,
            },
            isExperimental: true,
        },
    },

    /* リアクション */
    {
        id: "parent_workspaceReaction_Impression",
        title: "感想",
        ui: {
            type: "parent",
            name: "column",
        },
        location: {
            page: "workspace",
            category: "reaction",
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
        id: "workspaceImpressionMarkedButton",
        title: "既読/未読ボタンを表示",
        description: {
            text: "書かれた感想を既読/未読にするボタンを追加します。",
            keywords: ["きどく/みどくぼたんをひょうじ", "感想", "リアクション"],
        },
        ui: {
            type: "toggle",
            name: "default"
        },
        location: {
            page: "workspace",
            category: "reaction",
            hasParent: true,
            parent: "parent_workspaceReaction_Impression",
        },
        value: {
            related: ["workspaceImpressionMarkedButton"],
            buttons: {
                reset: true,
                favorite: true,
            },
        },
    },

    {
        id: "workspaceImpressionHideButton",
        title: "表示/非表示ボタンを表示",
        description: {
            text: "書かれた感想を表示/非表示にするボタンを追加します。",
            keywords: ["ひょうじ/ひひょうじぼたんをひょうじ", "感想", "リアクション"],
        },
        ui: {
            type: "toggle",
            name: "default"
        },
        location: {
            page: "workspace",
            category: "reaction",
            hasParent: true,
            parent: "parent_workspaceReaction_Impression",
        },
        value: {
            related: ["workspaceImpressionHideButton"],
            buttons: {
                reset: true,
                favorite: true,
            },
        },
    },

    {
        id: "workspaceImpressionMarkAsReadWhenReply",
        title: "返信時に既読にする",
        description: {
            text: "感想に返信したとき、自動的にその感想を既読にします。",
            keywords: ["へんしんじにきどくにする", "感想", "リアクション"],
        },
        ui: {
            type: "toggle",
            name: "default"
        },
        location: {
            page: "workspace",
            category: "reaction",
            hasParent: true,
            parent: "parent_workspaceReaction_Impression",
        },
        value: {
            related: ["workspaceImpressionMarkAsReadWhenReply"],
            buttons: {
                reset: true,
                favorite: true,
            },
            requirement: {
                dataFor: ["workspaceImpressionMarkedButton"],
                data: true,
                mode: "show"
            },
            isAdvanced: true,
        },
    },

    {
        id: "workspaceImpressionHideWhenMarked",
        title: "既読にしたとき非表示にする",
        description: {
            text: "感想を既読にしたとき、自動的にその感想を非表示にします。",
            keywords: ["きどくにしたときひひょうじにする", "感想", "リアクション"],
        },
        ui: {
            type: "toggle",
            name: "default"
        },
        location: {
            page: "workspace",
            category: "reaction",
            hasParent: true,
            parent: "parent_workspaceReaction_Impression",
        },
        value: {
            related: ["workspaceImpressionHideWhenMarked"],
            buttons: {
                reset: true,
                favorite: true,
            },
            requirement: {
                dataFor: ["workspaceImpressionMarkedButton", "workspaceImpressionHideButton"],
                data: true,
                mode: "show"
            },
            isAdvanced: true,
        },
    },
]
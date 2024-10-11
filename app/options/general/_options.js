import { general_exportOptionData, general_exportOptionText, general_fixOptionData, general_importOptionData, general_insertOptionData, general_monitorOptionChanged, general_popupDefaultPage_Dropdown, general_removeOptionData } from "./_optionsAction.js";

export const general_optionsList = [
    /* Narou Tweaker (introduction) */
    {
        id: "extIntroduction_Image",
        title: "Narou Tweaker",
        description: {
            text: "「小説家になろう」を最高に使いやすく。"
        },
        ui: {
            type: "custom",
            name: "wide",
            data: "ui_extIntroduction_Image"
        },
        location: {
            page: "general",
            category: "introduction",
            noindex: true,
        },
        value: {
            buttons: {
                reset: false,
                favorite: false,
            },
        },
    },

    {
        id: "extIntroduction_About",
        title: "Narou Tweakerとは",
        ui: {
            type: "custom",
            name: "default",
            data: "ui_extIntroduction_About"
        },
        location: {
            page: "general",
            category: "introduction",
            noindex: true,
        },
        value: {
            buttons: {
                reset: false,
                favorite: false,
            },
        },
    },

    {
        id: "extIntroduction_Terms",
        title: "プライバシーポリシー",
        ui: {
            type: "custom",
            name: "default",
            data: "ui_extIntroduction_Terms"
        },
        location: {
            page: "general",
            category: "introduction",
            noindex: true,
        },
        value: {
            buttons: {
                reset: false,
                favorite: false,
            },
        },
    },

    {
        id: "extIntroduction_Support",
        title: "サポート",
        ui: {
            type: "custom",
            name: "default",
            data: "ui_extIntroduction_Support"
        },
        location: {
            page: "general",
            category: "introduction",
            noindex: true,
        },
        value: {
            buttons: {
                reset: false,
                favorite: false,
            },
        },
    },

    {
        id: "extIntroduction_License",
        title: "ライセンス",
        ui: {
            type: "custom",
            name: "default",
            data: "ui_extIntroduction_License",
            noindex: true,
        },
        location: {
            page: "general",
            category: "introduction",
            noindex: true,
        },
        value: {
            buttons: {
                reset: false,
                favorite: false,
            },
        },
    },


    /* 基本設定 (config) */
    {
        id: "extPopupDefaultPageSelector",
        title: "デフォルトページ（ポップアップ時）",
        description: {
            text: "拡張機能のアイコンをクリックしたときに、一番最初に表示するページを設定します。",
            keywords: ["でふぉるとぺーじ（ぽっぷあっぷじ）", "環境設定", "基本設定", "ページ", "拡張機能", "ポップアップ"],
        },
        ui: {
            type: "custom",
            name: "default",
            data: "ui_extPopupDefaultPage_Dropdown",
            action: general_popupDefaultPage_Dropdown,
        },
        location: {
            page: "general",
            category: "config"
        },
        value: {
            buttons: {
                reset: true,
                favorite: true,
            },
            related: ["extPopupDefaultPage"],
        }
    },

    {
        id: "extOptionPageButtons",
        title: "オプションページのボタン",
        description: {
            text: "オプションページに表示される各種ボタン類の表示を切り替えます。",
            attention: "画面上に表示するかどうかの設定です。機能がオフになるわけではありません。",
            keywords: ["おぷしょんぺーじのぼたん", "環境設定", "お気に入り", "リセット", "オプションページ", "基本設定"],
        },
        location: {
            page: "general",
            category: "config",
        },
        ui: {
            type: "toggle",
            name: "default",
        },
        value: {
            buttons: {
                reset: true,
                favorite: true,
            },
            related: ["extOptionPageButtons"],
        }
    },

    {
        id: "extNotifications",
        title: "通知",
        description: {
            text: "拡張機能からの通知を許可します。",
            small: "例えば、拡張機能がアップデートされたときに通知が来るようになります。",
            keywords: ["つうち", "環境設定", "通知", "基本設定", "拡張機能"],
        },
        ui: {
            type: "toggle",
            name: "default",
        },
        location: {
            page: "general",
            category: "config"
        },
        value: {
            buttons: {
                reset: true,
                favorite: true,
            },
            related: ["extNotifications"],
        }
    },

    {
        id: "extAdvancedSettings",
        title: "高度な設定",
        description: {
            text: "上級者向けの設定項目を表示します。通常では不要です。",
            keywords: ["高度", "こうどなせってい", "環境設定", "上級者", "基本設定"],
        },
        ui: {
            type: "toggle",
            name: "default",
        },
        location: {
            page: "general",
            category: "config"
        },
        value: {
            buttons: {
                reset: true,
                favorite: true,
            },
            related: ["extAdvancedSettings"],
        }
    },

    {
        id: "extExperimentalFeatures",
        title: "実験中の機能",
        description: {
            text: "テスト中の機能を有効化します。",
            attention: "不具合が発生する可能性があります。ご注意ください。",
            keywords: ["高度", "じっけんちゅうのきのう", "環境設定", "上級者", "実験", "テスト", "基本設定"],
        },
        location: {
            page: "general",
            category: "config",
        },
        ui: {
            type: "toggle",
            name: "default",
        },
        value: {
            buttons: {
                reset: true,
                favorite: true,
            },
            related: ["extExperimentalFeatures"],
        }
    },

    {
        id: "extDebug",
        title: "デバッグ機能",
        description: {
            text: "デバッグ機能を有効化します。",
            small: "[Ctrl + Alt + O]",
            attention: "開発者向けの機能です。不具合が発生する可能性がありますのでご注意ください。",
            keywords: ["高度", "でばっぐきのう", "環境設定", "上級者", "でばっぐ", "実験", "テスト", "基本設定", "開発", "開発者向け", "デバッグ"],
        },
        location: {
            page: "general",
            category: "config",
            noindex: true,
        },
        ui: {
            type: "toggle",
            name: "default",
        },
        value: {
            buttons: {
                reset: true,
                favorite: true,
            },
            related: ["extDebug"],
        }
    },

    /* データ (data) */
    {
        id: "extExportOption",
        title: "設定をエクスポート",
        description: {
            text: "保存されている設定データをJSON形式で出力します。",
            keywords: ["エクスポート", "せっていをえくすぽーと", "設定データ", "JSON"],
        },
        ui: {
            type: "custom",
            name: "default",
            data: "ui_extExportButton",
            action: general_exportOptionData,
        },
        location: {
            page: "general",
            category: "data",
        },
        value: {
            buttons: {
                reset: false,
                favorite: true,
            },
        },
    },

    {
        id: "extImportOption",
        title: "設定をインポート",
        description: {
            text: "外部からJSON形式の設定データを読み込みます。",
            attention: "スキンを含む、既存のデータが全て上書きされます。この操作は元に戻せません。",
            keywords: ["インポート", "せっていをいんぽーと", "設定データ", "JSON"],
        },
        ui: {
            type: "custom",
            name: "default",
            data: "ui_extImportButton",
            action: general_importOptionData,
        },
        location: {
            page: "general",
            category: "data",
        },
        value: {
            buttons: {
                reset: false,
                favorite: true,
            },
        },
    },

    {
        id: "extResetOption",
        title: "設定をリセット",
        description: {
            text: "保存されている設定データをすべて初期値に戻します。",
            attention: "スキンを含む、保存されているデータが全てリセットされます。この操作は元に戻せません。",
            keywords: ["リセット", "せっていをりせっと", "設定データ"],
        },
        ui: {
            type: "custom",
            name: "default",
            data: "ui_extResetButton",
            action: general_removeOptionData,
        },
        location: {
            page: "general",
            category: "data",
        },
        value: {
            buttons: {
                reset: false,
                favorite: true,
            },
        },
    },

    {
        id: "extFixOption",
        title: "設定を修復",
        description: {
            text: "バージョンアップなどにより残された不要な設定データを削除し、修復します。通常、データは削除されません。",
            keywords: ["せっていをしゅうふく", "設定データ", "リセット"],
        },
        ui: {
            type: "custom",
            name: "default",
            data: "ui_extFixButton",
            action: general_fixOptionData,
        },
        location: {
            page: "general",
            category: "data",
        },
        value: {
            buttons: {
                reset: false,
                favorite: true,
            },
            isAdvanced: true,
        },
    },

    /* パッチノート (version) */
    {
        id: "extPatchnotes",
        title: "パッチノート",
        ui: {
            type: "custom",
            name: "wide",
            data: "ui_extVersion_Patchnotes"
        },
        location: {
            page: "general",
            category: "version",
            noindex: true,
        },
        value: {
            buttons: {
                reset: false,
                favorite: false,
            },
        },
    },

    /* デバッグモード */
    {
        id: "extDebug_ShowOption",
        title: "設定データを閲覧",
        description: {
            text: "保存されている設定データを文字列で表示します。",
            small: "（local/sync/sessionのデータを表示しています）",
            keywords: ["せっていでーたをえつらん", "設定データ", "local", "sync", "session", "JSON"],
        },
        ui: {
            type: "custom",
            name: "default",
            data: "ui_extDebug_OptionList",
            action: general_exportOptionText,
        },
        location: {
            page: "general",
            category: "debug",
            noindex: true,
        },
        value: {
            buttons: {
                reset: false,
                favorite: true,
            },
            isDebug: true,
        }
    },

    {
        id: "extDebug_InsertOption",
        title: "設定データを変更",
        description: {
            text: "設定データを書き換えます。",
            keywords: ["せっていでーたをへんこう", "設定データ", "local", "sync", "session"],
        },
        ui: {
            type: "custom",
            name: "default",
            data: "ui_extDebug_InsertOptionForm",
            action: general_insertOptionData
        },
        location: {
            page: "general",
            category: "debug",
            noindex: true,
        },
        value: {
            buttons: {
                reset: false,
                favorite: true,
            },
            isDebug: true,
        }
    },

    {
        id: "extDebug_MonitorOption",
        title: "設定データの変更を監視",
        description: {
            text: "設定データの変更を監視します。",
            keywords: ["せっていでーたのへんこうをかんし", "設定データ", "local", "sync", "session"],
        },
        ui: {
            type: "custom",
            name: "default",
            data: "ui_extDebug_OptionMonitor",
            action: general_monitorOptionChanged,
        },
        location: {
            page: "general",
            category: "debug",
            noindex: true,
        },
        value: {
            buttons: {
                reset: false,
                favorite: true,
            },
            isDebug: true,
        }
    },
]
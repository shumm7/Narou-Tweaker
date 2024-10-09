import { defaultOption } from "/utils/option.js";
import { customUIList } from "./customUI.js";
import { getOptionCategory, getOptionFromId, getOptionPageFromId } from "./optionLib.js";

export const optionCategoryList = [
    {
        title: "検索",
        description: "設定項目を絞り込み検索することができます。",
        id: "search",
        defaultCategory: "general",
        categories: [
            {
                title: "検索",
                id: "general",
            },
        ],
        tabs: false,
        sidebar: false,
        noindex: true,
    },
    {
        title: "全般",
        description: "Narou Tweaker全体の設定を変更することが出来ます。",
        id: "general",
        icon: "fa-solid fa-gear",
        defaultCategory: "introduction",
        categories: [
            {
                title: "デバッグ",
                id: "debug",
                description: {
                    attention: "【デバッグモード】開発者向けの機能です。不具合が発生する可能性がありますのでご注意ください。"
                }
            },
            {
                title: "Narou Tweaker",
                id: "introduction",
            },
            {
                title: "基本設定",
                id: "config",
                description: {
                    text: "Narou Tweaker全体に影響する設定を変更します。"
                }
            },
            {
                title: "設定データ",
                id: "data",
                description: {
                    text: "Narou Tweakerの設定データを変更します。",
                    attention: "すべての設定がリセットされる場合があります。操作にはご注意ください。"
                }
            },
            {
                title: "パッチノート",
                id: "version",
            }
        ]
    },
    {
        title: "小説家になろう",
        description: "小説家になろうの表示を設定することが出来ます。",
        id: "narou",
        icon: "fa-solid fa-house",
        targetUrl: ["*.syosetu.com", "eparet.net"],
        defaultCategory: "general",
        categories: [
            {
                title: "全般",
                id: "general",
                description: {
                    text: "小説家になろうの全般に影響する設定を変更します。"
                }
            },
        ]
    },
    {
        title: "小説ページ",
        description: "小説本文やその関連ページの設定を変更することが出来ます。",
        id: "novel",
        icon: "fa-solid fa-book",
        targetUrl: ["ncode.syosetu.com", "novelcom.syosetu.com", "novel18.syosetu.com", "novelcom18.syosetu.com"],
        defaultCategory: "general",
        categories: [
            {
                title: "全般",
                id: "general",
                description: {
                    text: "小説ページ全体に影響する設定を変更します。"
                }
            },
            {
                title: "本文",
                id: "novel",
                description: {
                    text: "本文ページに影響する設定を変更します。"
                }
            },
            {
                title: "スキン",
                id: "style",
                description: {
                    text: "ページの外観を変更します。",
                    small: "これらの設定は、小説ページ内から直接変更できます。",
                }
            },
            {
                title: "書体",
                id: "font",
                description: {
                    text: "フォントや行間などの文章レイアウトを変更します。",
                    small: "これらの設定は、小説ページ内から直接変更できます。",
                }
            },
            {
                title: "文章校正",
                id: "correction",
                description: {
                    text: "小説本文を指定した方法で校正します。",
                    small: "これらの設定は、小説ページ内から直接変更できます。",
                }
            },
        ]
    },
    {
        title: "小説を読もう！",
        description: "ランキングや検索ページの表示を設定することが出来ます。",
        id: "yomou",
        icon: "fa-solid fa-crown",
        targetUrl: ["yomou.syosetu.com", "noc.syosetu.com", "mnlt.syosetu.com", "mid.syosetu.com"],
        defaultCategory: "rank",
        categories: [
            {
                title: "ランキング",
                id: "rank",
                description: {
                    text: "ランキング全般の設定を変更します。"
                }
            },
            {
                title: "ランキング（トップ）",
                id: "ranktop",
                description: {
                    text: "ランキングのトップページの設定を変更します。"
                }
            },
        ]
    },
    {
        title: "ユーザページ",
        description: "ユーザページの表示を設定することが出来ます。",
        id: "workspace",
        icon: "fa-solid fa-pen-nib",
        targetUrl: ["syosetu.com"],
        defaultCategory: "general",
        categories: [
            {
                title: "全般",
                id: "general",
                description: {
                    text: "ユーザページの全体に影響する設定を変更します。"
                }
            },
            {
                title: "小説管理",
                id: "manage",
                description: {
                    text: "小説の管理画面を変更します。"
                }
            },
            {
                title: "エディタ",
                id: "editor",
                description: {
                    text: "小説の編集画面を変更します。"
                }
            },
            {
                title: "お気に入り",
                id: "favorite",
                description: {
                    text: "ブックマークやお気に入りユーザの設定を変更します。"
                }
            },
            {
                title: "リアクション",
                id: "reaction",
                description: {
                    text: "感想やレビューなどの設定を変更します。"
                }
            },
        ]
    },
    {
        title: "マイページ",
        description: "マイページの表示を設定することが出来ます。",
        id: "mypage",
        icon: "fa-solid fa-user",
        targetUrl: ["mypage.syosetu.com", "xmypage.syosetu.com"],
        defaultCategory: "general",
        categories: [
            {
                title: "全般",
                id: "general",
                description: {
                    text: "マイページの全体に影響する設定を変更します。"
                }
            },
            {
                title: "活動報告",
                id: "blog",
                description: {
                    text: "活動報告の設定を変更します。"
                }
            },
            {
                title: "プロフィール",
                id: "profile",
                description: {
                    text: "プロフィールの設定を変更します。"
                }
            },
        ]
    },
    {
        title: "みてみん",
        description: "みてみん・えぱれっとの表示を設定することが出来ます。",
        id: "mitemin",
        icon: "fa-solid fa-palette",
        targetUrl: ["mitemin.net", "eparet.net"],
        defaultCategory: "general",
        categories: [
            {
                title: "全般",
                id: "general",
                description: {
                    text: "みてみん全体に影響する設定を変更します。"
                }
            },
        ]
    },
    {
        title: "アクセス解析",
        description: "KASASAGI（アクセス解析ページ）の表示を設定することが出来ます。",
        id: "kasasagi",
        icon: "fa-solid fa-chart-line",
        targetUrl: ["kasasagi.hinaproject.com"],
        defaultCategory: "general",
        categories: [
            {
                title: "全般",
                id: "general",
                description: {
                    text: "KASASAGIの全体に影響する設定を変更します。"
                }
            },
            {
                title: "総合PV",
                id: "pageview",
                description: {
                    text: "総合PVの設定を変更します。"
                }
            },
            {
                title: "エピソード別",
                id: "episode",
                description: {
                    text: "エピソード別ユニークの設定を変更します。"
                }
            },
            {
                title: "日別",
                id: "day",
                description: {
                    text: "日別PV・ユニークの設定を変更します。"
                }
            },
            {
                title: "月別",
                id: "month",
                description: {
                    text: "月別PV・ユニークの設定を変更します。"
                }
            },
        ]
    }
]

export const optionList = [
    /* 検索 */
    {
        id: "extSearch",
        title: "検索",
        description: {
            text: "キーワードを入力してください",
            small: "・スペース区切りでAND検索ができます。<br>・「\"◯◯\"」と括ると完全一致する語句を検索します。<br>・「-◯◯」で特定の語句を除外します。"
        },
        ui: {
            type: "custom",
            name: "default",
            data: "ui_extSearchBox"
        },
        location: {
            page: "search",
            category: "general",
            noindex: true,
        },
        value: {
            hasValue: false,
        },
    },

    /* 全般 */
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
            hasValue: false,
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
            hasValue: false,
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
            hasValue: false,
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
            hasValue: false,
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
            hasValue: false,
        },
    },


    /* 基本設定 (config) */
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
            hasValue: true,
            default: defaultOption.extAdvancedSettings,
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
            hasValue: true,
            default: defaultOption.extExperimentalFeatures,
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
            hasValue: true,
            default: defaultOption.extDebug,
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
            data: "ui_extExportButton"
        },
        location: {
            page: "general",
            category: "data",
        },
        value: {
            hasValue: false,
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
            data: "ui_extImportButton"
        },
        location: {
            page: "general",
            category: "data",
        },
        value: {
            hasValue: false,
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
            data: "ui_extResetButton"
        },
        location: {
            page: "general",
            category: "data",
        },
        value: {
            hasValue: false,
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
            data: "ui_extFixButton"
        },
        location: {
            page: "general",
            category: "data",
        },
        value: {
            hasValue: false,
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
            hasValue: false,
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
        },
        location: {
            page: "general",
            category: "debug",
            noindex: true,
        },
        value: {
            hasValue: false,
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
        },
        location: {
            page: "general",
            category: "debug",
            noindex: true,
        },
        value: {
            hasValue: false,
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
        },
        location: {
            page: "general",
            category: "debug",
            noindex: true,
        },
        value: {
            hasValue: false,
            isDebug: true,
        }
    },

    /* 小説家になろう */
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
            default: defaultOption.narouSyuppanShowBookImage,
            hasValue: true,
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
            default: defaultOption.narouSyuppanShowBookViewImage,
            hasValue: true,
        }
    },
    /*
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
            default: defaultOption.narouSkipAgeauth,
            hasValue: true,
            isExperimental: true,
        }
    },
    */

    /* 小説ページ */
    /* 全般 (general) */
    {
        id: "novelCustomStyle",
        title: "デザインを調整（推奨）",
        description: {
            text: "全体的なページのデザインを調整します。",
            keywords: ["でざいんをちょうせい", "レイアウト", "デザイン", "外観"],
        },
        ui: {
            type: "toggle",
            name: "default",
        },
        location: {
            page: "novel",
            category: "general",
        },
        value: {
            default: defaultOption.novelCustomStyle,
            hasValue: true,
        }
    },

    {
        id: "novelCustomHeaderType",
        title: "ヘッダのデザイン",
        description: {
            text: "小説ページに表示されるヘッダのデザインを変更します。",
            keywords: ["へっだのでざいん", "レイアウト", "デザイン", "外観", "ヘッダ", "シンプルなヘッダ"],
        },
        ui: {
            type: "dropdown",
            name: "default",
            data: [
                {value: "0", title: "オフ（小説家になろう標準）"},
                {value: "1", title: "ベーシック"},
                {value: "2", title: "ミニマル（推奨）"},
            ]
        },
        location: {
            page: "novel",
            category: "general",
        },
        value: {
            default: defaultOption.novelCustomHeaderType,
            hasValue: true,
        }
    },

    {
        id: "novelCustomHeaderScrollMode",
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
            ],
        },
        location: {
            page: "novel",
            category: "general",
        },
        value: {
            default: defaultOption.novelCustomHeaderScrollMode,
            hasValue: true,
            requirement: {
                dataFor: ["novelCustomHeaderType", "novelCustomHeaderType"],
                data: ["1", "2"],
                mode: "show"
            },
        }
    },

    {
        id: "novelCustomHeaderScrollHidden",
        title: "ページ読み込み時にヘッダを隠す",
        description: {
            text: "オンの場合、ページ読み込み時にヘッダを隠します。",
            small: "（ヘッダの追従モードが「スクロール」でのみ有効）",
            keywords: ["ぺーじよみこみじにへっだをかくす", "追従モード"],
        },
        ui: {
            type: "toggle",
            name: "default",
        },
        location: {
            page: "novel",
            category: "general",
        },
        value: {
            default: defaultOption.novelCustomHeaderScrollHidden,
            hasValue: true,
            requirement: {
                dataFor: ["novelCustomHeaderScrollMode"],
                data: "scroll",
                mode: "show"
            },
            isAdvanced: true,
        },
    },

    {
        id: "novelCustomHeaderData",
        title: "ヘッダのアイテム配置",
        description: {
            text: "ヘッダに表示するアイテムを指定します。",
            small: "（ドラッグ＆ドロップで入れ替え）",
            keywords: ["へっだのあいてむはいち", "ヘッダ", "レイアウト", "外観"],
        },
        ui: {
            type: "custom",
            name: "default",
            data: "ui_novelCustomHeaderDraggable",
        },
        location: {
            page: "novel",
            category: "general",
        },
        value: {
            hasValue: false,
            related: ["novelCustomHeaderLeft", "novelCustomHeaderRight"],
            requirement: {
                dataFor: ["novelCustomHeaderType", "novelCustomHeaderType"],
                data: ["1", "2"],
                mode: "show"
            },
        }
    },

    {
        id: "parent_novelCustomHeaderOption",
        title: "ヘッダの詳細設定",
        ui: {
            type: "parent",
            name: "column",
        },
        location: {
            page: "novel",
            category: "general",
            noindex: true,
        },
        value: {
            hasValue: false,
            isAdvanced: true,
            requirement: {
                dataFor: ["novelCustomHeaderType", "novelCustomHeaderType"],
                data: ["1", "2"],
                mode: "show"
            },
        }
    },

    {
        id: "novelCustomHeaderShowEnactiveItems",
        title: "使用できないアイコンを表示",
        description: {
            text: "オンの場合、使用できないアイコンを暗転して表示します。",
            keywords: ["しようできないあいこんをひょうじ", "ヘッダの詳細設定"],
        },
        ui: {
            type: "toggle",
            name: "default",
        },
        location: {
            page: "novel",
            category: "general",
            hasParent: true,
            parent: "parent_novelCustomHeaderOption"
        },
        value: {
            default: defaultOption.novelCustomHeaderShowEnactiveItems,
            hasValue: true,
            isAdvanced: true,
            requirement: {
                dataFor: ["novelCustomHeaderType", "novelCustomHeaderType"],
                data: ["1", "2"],
                mode: "show"
            },
        },
    },

    {
        id: "novelCustomHeaderSocialShowsBrandName",
        title: "SNSアイコンをブランド名で表記する",
        description: {
            text: "SNSアイコンの表示テキストの設定を変更します。",
            small: "オン：「Facebook」などのブランド名を表示します。<br>オフ：「シェア」などのアクション名を表示します。",
            keywords: ["SNSあいこんをぶらんどめいでひょうきする", "ヘッダの詳細設定"],
        },
        ui: {
            type: "toggle",
            name: "default",
        },
        location: {
            page: "novel",
            category: "general",
            hasParent: true,
            parent: "parent_novelCustomHeaderOption"
        },
        value: {
            default: defaultOption.novelCustomHeaderSocialShowsBrandName,
            hasValue: true,
            isAdvanced: true,
            requirement: {
                dataFor: ["novelCustomHeaderType", "novelCustomHeaderType"],
                data: ["1", "2"],
                mode: "show"
            },
        },
    },

    {
        id: "novelCustomHeaderQRCodeCurrentLocation",
        title: "QRコードのURLを現在のページに設定",
        description: {
            text: "QRコードアイコンのURL設定を変更します。",
            small: "オン：現在表示しているページのURL<br>オフ：作品の目次/本文のURL",
            keywords: ["QRこーどのURLをげんざいのぺーじにせってい", "ヘッダの詳細設定", "QRコード"],
        },
        ui: {
            type: "toggle",
            name: "default",
        },
        location: {
            page: "novel",
            category: "general",
            hasParent: true,
            parent: "parent_novelCustomHeaderOption"
        },
        value: {
            default: defaultOption.novelCustomHeaderQRCodeCurrentLocation,
            hasValue: true,
            isAdvanced: true,
            requirement: {
                dataFor: ["novelCustomHeaderType", "novelCustomHeaderType"],
                data: ["1", "2"],
                mode: "show"
            },
        },
    },

    {
        id: "novelCustomHeaderQRCodeShowURL",
        title: "QRコードのリンクをテキストで表示",
        description: {
            text: "QRコードアイコンでURLを別途テキストで表示します。",
            keywords: ["QRこーどのりんくをてきすとでひょうじ", "ヘッダの詳細設定", "QRコード"],
        },
        ui: {
            type: "toggle",
            name: "default",
        },
        location: {
            page: "novel",
            category: "general",
            hasParent: true,
            parent: "parent_novelCustomHeaderOption"
        },
        value: {
            default: defaultOption.novelCustomHeaderQRCodeShowURL,
            hasValue: true,
            isAdvanced: true,
            requirement: {
                dataFor: ["novelCustomHeaderType", "novelCustomHeaderType"],
                data: ["1", "2"],
                mode: "show"
            },
        },
    },
    
    /* 本文 (novel) */
    {
        id: "novelShowAllExtext",
        title: "あらすじを全て表示",
        description: {
            text: "作品のあらすじの隠れている部分を自動的に表示する。",
            keywords: ["あらすじをすべてひょうじ", "あらすじ"],
        },
        ui: {
            type: "toggle",
            name: "default",
        },
        location: {
            page: "novel",
            category: "novel",
        },
        value: {
            default: defaultOption.novelShowAllExtext,
            hasValue: true,
            isAdvanced: true,
        }
    },

    {
        id: "novelPrefaceAutoURL",
        title: "自動URL化（前書き）",
        description: {
            text: "前書きに含まれるURL文字列を、自動的にリンクに変換します。",
            keywords: ["じどうURLか", "前書き", "まえがき", "自動URL化"],
        },
        ui: {
            type: "toggle",
            name: "default",
        },
        location: {
            page: "novel",
            category: "novel",
        },
        value: {
            default: defaultOption.novelPrefaceAutoURL,
            hasValue: true,
        }
    },

    {
        id: "novelAfterwordAutoURL",
        title: "自動URL化（後書き）",
        description: {
            text: "後書きに含まれるURL文字列を、自動的にリンクに変換します。",
            keywords: ["じどうURLか", "後書き", "あとがき", "自動URL化"],
        },
        ui: {
            type: "toggle",
            name: "default",
        },
        location: {
            page: "novel",
            category: "novel",
        },
        value: {
            default: defaultOption.novelAfterwordAutoURL,
            hasValue: true,
        }
    },

    {
        id: "novelForceMypageLink",
        title: "作者のマイページへのリンクを強制",
        description: {
            text: "作者が別で作者名を設定していた場合でも、常にマイページへのリンクを表示します。",
            keywords: ["さくしゃのまいぺーじへのりんくをきょうせい", "マイページ", "作者名"],
        },
        ui: {
            type: "toggle",
            name: "default",
        },
        location: {
            page: "novel",
            category: "novel",
        },
        value: {
            default: defaultOption.novelForceMypageLink,
            hasValue: true,
        }
    },

    {
        id: "novelShowHistoryOnSublist",
        title: "目次ページに直近の閲覧履歴を表示",
        description: {
            text: "目次ページ上に、直近の閲覧したエピソードを表示します。",
            keywords: ["もくじぺーじにちょっきんのえつらんりれきをひょうじ", "履歴", "目次"],
        },
        ui: {
            type: "toggle",
            name: "default",
        },
        location: {
            page: "novel",
            category: "novel",
        },
        value: {
            default: defaultOption.novelShowHistoryOnSublist,
            hasValue: true,
        }
    },

    {
        id: "novelCursorHide",
        title: "一定時間経過後にマウスカーソルを非表示にする",
        description: {
            text: "マウスを動かさずに一定時間経過すると、マウスカーソルを非表示にします。",
            keywords: ["いっていじかんけいかごにまうすかーそるをひひょうじにする", "マウスカーソル"],
        },
        ui: {
            type: "toggle",
            name: "default",
        },
        location: {
            page: "novel",
            category: "novel",
        },
        value: {
            default: defaultOption.novelCursorHide,
            hasValue: true,
            isExperimental: true,
        }
    },

    {
        id: "novelCursorHideTimeout",
        title: "カーソル非表示までの時間",
        description: {
            text: "マウスカーソルを非表示にするまでの時間を秒で指定します。",
            keywords: ["かーそるひひょうじまでのじかん", "マウスカーソル"],
        },
        ui: {
            type: "input",
            name: "number",
        },
        location: {
            page: "novel",
            category: "novel",
        },
        value: {
            default: defaultOption.novelCursorHideTimeout,
            hasValue: true,
            isExperimental: true,
            requirement: {
                dataFor: ["novelCursorHide"],
                data: true,
                mode: "show"
            },
        },
    },

    {
        id: "novelAttentionBanner",
        title: "「作品に含まれる要素」をバナーで表示する",
        description: {
            text: "「作品に含まれる要素」をバナーで表示します。",
            keywords: ["「さくひんにふくまれるようそ」をばなーでひょうじする"],
        },
        ui: {
            type: "toggle",
            name: "default",
        },
        location: {
            page: "novel",
            category: "novel",
        },
        value: {
            default: defaultOption.novelAttentionBanner,
            hasValue: true,
            isExperimental: true,
        },
    },

    /* スキン (style) */
    {
        id: "novelSkin",
        title: "スキン",
        description: {
            text: "小説ページの外観を変更します。",
            keywords: ["すきん", "レイアウト", "デザイン", "外観", "スキン", "スキン設定", "CSS"],
        },
        ui: {
            type: "custom",
            name: "wide",
            data: "ui_novelSkinSelect",
        },
        location: {
            page: "novel",
            category: "style",
        },
        value: {
            hasValue: false,
            related: ["skins", "selectedSkin"],
        },
    },

    {
        id: "novelSkinExport",
        title: "スキンのエクスポート",
        description: {
            text: "現在、選択中のスキンをデータとして出力します。",
            keywords: ["すきんのえくすぽーと", "エクスポート", "スキン"],
        },
        ui: {
            type: "custom",
            name: "default",
            data: "ui_novelSkinExportButtons",
        },
        location: {
            page: "novel",
            category: "style",
        },
        value: {
            hasValue: false,
            isAdvanced: true,
        },
    },

    {
        id: "novelSkinImport",
        title: "スキンのインポート",
        description: {
            text: "外部からスキンを取り込むことができます。",
            keywords: ["すきんのいんぽーと", "インポート", "スキン"],
        },
        ui: {
            type: "custom",
            name: "default",
            data: "ui_novelSkinImportButtons",
        },
        location: {
            page: "novel",
            category: "style",
        },
        value: {
            hasValue: false,
            isAdvanced: true,
        },
    },

    {
        id: "novelCustomCSS",
        title: "追加CSS",
        description: {
            text: "任意のCSSをページに追加することができます。<br>このスタイルは、スキンよりも後に読み込まれます。",
            keywords: ["ついかCSS", "追加CSS", "スキン"],
        },
        ui: {
            type: "textarea",
            name: "syntax-highlight",
            data: "css"
        },
        location: {
            page: "novel",
            category: "style",
        },
        value: {
            default: defaultOption.novelCustomCSS,
            hasValue: true,
            isAdvanced: true,
        },
    },

    {
        id: "novelAuthorCustomSkin",
        title: "作者スキン",
        description: {
            text: "専用バナーが小説の「ランキングタグ」に配置されている場合、作者が設定したスキンが反映されます。",
            keywords: ["さくしゃすきん", "作者スキン", "作者", "CSS"],
        },
        ui: {
            type: "toggle",
            name: "default",
        },
        location: {
            page: "novel",
            category: "style",
        },
        value: {
            default: defaultOption.novelAuthorCustomSkin,
            hasValue: true,
        },
    },

    {
        id: "novelAuthorCustomSkinWarning",
        title: "作者スキンの警告文を表示",
        description: {
            text: "作者スキンが適用されていることを示す警告文を、ページ上部に表示します。",
            keywords: ["さくしゃすきんのけいこくぶんをひょうじ", "作者スキン", "作者"],
        },
        ui: {
            type: "toggle",
            name: "default",
        },
        location: {
            page: "novel",
            category: "style",
        },
        value: {
            default: defaultOption.novelAuthorCustomSkinWarning,
            hasValue: true,
            requirement: {
                dataFor: ["novelAuthorCustomSkin"],
                data: true,
                mode: "show"
            },
            isAdvanced: true,
        },
    },

    {
        id: "novelGenerateAuthorCustomSkin",
        title: "作者スキンバナーを作成",
        description: {
            text: "現在選択中のスキンから、作者設定スキンバナーを生成します。",
            keywords: ["さくしゃすきんばなーをさくせい", "作者スキン", "作者"],
        },
        ui: {
            type: "custom",
            name: "default",
            data: "ui_novelAuthorCustomSkinGenerator",
        },
        location: {
            page: "novel",
            category: "style",
        },
        value: {
            hasValue: false,
            requirement: {
                dataFor: ["novelAuthorCustomSkin"],
                data: true,
                mode: "show"
            },
            isAdvanced: true,
        },
    },


    /* 書体 (font) */
    {
        id: "novelFont",
        title: "フォント",
        description: {
            text: "小説ページの書体やレイアウトを変更します。",
            keywords: ["ふぉんと", "レイアウト", "デザイン", "外観", "フォント", "フォント設定", "CSS", "書体"],
        },
        ui: {
            type: "custom",
            name: "wide",
            data: "ui_novelFontSelect",
        },
        location: {
            page: "novel",
            category: "font",
        },
        value: {
            hasValue: false,
            related: ["fontFontFamilyList", "fontSelectedFontFamily"],
        },
    },

    {
        id: "novelVertical",
        title: "縦書き",
        description: {
            text: "本文を縦書きで表示します。",
            attention: "設定の反映には、ページの再読み込みが必要です。",
            keywords: ["たてがき", "レイアウト", "外観", "フォント", "縦書き", "書体"],
        },
        ui: {
            type: "toggle",
            name: "default",
        },
        location: {
            page: "novel",
            category: "font",
        },
        value: {
            default: defaultOption.novelVertical,
            hasValue: true,
        },
    },

    {
        id: "novelFontSize",
        title: "文字サイズ",
        description: {
            hidden: "小説ページの文字サイズを変更します。",
            keywords: ["もじさいず", "レイアウト", "外観", "フォント", "大きさ"],
        },
        ui: {
            type: "custom",
            name: "default",
            data: "ui_novelFontSizeInput",
        },
        location: {
            page: "novel",
            category: "font",
        },
        value: {
            hasValue: false,
            related: ["fontFontSize"],
        },
    },

    {
        id: "novelFontLineHeight",
        title: "行間",
        description: {
            hidden: "小説ページの行間幅を変更します。",
            keywords: ["ぎょうかん", "レイアウト", "外観", "フォント", "行間", "幅"],
        },
        ui: {
            type: "custom",
            name: "default",
            data: "ui_novelFontLineHeightInput",
        },
        location: {
            page: "novel",
            category: "font",
        },
        value: {
            hasValue: false,
            related: ["fontLineHeight"],
        },
    },

    {
        id: "novelFontWidth",
        title: "横幅",
        description: {
            hidden: "小説ページの横幅を変更します。",
            keywords: ["よこはば", "レイアウト", "外観", "フォント", "横幅", "幅"],
        },
        ui: {
            type: "custom",
            name: "default",
            data: "ui_novelFontWidthInput",
        },
        location: {
            page: "novel",
            category: "font",
        },
        value: {
            hasValue: false,
            related: ["fontWidth"],
        },
    },

    {
        id: "fontTextRendering",
        title: "fontTextRendering",
        description: {
            keywords: [],
        },
        ui: {
            type: "input",
            name: "text",
        },
        location: {
            page: "novel",
            category: "font",
            noindex: true,
            hide: true,
        },
        value: {
            hasValue: true,
        },
    },

    /* 文章校正 (correction) */
    {
        id: "parent_correctionGrammer",
        title: "文法",
        ui: {
            type: "parent",
            name: "column",
        },
        location: {
            page: "novel",
            category: "correction",
            noindex: true,
        },
        value: {
            hasValue: false,
        }
    },

    {
        id: "parent_correctionSymbol",
        title: "記号",
        ui: {
            type: "parent",
            name: "column",
        },
        location: {
            page: "novel",
            category: "correction",
            noindex: true,
        },
        value: {
            hasValue: false,
        }
    },

    {
        id: "parent_correctionLocalize",
        title: "ローカライズ",
        ui: {
            type: "parent",
            name: "column",
        },
        location: {
            page: "novel",
            category: "correction",
            noindex: true,
        },
        value: {
            hasValue: false,
            isAdvanced: true,
        }
    },

    {
        id: "parent_correctionVertical",
        title: "文字の向き（縦書きのみ）",
        description: {
            text: "縦書き時に一部の文字列を回転して表示します。"
        },
        ui: {
            type: "parent",
            name: "column",
        },
        location: {
            page: "novel",
            category: "correction",
            noindex: true,
        },
        value: {
            hasValue: false,
            requirement: {
                dataFor: ["novelVertical"],
                data: true,
                mode: "show"
            },
            isAdvanced: true,
        },
    },

    {
        id: "parent_correctionMisc",
        title: "その他",
        ui: {
            type: "parent",
            name: "column",
        },
        location: {
            page: "novel",
            category: "correction",
            noindex: true,
        },
        value: {
            hasValue: false,
        }
    },

    {
        id: "correctionIndent",
        title: "段落下げ",
        description: {
            text: "地の文の行頭に全角スペースを1つ追加します。",
            keywords: ["だんらくさげ", "文法", "文章校正", "段落"],
        },
        ui: {
            type: "toggle",
            name: "default",
        },
        location: {
            page: "novel",
            category: "correction",
            hasParent: true,
            parent: "parent_correctionGrammer"
        },
        value: {
            default: defaultOption.correctionIndent,
            hasValue: true,
        },
    },

    {
        id: "correctionNormalizeEllipses",
        title: "三点リーダー",
        description: {
            text: "中点やピリオドなどでできた三点リーダーを修正します。",
            small: "「・・・」「...」→「…………」",
            keywords: ["さんてんりーだー", "記号", "文章校正", "三点リーダー"],
        },
        ui: {
            type: "toggle",
            name: "default",
        },
        location: {
            page: "novel",
            category: "correction",
            hasParent: true,
            parent: "parent_correctionSymbol"
        },
        value: {
            default: defaultOption.correctionNormalizeEllipses,
            hasValue: true,
        },
    },

    {
        id: "correctionNormalizeDash",
        title: "ダッシュ",
        description: {
            text: "罫線・ハイフンなどでできたダッシュを全角ダッシュへ変換します。",
            small: "「──」→「――」",
            keywords: ["だっしゅ", "記号", "文章校正", "ダッシュ"],
        },
        ui: {
            type: "toggle",
            name: "default",
        },
        location: {
            page: "novel",
            category: "correction",
            hasParent: true,
            parent: "parent_correctionSymbol"
        },
        value: {
            default: defaultOption.correctionNormalizeDash,
            hasValue: true,
        },
    },

    {
        id: "correctionNormalizeExclamation",
        title: "感嘆符",
        description: {
            text: "感嘆符を個数に応じて適切なものに変換します。",
            small: "「！？」→「⁉️」 「！！！」→「!!!」",
            keywords: ["かんたんふ", "記号", "文章校正", "感嘆符", "クエスチョン", "エクスクラメーション"],
        },
        ui: {
            type: "toggle",
            name: "default",
        },
        location: {
            page: "novel",
            category: "correction",
            hasParent: true,
            parent: "parent_correctionSymbol"
        },
        value: {
            default: defaultOption.correctionNormalizeExclamation,
            hasValue: true,
        },
    },

    {
        id: "correctionRepeatedSymbols",
        title: "連続する句読点",
        description: {
            text: "連続で現れる句読点を1つに修正します。",
            small: "「、、、」→「、」",
            keywords: ["れんぞくするくとうてん", "記号", "文章校正", "句読点"],
        },
        ui: {
            type: "toggle",
            name: "default",
        },
        location: {
            page: "novel",
            category: "correction",
            hasParent: true,
            parent: "parent_correctionSymbol"
        },
        value: {
            default: defaultOption.correctionRepeatedSymbols,
            hasValue: true,
        },
    },

    {
        id: "correctionPeriodWithBrackets",
        title: "括弧の後の句点",
        description: {
            text: "括弧の後に現れる句点を削除します。",
            small: "「。』」→「』」",
            keywords: ["かっこのあとのくてん", "記号", "文章校正", "句読点", "カッコ", "括弧"],
        },
        ui: {
            type: "toggle",
            name: "default",
        },
        location: {
            page: "novel",
            category: "correction",
            hasParent: true,
            parent: "parent_correctionSymbol"
        },
        value: {
            default: defaultOption.correctionPeriodWithBrackets,
            hasValue: true,
        },
    },

    {
        id: "correctionNoSpaceExclamation",
        title: "後ろに空白の無い感嘆符",
        description: {
            text: "感嘆符の後ろに全角スペースを追加します。",
            small: "「！あ」→「！　あ」",
            keywords: ["うしろにくうはくのないかんたんふ", "記号", "文章校正", "感嘆符"],
        },
        ui: {
            type: "toggle",
            name: "default",
        },
        location: {
            page: "novel",
            category: "correction",
            hasParent: true,
            parent: "parent_correctionSymbol"
        },
        value: {
            default: defaultOption.correctionNoSpaceExclamation,
            hasValue: true,
        },
    },

    {
        id: "correctionOddEllipses",
        title: "奇数の三点リーダー",
        description: {
            text: "奇数個連続する三点リーダーを偶数個に修正します。",
            small: "「…」→「……」",
            keywords: ["きすうのさんてんりーだー", "記号", "文章校正", "三点リーダー"],
        },
        ui: {
            type: "toggle",
            name: "default",
        },
        location: {
            page: "novel",
            category: "correction",
            hasParent: true,
            parent: "parent_correctionSymbol"
        },
        value: {
            default: defaultOption.correctionOddEllipses,
            hasValue: true,
        },
    },

    {
        id: "correctionOddDash",
        title: "奇数のダッシュ",
        description: {
            text: "奇数個連続するダッシュを偶数個に修正します。",
            small: "「―」→「――」",
            keywords: ["きすうのだっしゅ", "記号", "文章校正", "ダッシュ"],
        },
        ui: {
            type: "toggle",
            name: "default",
        },
        location: {
            page: "novel",
            category: "correction",
            hasParent: true,
            parent: "parent_correctionSymbol"
        },
        value: {
            default: defaultOption.correctionOddDash,
            hasValue: true,
        },
    },

    {
        id: "correctionWaveDash",
        title: "波ダッシュを繋げる",
        description: {
            text: "連続する波ダッシュを繋げます。",
            small: "「～～」→「〰〰」",
            keywords: ["なみだっしゅをつなげる", "記号", "文章校正", "波ダッシュ"],
        },
        ui: {
            type: "toggle",
            name: "default",
        },
        location: {
            page: "novel",
            category: "correction",
            hasParent: true,
            parent: "parent_correctionSymbol"
        },
        value: {
            default: defaultOption.correctionWaveDash,
            hasValue: true,
        },
    },

    {
        id: "correctionNumber",
        title: "数値",
        description: {
            text: "数値の表記方法を変更します。",
            small: "※数値とは、「+-」の記号を含む半角/全角数字で構成された実数のことです。",
            keywords: ["すうち", "ローカライズ", "文章校正", "数値"],
        },
        ui: {
            type: "toggle",
            name: "default",
        },
        location: {
            page: "novel",
            category: "correction",
            hasParent: true,
            parent: "parent_correctionLocalize"
        },
        value: {
            default: defaultOption.correctionNumber,
            hasValue: true,
            isAdvanced: true,
        },
    },

    {
        id: "correctionNumberShort",
        title: "1文字の数値",
        description: {
            text: "1文字の数値の表示方法を設定します。",
            keywords: ["1もじのすうち", "ローカライズ", "文章校正", "数値"],
        },
        ui: {
            type: "dropdown",
            name: "default",
            data: [
                {value: "default", title: "そのまま"},
                {value: "half", title: "半角へ置換"},
                {value: "full", title: "全角へ置換"},
                {value: "kanji", title: "漢数字へ置換"},
            ]
        },
        location: {
            page: "novel",
            category: "correction",
            hasParent: true,
            parent: "parent_correctionLocalize"
        },
        value: {
            default: defaultOption.correctionNumberShort,
            hasValue: true,
            requirement: {
                dataFor: ["correctionNumber"],
                data: true,
                mode: "show"
            },
            isAdvanced: true,
        },
    },
    
    {
        id: "correctionNumberLong",
        title: "2文字以上の数値",
        description: {
            text: "2文字以上の数値の表示方法を設定します。",
            keywords: ["2もじのすうち", "ローカライズ", "文章校正", "数値"],
        },
        ui: {
            type: "dropdown",
            name: "default",
            data: [
                {value: "default", title: "そのまま"},
                {value: "half", title: "半角へ置換"},
                {value: "full", title: "全角へ置換"},
                {value: "kanji", title: "漢数字へ置換"},
            ]
        },
        location: {
            page: "novel",
            category: "correction",
            hasParent: true,
            parent: "parent_correctionLocalize"
        },
        value: {
            default: defaultOption.correctionNumberLong,
            hasValue: true,
            requirement: {
                dataFor: ["correctionNumber"],
                data: true,
                mode: "show"
            },
            isAdvanced: true,
        },
    },
    
    {
        id: "correctionNumberSymbol",
        title: "数値内の記号",
        description: {
            text: "数値内の記号の表示方法を設定します。",
            keywords: ["すうちないのきごう", "ローカライズ", "文章校正", "数値"],
        },
        ui: {
            type: "dropdown",
            name: "default",
            data: [
                {value: "default", title: "そのまま"},
                {value: "half", title: "半角へ置換"},
                {value: "full", title: "全角へ置換"},
                {value: "kanji", title: "カタカナへ置換"},
            ]
        },
        location: {
            page: "novel",
            category: "correction",
            hasParent: true,
            parent: "parent_correctionLocalize"
        },
        value: {
            default: defaultOption.correctionNumberSymbol,
            hasValue: true,
            requirement: {
                dataFor: ["correctionNumber"],
                data: true,
                mode: "show"
            },
            isAdvanced: true,
        },
    },

    {
        id: "correctionVerticalLayout_CombineWord",
        title: "半角単語（縦中横）",
        description: {
            text: "設定した桁数までの半角英数字を横方向に表示します。",
            small: "（0で無効）",
            keywords: ["はんかくたんご", "縦中横", "文字の向き", "文章校正", "縦書き"],
        },
        ui: {
            type: "input",
            name: "integer",
            data: {
                min: "0",
                max: "10",
            },
            suffix: "文字以下",
        },
        location: {
            page: "novel",
            category: "correction",
            hasParent: true,
            parent: "parent_correctionVertical",
        },
        value: {
            default: defaultOption.correctionVerticalLayout_CombineWord,
            hasValue: true,
            isAdvanced: true,
            requirement: {
                dataFor: ["novelVertical"],
                data: true,
                mode: "show"
            },
        },
    },

    {
        id: "correctionVerticalLayout_CombineNumber",
        title: "半角数字（縦中横）",
        description: {
            text: "設定した桁数までの半角数字を横方向に表示します。",
            small: "（0で無効）",
            keywords: ["はんかくすうじ", "縦中横", "文字の向き", "文章校正", "縦書き"],
        },
        ui: {
            type: "input",
            name: "integer",
            data: {
                min: "0",
                max: "10"
            },
            suffix: "文字以下"
        },
        location: {
            page: "novel",
            category: "correction",
            hasParent: true,
            parent: "parent_correctionVertical",
        },
        value: {
            default: defaultOption.correctionVerticalLayout_CombineNumber,
            hasValue: true,
            isAdvanced: true,
            requirement: {
                dataFor: ["novelVertical"],
                data: true,
                mode: "show"
            },
        },
    },

    {
        id: "correctionVerticalLayout_IgnoreCombineNumberInWord",
        title: "単語中の数字を無視する",
        description: {
            text: "数値の表記方法を変更します。",
            small: "前後に半角英字のある数字を、縦中横処理から無視します。",
            keywords: ["たんごちゅうのすうじをむしする", "縦中横", "文字の向き", "文章校正", "縦書き"],
        },
        ui: {
            type: "toggle",
            name: "default",
        },
        location: {
            page: "novel",
            category: "correction",
            hasParent: true,
            parent: "parent_correctionVertical",
        },
        value: {
            default: defaultOption.correctionVerticalLayout_IgnoreCombineNumberInWord,
            hasValue: true,
            /*
            requirement: {
                dataFor: ["correctionVerticalLayout_CombineNumber"],
                data: 0,
                mode: "hide"
            },
            */
            requirement: {
                dataFor: ["novelVertical"],
                data: true,
                mode: "show"
            },
            isAdvanced: true,
        },
    },

    {
        id: "correctionVerticalLayout_CombineExclamation",
        title: "半角感嘆符（縦中横）",
        description: {
            text: "設定した桁数までの半角感嘆符を横方向に表示します。",
            small: "（0で無効）",
            keywords: ["はんかくかんたんふ", "縦中横", "文字の向き", "文章校正", "縦書き"],
        },
        ui: {
            type: "input",
            name: "integer",
            data: {
                min: "0",
                max: "10",
            },
            suffix: "文字以下"
        },
        location: {
            page: "novel",
            category: "correction",
            hasParent: true,
            parent: "parent_correctionVertical",
        },
        value: {
            default: defaultOption.correctionVerticalLayout_CombineExclamation,
            hasValue: true,
            isAdvanced: true,
            requirement: {
                dataFor: ["novelVertical"],
                data: true,
                mode: "show"
            },
        },
    },

    {
        id: "correctionVerticalLayout_SidewayWord",
        title: "全角単語（横向き）",
        description: {
            text: "設定した桁数以上の全角英数字を縦方向に表示します。",
            small: "（0で無効）",
            keywords: ["ぜんかくたんご", "横向き", "文字の向き", "文章校正", "縦書き"],
        },
        ui: {
            type: "input",
            name: "integer",
            data: {
                min: "0",
                max: "20",
            },
            suffix: "文字以上"
        },
        location: {
            page: "novel",
            category: "correction",
            hasParent: true,
            parent: "parent_correctionVertical",
        },
        value: {
            default: defaultOption.correctionVerticalLayout_SidewayWord,
            hasValue: true,
            isAdvanced: true,
            requirement: {
                dataFor: ["novelVertical"],
                data: true,
                mode: "show"
            },
        },
    },

    {
        id: "correctionVerticalLayout_SidewayExclamation",
        title: "感嘆符（横向き）",
        description: {
            text: "設定した桁数以上の全角感嘆符を縦方向に表示します。",
            small: "（0で無効）",
            keywords: ["ぜんかくたんご", "横向き", "文字の向き", "文章校正", "縦書き"],
        },
        ui: {
            type: "input",
            name: "integer",
            data: {
                min: "0",
                max: "20",
            },
            suffix: "文字以上"
        },
        location: {
            page: "novel",
            category: "correction",
            hasParent: true,
            parent: "parent_correctionVertical",
        },
        value: {
            default: defaultOption.correctionVerticalLayout_SidewayExclamation,
            hasValue: true,
            isAdvanced: true,
            requirement: {
                dataFor: ["novelVertical"],
                data: true,
                mode: "show"
            },
        },
    },

    {
        id: "correctionShowIllustration",
        title: "挿絵を表示",
        description: {
            text: "挿絵を表示するかどうか選択します。",
            keywords: ["さしえをひょうじ", "挿絵", "文章校正"],
        },
        ui: {
            type: "toggle",
            name: "default",
        },
        location: {
            page: "novel",
            category: "correction",
            hasParent: true,
            parent: "parent_correctionMisc"
        },
        value: {
            default: defaultOption.correctionShowIllustration,
            hasValue: true,
        },
    },

    {
        id: "correctionRemoveIllustrationLink",
        title: "挿絵のリンクを無効化",
        description: {
            text: "挿絵に設定される「みてみん」へのリンクを無効化します。",
            keywords: ["さしえのりんくをむこうか", "挿絵", "文章校正"],
        },
        ui: {
            type: "toggle",
            name: "default",
        },
        location: {
            page: "novel",
            category: "correction",
            hasParent: true,
            parent: "parent_correctionMisc"
        },
        value: {
            default: defaultOption.correctionRemoveIllustrationLink,
            hasValue: true,
            requirement: {
                dataFor: ["correctionShowIllustration"],
                data: true,
                mode: "show"
            },
            isAdvanced: true,
        },
    },

    {
        id: "correctionReplacePattern",
        title: "置換",
        description: {
            text: "任意の文字列を置換します。 ",
            small: "・「＋」ボタンをクリックすると、置換パターンを追加します。追加されたパターンは上から順番に適用されます。<br>・「＊」アイコンをオンにすると正規表現が利用できます。<br>・「●」アイコンで置換の有効/無効を切り替えることができます。",
            keywords: ["ちかん", "置換", "置き換え", "文章校正", "正規表現"],
        },
        ui: {
            type: "custom",
            name: "wide",
            data: "ui_correctionReplacePatternList",
        },
        location: {
            page: "novel",
            category: "correction",
        },
        value: {
            hasValue: false,
        },
    },

    
    /* 小説を読もう！ */
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
            hasValue: false,
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
            hasValue: false,
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
            default: defaultOption.yomouRank_ShowDescription,
            hasValue: true,
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
            default: defaultOption.yomouRank_ShowTags,
            hasValue: true,
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
            default: defaultOption.yomouRank_ShowNovelInfoLink,
            hasValue: true,
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
            default: defaultOption.yomouRank_ShowKasasagi,
            hasValue: true,
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
            default: defaultOption.yomouRank_ShowRaWi,
            hasValue: true,
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
            default: defaultOption.yomouRank_DevidePointsUnit,
            hasValue: true,
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
            default: defaultOption.yomouRank_PointsColor,
            hasValue: true,
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
            default: defaultOption.yomouRank_CustomCSS,
            hasValue: true,
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
            hasValue: false,
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
            default: defaultOption.yomouRankTop_ShowPoints,
            hasValue: true,
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
            default: defaultOption.yomouRankTop_ShowDescription,
            hasValue: true,
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
            default: defaultOption.yomouRankTop_ShowTags,
            hasValue: true,
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
            default: defaultOption.yomouRankTop_ShowLength,
            hasValue: true,
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
            default: defaultOption.yomouRankTop_ShowNovelInfoLink,
            hasValue: true,
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
            default: defaultOption.yomouRankTop_ShowUpdateDate,
            hasValue: true,
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
            default: defaultOption.yomouRankTop_ShowKasasagi,
            hasValue: true,
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
            default: defaultOption.yomouRankTop_ShowRaWi,
            hasValue: true,
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
            default: defaultOption.yomouRankTop_CustomCSS,
            hasValue: true,
            isAdvanced: true,
        },
    },

    /* ユーザページ */
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
            data: "ui_workspaceCustomHeaderDraggable"
        },
        location: {
            page: "workspace",
            category: "general",
        },
        value: {
            hasValue: false,
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
            data: "ui_workspaceCustomHeaderMenuDraggable"
        },
        location: {
            page: "workspace",
            category: "general",
        },
        value: {
            hasValue: false,
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
            default: defaultOption.workspaceCustomHeaderMode,
            hasValue: true,
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
            default: defaultOption.workspaceCustomHeaderScrollHidden,
            hasValue: true,
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
            default: defaultOption.workspaceNovelmanageDeleteConfirm,
            hasValue: true,
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
            default: defaultOption.workspaceUserblogmanageDeleteConfirm,
            hasValue: true,
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
            default: defaultOption.workspaceNovelmanageShowPointAverage,
            hasValue: true,
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
            default: defaultOption.workspaceCustomEditor,
            hasValue: true,
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
            hasValue: false,
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
            default: defaultOption.workspaceBookmarkLayout,
            hasValue: true,
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
            default: defaultOption.workspaceBookmarkCategoryLayout,
            hasValue: true,
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
            default: defaultOption.workspaceBookmarkReplaceEpisode,
            hasValue: true,
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
            hasValue: false,
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
            default: defaultOption.workspaceImpressionMarkedButton,
            hasValue: true,
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
            default: defaultOption.workspaceImpressionHideButton,
            hasValue: true,
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
            default: defaultOption.workspaceImpressionMarkAsReadWhenReply,
            hasValue: true,
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
            default: defaultOption.workspaceImpressionHideWhenMarked,
            hasValue: true,
            requirement: {
                dataFor: ["workspaceImpressionMarkedButton", "workspaceImpressionHideButton"],
                data: true,
                mode: "show"
            },
            isAdvanced: true,
        },
    },

    /* マイページ */
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
            default: defaultOption.mypageShowUserId,
            hasValue: true,
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
            default: defaultOption.mypageShowFavUserId,
            hasValue: true,
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
            hasValue: false,
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
            default: defaultOption.mypageNovellistShowReaction,
            hasValue: true,
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
            default: defaultOption.mypageNovellistShowLength,
            hasValue: true,
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
            default: defaultOption.mypageNovellistShowKasasagi,
            hasValue: true,
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
            default: defaultOption.mypageNovellistShowRaWi,
            hasValue: true,
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
            default: defaultOption.mypageDisableExternalURLWarning,
            hasValue: true,
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
            default: defaultOption.mypageBlogAutoURL,
            hasValue: true,
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
            default: defaultOption.mypageBlogCommentAutoURL,
            hasValue: true,
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
            default: defaultOption.mypageProfileStatics,
            hasValue: true,
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
            default: defaultOption.mypageProfileBooklist,
            hasValue: true,
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
            default: defaultOption.mypageProfileAutoURL,
            hasValue: true,
        },
    },

    /* みてみん */
    /* 全般 (general) */
    {
        id: "miteminShowIcodeField",
        title: "iコードを表示",
        description: {
            text: "iコードのコピー用フィールドを表示します。",
            keywords: ["iこーどをひょうじ", "iコード", "みてみん", "挿絵", "えぱれっと"],
        },
        ui: {
            type: "toggle",
            name: "default"
        },
        location: {
            page: "mitemin",
            category: "general",
        },
        value: {
            default: defaultOption.miteminShowIcodeField,
            hasValue: true,
        },
    },

    /* アクセス解析 */
    /* 全般 (general) */
    {
        id: "kasasagiCustomStyle",
        title: "デザインを調整（推奨）",
        description: {
            text: "全体的なページのデザインを調整します。",
            keywords: ["でざいんをちょうせい", "KASASAGI", "アクセス解析", "レイアウト", "デザイン", "外観"],
        },
        ui: {
            type: "toggle",
            name: "default"
        },
        location: {
            page: "kasasagi",
            category: "general",
        },
        value: {
            default: defaultOption.kasasagiCustomStyle,
            hasValue: true,
        },
    },

    {
        id: "kasasagiExportButton",
        title: "エクスポートボタン",
        description: {
            text: "表示されているデータをファイルで出力できるボタンを追加します。",
            keywords: ["えくすぽーとぼたん", "KASASAGI", "アクセス解析", "エクスポート", "JSON"],
        },
        ui: {
            type: "toggle",
            name: "default"
        },
        location: {
            page: "kasasagi",
            category: "general",
        },
        value: {
            default: defaultOption.kasasagiExportButton,
            hasValue: true,
        },
    },
    
    /* 総合PV (pageview) */
    {
        id: "parent_kasasagiGeneralDay",
        title: "当日・前日PV",
        ui: {
            type: "parent",
            name: "column",
        },
        location: {
            page: "kasasagi",
            category: "pageview",
            noindex: true,
        },
        value: {
            hasValue: false,
        }
    },

    {
        id: "kasasagiShowGraph_GeneralDay",
        title: "グラフ表示",
        description: {
            hidden: "当日・前日PVのグラフを表示します。",
            keywords: ["ぐらふひょうじ（とうじつ・ぜんじつPV）", "KASASAGI", "アクセス解析", "グラフ", "当日・前日PV"],
        },
        ui: {
            type: "toggle",
            name: "default"
        },
        location: {
            page: "kasasagi",
            category: "pageview",
            hasParent: true,
            parent: "parent_kasasagiGeneralDay",
        },
        value: {
            default: defaultOption.kasasagiShowGraph_GeneralDay,
            hasValue: true,
        },
    },

    {
        id: "kasasagiGraphType_GeneralDay",
        title: "グラフ種類",
        description: {
            text: "グラフの外観を設定します。",
            keywords: ["ぐらふしゅるい（とうじつ・ぜんじつPV）", "KASASAGI", "アクセス解析", "グラフ", "当日・前日PV"],
        },
        ui: {
            type: "dropdown",
            name: "default",
            data: [
                {value: "bar", title: "棒グラフ"},
                {value: "line", title: "折れ線グラフ"}
            ]
        },
        location: {
            page: "kasasagi",
            category: "pageview",
            hasParent: true,
            parent: "parent_kasasagiGeneralDay",
        },
        value: {
            default: defaultOption.kasasagiGraphType_GeneralDay,
            hasValue: true,
            requirement: {
                dataFor: ["kasasagiShowGraph_GeneralDay"],
                data: true,
                mode: "show"
            },
            isAdvanced: true,
        },
    },

    {
        id: "parent_kasasagiGeneralTotal",
        title: "累計PV",
        ui: {
            type: "parent",
            name: "column",
        },
        location: {
            page: "kasasagi",
            category: "pageview",
            noindex: true,
        },
        value: {
            hasValue: false,
        }
    },

    {
        id: "kasasagiShowGraph_GeneralTotal",
        title: "グラフ表示",
        description: {
            hidden: "累計PVのグラフを表示します。",
            keywords: ["ぐらふひょうじ（るいけいPV）", "KASASAGI", "アクセス解析", "グラフ", "累計PV"],
        },
        ui: {
            type: "toggle",
            name: "default"
        },
        location: {
            page: "kasasagi",
            category: "pageview",
            hasParent: true,
            parent: "parent_kasasagiGeneralTotal",
        },
        value: {
            default: defaultOption.kasasagiShowGraph_GeneralTotal,
            hasValue: true,
        },
    },

    {
        id: "kasasagiGraphType_GeneralTotal",
        title: "グラフ種類",
        description: {
            text: "グラフの外観を設定します。",
            keywords: ["ぐらふしゅるい（るいけいPV）", "KASASAGI", "アクセス解析", "グラフ", "累計PV"],
        },
        ui: {
            type: "dropdown",
            name: "default",
            data: [
                {value: "bar", title: "棒グラフ"},
                {value: "line", title: "折れ線グラフ"}
            ]
        },
        location: {
            page: "kasasagi",
            category: "pageview",
            hasParent: true,
            parent: "parent_kasasagiGeneralTotal",
        },
        value: {
            default: defaultOption.kasasagiGraphType_GeneralTotal,
            hasValue: true,
            requirement: {
                dataFor: ["kasasagiShowGraph_GeneralTotal"],
                data: true,
                mode: "show"
            },
            isAdvanced: true,
        },
    },

    {
        id: "parent_kasasagiGeneralAPI",
        title: "情報表示",
        ui: {
            type: "parent",
            name: "column",
        },
        location: {
            page: "kasasagi",
            category: "pageview",
            noindex: true,
        },
        value: {
            hasValue: false,
        }
    },

    {
        id: "kasasagiShowTable_API",
        title: "作品データ",
        description: {
            text: "詳細な作品の統計情報を表示します。",
            keywords: ["さくひんでーたひょうじ", "KASASAGI", "アクセス解析", "テーブル（表）", "なろうAPI"],
        },
        ui: {
            type: "toggle",
            name: "default"
        },
        location: {
            page: "kasasagi",
            category: "pageview",
            hasParent: true,
            parent: "parent_kasasagiGeneralAPI",
        },
        value: {
            default: defaultOption.kasasagiShowTable_API,
            hasValue: true,
        },
    },

    {
        id: "kasasagiShowTable_Rank",
        title: "殿堂入り",
        description: {
            text: "作品の殿堂入り情報を表示します。",
            keywords: ["さくひんでーたひょうじ", "KASASAGI", "アクセス解析", "テーブル（表）", "なろうAPI", "殿堂入り", "ランキング"],
        },
        ui: {
            type: "toggle",
            name: "default",
        },
        location: {
            page: "kasasagi",
            category: "pageview",
            hasParent: true,
            parent: "parent_kasasagiGeneralAPI",
        },
        value: {
            default: defaultOption.kasasagiShowTable_Rank,
            hasValue: true,
        },
    },

    {
        id: "kasasagiShowTable_ExternalLink",
        title: "リンク集",
        description: {
            text: "作品に関連する外部サイトのリンクを表示します。",
            keywords: ["りんくしゅうひょうじ", "KASASAGI", "アクセス解析"],
        },
        ui: {
            type: "toggle",
            name: "default"
        },
        location: {
            page: "kasasagi",
            category: "pageview",
            hasParent: true,
            parent: "parent_kasasagiGeneralAPI",
        },
        value: {
            default: defaultOption.kasasagiShowTable_ExternalLink,
            hasValue: true,
        },
    },

    /* エピソード別 (episode) */
    {
        id: "kasasagiShowGraph_ChapterUnique",
        title: "グラフ表示",
        description: {
            hidden: "エピソード別ユニークのグラフを表示します。",
            keywords: ["ぐらふひょうじ（えぴそーどべつゆにーく）", "KASASAGI", "アクセス解析", "グラフ", "エピソード別ユニーク"],
        },
        ui: {
            type: "toggle",
            name: "default"
        },
        location: {
            page: "kasasagi",
            category: "episode",
        },
        value: {
            default: defaultOption.kasasagiShowGraph_ChapterUnique,
            hasValue: true,
        },
    },

    {
        id: "kasasagiGraphType_ChapterUnique",
        title: "グラフ種類",
        description: {
            text: "グラフの外観を設定します。",
            keywords: ["ぐらふしゅるい（えぴそーどべつゆにーく）", "KASASAGI", "アクセス解析", "グラフ", "エピソード別ユニーク"],
        },
        ui: {
            type: "dropdown",
            name: "default",
            data: [
                {value: "bar", title: "棒グラフ"},
                {value: "line", title: "折れ線グラフ"}
            ]
        },
        location: {
            page: "kasasagi",
            category: "episode",
        },
        value: {
            default: defaultOption.kasasagiGraphType_ChapterUnique,
            hasValue: true,
            requirement: {
                dataFor: ["kasasagiShowGraph_ChapterUnique"],
                data: true,
                mode: "show"
            },
            isAdvanced: true,
        },
    },

    {
        id: "kasasagiShowTable_ChapterUnique",
        title: "テーブル表示",
        description: {
            text: "既存のテーブル（表）のレイアウトを変更します。",
            keywords: ["てーぶるひょうじ（えぴそーどべつゆにーく）", "KASASAGI", "アクセス解析", "テーブル（表）", "エピソード別ユニーク"],
        },
        ui: {
            type: "toggle",
            name: "default",
        },
        location: {
            page: "kasasagi",
            category: "episode",
        },
        value: {
            default: defaultOption.kasasagiShowTable_GeneralDay,
            hasValue: true,
        },
    },

    /* 日別 (day) */
    {
        id: "parent_kasasagiDayPV",
        title: "日別PV",
        ui: {
            type: "parent",
            name: "column",
        },
        location: {
            page: "kasasagi",
            category: "day",
            noindex: true,
        },
        value: {
            hasValue: false,
        }
    },

    {
        id: "kasasagiShowGraph_DayPV",
        title: "グラフ表示",
        description: {
            hidden: "日別PVのグラフを表示します。",
            keywords: ["ぐらふひょうじ（ひべつPV）", "KASASAGI", "アクセス解析", "グラフ", "日別PV"],
        },
        ui: {
            type: "toggle",
            name: "default"
        },
        location: {
            page: "kasasagi",
            category: "day",
            hasParent: true,
            parent: "parent_kasasagiDayPV"
        },
        value: {
            default: defaultOption.kasasagiShowGraph_DayPV,
            hasValue: true,
        },
    },

    {
        id: "kasasagiGraphType_DayPV",
        title: "グラフ種類",
        description: {
            text: "グラフの外観を設定します。",
            keywords: ["ぐらふしゅるい（ひべつPV）", "KASASAGI", "アクセス解析", "グラフ", "日別PV"],
        },
        ui: {
            type: "dropdown",
            name: "default",
            data: [
                {value: "bar", title: "棒グラフ"},
                {value: "line", title: "折れ線グラフ"}
            ]
        },
        location: {
            page: "kasasagi",
            category: "day",
            hasParent: true,
            parent: "parent_kasasagiDayPV"
        },
        value: {
            default: defaultOption.kasasagiGraphType_DayPV,
            hasValue: true,
            requirement: {
                dataFor: ["kasasagiShowGraph_DayPV"],
                data: true,
                mode: "show"
            },
            isAdvanced: true,
        },
    },

    {
        id: "parent_kasasagiDayUnique",
        title: "日別ユニーク",
        ui: {
            type: "parent",
            name: "column",
        },
        location: {
            page: "kasasagi",
            category: "day",
            noindex: true,
        },
        value: {
            hasValue: false,
        }
    },

    {
        id: "kasasagiShowGraph_DayUnique",
        title: "グラフ表示",
        description: {
            hidden: "日別ユニークのグラフを表示します。",
            keywords: ["ぐらふひょうじ（ひべつゆにーく）", "KASASAGI", "アクセス解析", "グラフ", "日別ユニーク"],
        },
        ui: {
            type: "toggle",
            name: "default"
        },
        location: {
            page: "kasasagi",
            category: "day",
            hasParent: true,
            parent: "parent_kasasagiDayUnique"
        },
        value: {
            default: defaultOption.kasasagiShowGraph_DayUnique,
            hasValue: true,
        },
    },

    {
        id: "kasasagiGraphType_DayUnique",
        title: "グラフ種類",
        description: {
            text: "グラフの外観を設定します。",
            keywords: ["ぐらふしゅるい（ひべつゆにーく）", "KASASAGI", "アクセス解析", "グラフ", "日別ユニーク"],
        },
        ui: {
            type: "dropdown",
            name: "default",
            data: [
                {value: "bar", title: "棒グラフ"},
                {value: "line", title: "折れ線グラフ"}
            ]
        },
        location: {
            page: "kasasagi",
            category: "day",
            hasParent: true,
            parent: "parent_kasasagiDayUnique"
        },
        value: {
            default: defaultOption.kasasagiGraphType_DayUnique,
            hasValue: true,
            requirement: {
                dataFor: ["kasasagiShowGraph_DayUnique"],
                data: true,
                mode: "show"
            },
            isAdvanced: true,
        },
    },

    /* 月別 (month) */
    {
        id: "parent_kasasagiMonthPV",
        title: "月別PV",
        ui: {
            type: "parent",
            name: "column",
        },
        location: {
            page: "kasasagi",
            category: "month",
            noindex: true,
        },
        value: {
            hasValue: false,
        }
    },

    {
        id: "kasasagiShowGraph_MonthPV",
        title: "グラフ表示",
        description: {
            hidden: "月別PVのグラフを表示します。",
            keywords: ["ぐらふひょうじ（つきべつPV）", "KASASAGI", "アクセス解析", "グラフ", "月別PV"],
        },
        ui: {
            type: "toggle",
            name: "default"
        },
        location: {
            page: "kasasagi",
            category: "month",
            hasParent: true,
            parent: "parent_kasasagiMonthPV"
        },
        value: {
            default: defaultOption.kasasagiShowGraph_MonthPV,
            hasValue: true,
        },
    },

    {
        id: "kasasagiGraphType_MonthPV",
        title: "グラフ種類",
        description: {
            text: "グラフの外観を設定します。",
            keywords: ["ぐらふしゅるい（つきべつPV）", "KASASAGI", "アクセス解析", "グラフ", "月別PV"],
        },
        ui: {
            type: "dropdown",
            name: "default",
            data: [
                {value: "bar", title: "棒グラフ"},
                {value: "line", title: "折れ線グラフ"}
            ]
        },
        location: {
            page: "kasasagi",
            category: "month",
            hasParent: true,
            parent: "parent_kasasagiMonthPV"
        },
        value: {
            default: defaultOption.kasasagiGraphType_MonthPV,
            hasValue: true,
            requirement: {
                dataFor: ["kasasagiShowGraph_MonthPV"],
                data: true,
                mode: "show"
            },
            isAdvanced: true,
        },
    },

    {
        id: "parent_kasasagiMonthUnique",
        title: "月別ユニーク",
        ui: {
            type: "parent",
            name: "column",
        },
        location: {
            page: "kasasagi",
            category: "month",
            noindex: true,
        },
        value: {
            hasValue: false,
        }
    },

    {
        id: "kasasagiShowGraph_MonthUnique",
        title: "グラフ表示",
        description: {
            hidden: "月別ユニークのグラフを表示します。",
            keywords: ["ぐらふひょうじ（つきべつゆにーく）", "KASASAGI", "アクセス解析", "グラフ", "月別ユニーク"],
        },
        ui: {
            type: "toggle",
            name: "default"
        },
        location: {
            page: "kasasagi",
            category: "month",
            hasParent: true,
            parent: "parent_kasasagiMonthUnique"
        },
        value: {
            default: defaultOption.kasasagiShowGraph_MonthUnique,
            hasValue: true,
        },
    },

    {
        id: "kasasagiGraphType_MonthUnique",
        title: "グラフ種類",
        description: {
            text: "グラフの外観を設定します。",
            keywords: ["ぐらふしゅるい（つきべつゆにーく）", "KASASAGI", "アクセス解析", "グラフ", "月別ユニーク"],
        },
        ui: {
            type: "dropdown",
            name: "default",
            data: [
                {value: "bar", title: "棒グラフ"},
                {value: "line", title: "折れ線グラフ"}
            ]
        },
        location: {
            page: "kasasagi",
            category: "month",
            hasParent: true,
            parent: "parent_kasasagiMonthUnique"
        },
        value: {
            default: defaultOption.kasasagiGraphType_MonthUnique,
            hasValue: true,
            requirement: {
                dataFor: ["kasasagiShowGraph_MonthUnique"],
                data: true,
                mode: "show"
            },
            isAdvanced: true,
        },
    },

]

export function getOptionElement(option, forSearch){
    const page = option.location.page
    const category = option.location.category
    const id = option.id
    const title = option.title
    const style = option.style
    const elmClass = option.class
    const description = option.description
    const uiType = option.ui.type
    const uiName = option.ui.name
    const uiData = option.ui.data
    const uiStyle = option.ui.style
    const uiClass = option.ui.class
    var uiPrefix = option.ui.prefix
    var uiSuffix = option.ui.suffix
    const hasValue = option.value.hasValue
    const requirement = option.value.requirement
    const isExperimental = option.value.isExperimental
    const isAdvanced = option.value.isAdvanced
    const isDebug = option.value.isDebug
    const hasParent = option.location.hasParent
    const parent = option.location.parent

    var elm
    
    /* Outer */
    if(hasParent && !forSearch){
        elm = $(`<div class="contents-option" name="${id}"></div>`)
    }else{
        elm = $(`<div class="contents-wide" name="${id}"><div class="contents-option"></div></div>`)
    }
    if(forSearch){
        elm.addClass(["search-result-box", "search-result--option"])
    }
    
    /* Option Items */
    if(uiType == "parent"){
        elm.append(`
            <div class="contents-option-head"></div>
            <div class="contents-wide-column"></div>
        `)
        
    }else{
        if(elm.hasClass("contents-option")){
            elm.append(`<div class="contents-option-head"></div>`)
        }else{
            elm.find(".contents-option").append(`<div class="contents-option-head"></div>`)
        }

        if(!uiPrefix){
            uiPrefix = ""
        }
        if(!uiSuffix){
            uiSuffix = ""
        }

        /* Contents */
        if(uiType === "toggle"){
            if(elm.hasClass("contents-option")){
                elm.append(`<div class="contents-option-content"></div>`)
            }else{
                elm.find(".contents-option").append(`<div class="contents-option-content"></div>`)
            }

            if(uiName==="default" || uiName === "toggle" || uiName===undefined){
                var item = $(`<input type="checkbox" id="${id}" class="options toggle">`)
                if(uiStyle){
                    item.css(uiStyle)
                }
                if(uiClass){
                    item.addClass(uiClass)
                }

                var toggleElm = $(`
                    ${uiPrefix}
                    ${item[0].outerHTML}
                    <label for="${id}" class="toggle"></label>
                    ${uiSuffix}
                `)

                elm.find(".contents-option-content").append(toggleElm)
            }else if(uiName==="checkbox"){
                var item = $(`<input type="checkbox" id="${id}" class="options ui-checkbox">`)
                if(uiStyle){
                    item.css(uiStyle)
                }
                if(uiClass){
                    item.addClass(uiClass)
                }

                var toggleElm = $(`
                    ${uiPrefix}
                    ${item[0].outerHTML}
                    <label for="${id}" class="tui-checkbox">${uiSuffix}</label>
                `)

                elm.find(".contents-option-content").append(toggleElm)
            }
        }
        else if(uiType === "dropdown"){
            if(elm.hasClass("contents-option")){
                elm.append(`<div class="contents-option-content"></div>`)
            }else{
                elm.find(".contents-option").append(`<div class="contents-option-content"></div>`)
            }

            if(uiName==="default" || uiName===undefined){
                var dropdownElm = $(`
                    <div class="dropdown">
                        ${uiPrefix}
                        <select id="${id}" class="options">
                        </select>
                        ${uiSuffix}
                    </div>
                `)

                if(uiStyle){
                    dropdownElm.css(uiStyle)
                }
                if(uiClass){
                    dropdownElm.addClass(uiClass)
                }

                $.each(uiData, function(_, val){
                    var value = ""
                    var title = ""
                    if(val.value){
                        value = val.value
                    }else{
                        return true
                    }
                    if(val.title){
                        title = val.title
                    }else{
                        if(value){
                            title = value
                        }else{
                            return true
                        }
                    }

                    dropdownElm.find("select").append(`
                        <option value="${value}">${title}</option>
                    `)
                })

                elm.find(".contents-option-content").append(dropdownElm)
            }
        }
        else if(uiType === "input"){
            if(elm.hasClass("contents-option")){
                elm.append(`<div class="contents-option-content"></div>`)
            }else{
                elm.find(".contents-option").append(`<div class="contents-option-content"></div>`)
            }

            if(uiName==="default" || uiName===undefined || uiName==="text" || uiName==="number"){
                var item = $(`
                    <div class="textfield">
                        ${uiPrefix}<input class="options" type="text" id="${id}">${uiSuffix}
                    </div>
                `)

                if(uiStyle){
                    item.css(uiStyle)
                }
                if(uiClass){
                    item.addClass(uiClass)
                }

                elm.find(".contents-option-content").append(item)
            }
            else if(uiName==="integer"){
                var item = $(`
                    <div class="textfield">
                        <label>${uiPrefix}</label>
                        <input class="options" type="number" id="${id}">
                        <label>${uiSuffix}</label>
                    </div>
                `)
                
                if(uiData){
                    if(uiData.min){
                        item.find("input").attr("min", uiData.min)
                    }
                    if(uiData.max){
                        item.find("input").attr("max", uiData.max)
                    }
                }

                if(uiStyle){
                    item.css(uiStyle)
                }
                if(uiClass){
                    item.addClass(uiClass)
                }

                elm.find(".contents-option-content").append(item)
            }
            else if(uiName==="color"){
                var item = $(`
                    <div class="textfield">
                        <label>${uiPrefix}</label>
                        <input class="options color" type="text" id="${id}" data-coloris>
                        <label>${uiSuffix}</label>
                    </div>
                `)

                if(uiStyle){
                    item.css(uiStyle)
                }
                if(uiClass){
                    item.addClass(uiClass)
                }

                elm.find(".contents-option-content").append(item)
            }
        }
        else if(uiType === "textarea"){
            if(elm.hasClass("contents-option")){
                elm.append(`<div class="contents-option-content"></div>`)
            }else{
                elm.find(".contents-option").append(`<div class="contents-option-content"></div>`)
            }

            if(uiName==="default" || uiName===undefined){
                var item = $(`
                    <div class="textarea-outer">
                        <label>${uiPrefix}</label>
                        <textarea class="textarea options" id="${id}"></textarea>
                        <label>${uiSuffix}</label>
                    </div>
                `)

                if(uiStyle){
                    item.css(uiStyle)
                }
                if(uiClass){
                    item.addClass(uiClass)
                }

                elm.find(".contents-option-content").append(item)
            }else if(uiName === "syntax-highlight"){
                var item = $(`
                    <div class="textarea-outer">
                        <label>${uiPrefix}</label>
                        <textarea class="textarea options syntax-highlight" id="${id}" data="${uiData}"></textarea>
                        <label>${uiSuffix}</label>
                    </div>
                `)

                if(uiStyle){
                    item.css(uiStyle)
                }
                if(uiClass){
                    item.addClass(uiClass)
                }

                elm.find(".contents-option-content").append(item)
            }
        }
        else if(uiType === "custom" && !forSearch){
            if(elm.hasClass("contents-option")){
                elm.append(`<div class="contents-option-content"></div>`)
            }else{
                elm.find(".contents-option").append(`<div class="contents-option-content"></div>`)
            }
            
            if(uiName==="default" || uiName===undefined){
                if(customUIList[uiData]){
                    elm.find(".contents-option-content").append(customUIList[uiData])
                }
            }else if(uiName==="wide"){
                if(customUIList[uiData]){
                    elm.empty()
                    elm.append(customUIList[uiData])
                }
            }
        }
        else if(forSearch){ //検索用例外設定
            if(elm.hasClass("contents-option")){
                elm.append(`<div class="contents-option-content"></div>`)
            }else{
                elm.find(".contents-option").append(`<div class="contents-option-content"></div>`)
            }

            elm.addClass("search-result--option-disabled")
            var item = $(`
                <div class="search-result--items">
                    <div class="search-result--items-disabled">
                            <a href="/options/${page}/index.html?id=${id}&focus=1" target="_self">
                                <div class="search-result--items-disabled-box">このオプションはここでは設定できません。</div>
                            </a>
                        </span>
                    </div>
                </div>
            `)

            elm.find(".contents-option-content").append(item)
        }
    }

    /* Title / Description */
    if(title || description){
        const pageData = getOptionPageFromId(page)
        const categoryData = getOptionCategory(pageData, category)

        //title
        if(title){
            if(!forSearch){
                if(!elm.find(".contents-item--heading").length){
                    elm.find(".contents-option-head").append(`<div class="contents-item--heading">${title}</div>`)
                }else{
                    elm.find(".contents-item--heading").empty()
                    elm.find(".contents-item--heading").append(title)
                }
            }else{
                var crumbs = ""
                var optionTag = ""
                /*
                optionTag = `
                    <span class="search-result--items-crumbs-item search-result--items-id">
                        <a class="search-result--items-id-tag" href="/options/${page}/index.html?id=${id}&focus=1" target="_self">${id}</a>
                    </span>
                `
                */

                if(hasParent){
                    const parentData = getOptionFromId(parent)
                    if(parentData){
                        crumbs = `
                            <div class="search-result--items-crumbs">
                                <span class="search-result--items-crumbs-item"><a href="/options/${pageData.id}/index.html" target="_self">${pageData.title}</a></span>
                                <span class="search-result--items-crumbs-item"><a href="/options/${pageData.id}/index.html?category=${categoryData.id}" target="_self">${categoryData.title}</a></span>
                                <span class="search-result--items-crumbs-item"><a href="/options/${pageData.id}/index.html?id=${parentData.id}" target="_self">${parentData.title}</a></span>
                                ${optionTag}
                            </div>
                        `
                    }else{
                        crumbs = `
                            <div class="search-result--items-crumbs">
                                <span class="search-result--items-crumbs-item"><a href="/options/${pageData.id}/index.html" target="_self">${pageData.title}</a></span>
                                <span class="search-result--items-crumbs-item"><a href="/options/${pageData.id}/index.html?category=${categoryData.id}" target="_self">${categoryData.title}</a></span>
                                ${optionTag}
                            </div>
                        `
                    }
                }else{
                    crumbs = `
                        <div class="search-result--items-crumbs">
                            <span class="search-result--items-crumbs-item"><a href="/options/${pageData.id}/index.html" target="_self">${pageData.title}</a></span>
                            <span class="search-result--items-crumbs-item"><a href="/options/${pageData.id}/index.html?category=${categoryData.id}" target="_self">${categoryData.title}</a></span>
                            ${optionTag}
                        </div>
                    `
                }

                if(!elm.find(".contents-item--heading").length){
                    elm.find(".contents-option-head").append(`
                        <div class="contents-item--heading">
                            ${crumbs}
                            <div class="search-result--items-title">
                                <a href="/options/${page}/index.html?id=${id}&focus=1" target="_self">${title}</a>
                            </div>
                        </div>
                    `)
                }else{
                    elm.find(".contents-item--heading").empty()
                    elm.find(".contents-item--heading").append(`
                        ${crumbs}
                        <div class="search-result--items-title">
                            <a href="/options/${page}/index.html?id=${id}&focus=1" target="_self">${title}</a>
                        </div>
                    `)
                }
            }
        }
        
        // description
        var descriptionText = []

        if(description){
            if(description.text){
                descriptionText.push(`<div class="contents-item--description-item">${description.text}</div>`)
            }
            if(description.small){
                descriptionText.push(`<div class="contents-item--description-item description-small">${description.small}</div>`)
            }
            if(description.attention){
                descriptionText.push(`<div class="contents-item--description-item description-attention">${description.attention}</div>`)
            }
        }

        if(descriptionText.length > 0){
            if(!elm.find(".contents-item--description").length){
                elm.find(".contents-option-head").append(`<div class="contents-item--description">${descriptionText.join("")}</div>`)
            }else{
                elm.find(".contents-item--description").empty()
                elm.find(".contents-item--description").append(descriptionText.join(""))
            }
        }
    }

    /* Hide Settings */
    if(requirement){
        var hsDataFor = requirement.dataFor
        var hsData = requirement.data
        var hsMode = requirement.mode
        var hsRule = requirement.rule

        if(!Array.isArray(hsDataFor)){
            hsDataFor = [hsDataFor]
        }

        const len = hsDataFor.length
        if(!Array.isArray(hsData)){
            hsData = new Array(len).fill(hsData)
        }

        var hsDataType = new Array(len)
            .fill(undefined)
            .map((v, k) => {
                var t = typeof hsData[k]
                if(t==="boolean" || t==="number" || t==="string"){
                    return t
                }else if(hsData[k]===null){
                    return "null"
                }else{
                    return "undefined"
                }
            })
        
        elm.addClass("option-hide")
        elm.attr("data-for", hsDataFor.join(" "))
        if(hsData){
            elm.attr("data", hsData.join(" "))
        }
        if(hsMode){
            elm.attr("mode", hsMode)
        }
        if(hsDataType){
            elm.attr("data-type", hsDataType.join(" "))
        }
        if(hsRule){
            elm.attr("data-rule", hsRule)
        }
    }

    /* Advanced / Experimental settings */
    if(isAdvanced){
        elm.addClass("advanced-hide")
    }
    if(isExperimental){
        elm.addClass("experimental-hide")
    }
    if(isDebug){
        elm.addClass("debug-option-hide")
    }

    /* Style */
    if(style){
        elm.css(style)
    }

    /* Class */
    if(elmClass){
        elm.addClass(elmClass)
    }

    return elm
}
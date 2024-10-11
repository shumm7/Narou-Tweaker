import { novel_customHeaderSortable, novel_fontEditor, novel_replacePattern, novel_skinEditor } from "./_optionsAction.js";

export const novel_optionsList = [
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
            related: ["novelCustomStyle"],
            buttons: {
                reset: true,
                favorite: true,
            },
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
            related: ["novelCustomHeaderType"],
            buttons: {
                reset: true,
                favorite: true,
            },
        }
    },

    {
        id: "novelCustomHeaderMode",
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
            related: ["novelCustomHeaderMode"],
            buttons: {
                reset: true,
                favorite: true,
            },
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
            related: ["novelCustomHeaderScrollHidden"],
            buttons: {
                reset: true,
                favorite: true,
            },
            requirement: {
                dataFor: ["novelCustomHeaderMode"],
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
            action: novel_customHeaderSortable,
        },
        location: {
            page: "novel",
            category: "general",
        },
        value: {
            related: ["novelCustomHeaderLeft", "novelCustomHeaderRight"],
            buttons: {
                reset: true,
                favorite: true,
            },
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
            related: "child",
            buttons: {
                reset: true,
                favorite: true,
            },
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
            related: ["novelCustomHeaderShowEnactiveItems"],
            buttons: {
                reset: true,
                favorite: true,
            },
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
            related: ["novelCustomHeaderSocialShowsBrandName"],
            buttons: {
                reset: true,
                favorite: true,
            },
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
            related: ["novelCustomHeaderQRCodeCurrentLocation"],
            buttons: {
                reset: true,
                favorite: true,
            },
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
            related: ["novelCustomHeaderQRCodeShowURL"],
            buttons: {
                reset: true,
                favorite: true,
            },
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
            related: ["novelShowAllExtext"],
            buttons: {
                reset: true,
                favorite: true,
            },
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
            related: ["novelPrefaceAutoURL"],
            buttons: {
                reset: true,
                favorite: true,
            },
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
            related: ["novelAfterwordAutoURL"],
            buttons: {
                reset: true,
                favorite: true,
            },
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
            related: ["novelForceMypageLink"],
            buttons: {
                reset: true,
                favorite: true,
            },
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
            related: ["novelShowHistoryOnSublist"],
            buttons: {
                reset: true,
                favorite: true,
            },
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
            related: ["novelCursorHide"],
            buttons: {
                reset: true,
                favorite: true,
            },
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
            related: ["novelCursorHideTimeout"],
            buttons: {
                reset: true,
                favorite: true,
            },
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
            related: ["novelAttentionBanner"],
            buttons: {
                reset: true,
                favorite: true,
            },
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
            action: novel_skinEditor,
        },
        location: {
            page: "novel",
            category: "style",
        },
        value: {
            buttons: {
                reset: true,
                favorite: true,
            },
            related: ["selectedSkin"],
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
            buttons: {
                reset: false,
                favorite: true,
            },
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
            buttons: {
                reset: false,
                favorite: true,
            },
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
            related: ["novelCustomCSS"],
            buttons: {
                reset: true,
                favorite: true,
            },
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
            related: ["novelAuthorCustomSkin"],
            buttons: {
                reset: true,
                favorite: true,
            },
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
            related: ["novelAuthorCustomSkinWarning"],
            buttons: {
                reset: true,
                favorite: true,
            },
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
            buttons: {
                reset: false,
                favorite: true,
            },
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
            action: novel_fontEditor,
        },
        location: {
            page: "novel",
            category: "font",
        },
        value: {
            buttons: {
                reset: true,
                favorite: true,
            },
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
            related: ["novelVertical"],
            buttons: {
                reset: true,
                favorite: true,
            },
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
            buttons: {
                reset: false,
                favorite: true,
            },
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
            buttons: {
                reset: false,
                favorite: true,
            },
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
            buttons: {
                reset: false,
                favorite: true,
            },
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
            buttons: {
                reset: true,
                favorite: true,
            },
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
            related: "child",
            buttons: {
                reset: true,
                favorite: true,
            },
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
            related: "child",
            buttons: {
                reset: true,
                favorite: true,
            },
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
            related: "child",
            buttons: {
                reset: true,
                favorite: true,
            },
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
            related: "child",
            buttons: {
                reset: true,
                favorite: true,
            },
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
            related: "child",
            buttons: {
                reset: true,
                favorite: true,
            },
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
            related: ["correctionIndent"],
            buttons: {
                reset: true,
                favorite: true,
            },
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
            related: ["correctionNormalizeEllipses"],
            buttons: {
                reset: true,
                favorite: true,
            },
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
            related: ["correctionNormalizeDash"],
            buttons: {
                reset: true,
                favorite: true,
            },
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
            related: ["correctionNormalizeExclamation"],
            buttons: {
                reset: true,
                favorite: true,
            },
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
            related: ["correctionRepeatedSymbols"],
            buttons: {
                reset: true,
                favorite: true,
            },
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
            related: ["correctionPeriodWithBrackets"],
            buttons: {
                reset: true,
                favorite: true,
            },
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
            related: ["correctionNoSpaceExclamation"],
            buttons: {
                reset: true,
                favorite: true,
            },
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
            related: ["correctionOddEllipses"],
            buttons: {
                reset: true,
                favorite: true,
            },
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
            related: ["correctionOddDash"],
            buttons: {
                reset: true,
                favorite: true,
            },
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
            related: ["correctionWaveDash"],
            buttons: {
                reset: true,
                favorite: true,
            },
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
            related: ["correctionNumber"],
            buttons: {
                reset: true,
                favorite: true,
            },
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
            related: ["correctionNumberShort"],
            buttons: {
                reset: true,
                favorite: true,
            },
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
            related: ["correctionNumberLong"],
            buttons: {
                reset: true,
                favorite: true,
            },
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
            related: ["correctionNumberSymbol"],
            buttons: {
                reset: true,
                favorite: true,
            },
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
            related: ["correctionVerticalLayout_CombineWord"],
            buttons: {
                reset: true,
                favorite: true,
            },
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
            related: ["correctionVerticalLayout_CombineNumber"],
            buttons: {
                reset: true,
                favorite: true,
            },
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
            related: ["correctionVerticalLayout_IgnoreCombineNumberInWord"],
            buttons: {
                reset: true,
                favorite: true,
            },
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
            related: ["correctionVerticalLayout_CombineExclamation"],
            buttons: {
                reset: true,
                favorite: true,
            },
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
            related: ["correctionVerticalLayout_SidewayWord"],
            buttons: {
                reset: true,
                favorite: true,
            },
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
            related: ["correctionVerticalLayout_SidewayExclamation"],
            buttons: {
                reset: true,
                favorite: true,
            },
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
            related: ["correctionShowIllustration"],
            buttons: {
                reset: true,
                favorite: true,
            },
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
            related: ["correctionRemoveIllustrationLink"],
            buttons: {
                reset: true,
                favorite: true,
            },
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
            action: novel_replacePattern,
        },
        location: {
            page: "novel",
            category: "correction",
        },
        value: {
            related: ["correctionReplacePatterns"],
            buttons: {
                reset: true,
                favorite: true,
            },
        },
    },
]
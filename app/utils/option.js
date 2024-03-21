export const defaultOption = {
    optionsVersion: 1,

    /* Option Page */
    optionPageDetailsWelcome: true,
    optionPageDetailsNovel: false,
    optionPageDetailsMypage: false,
    optionPageDetailsKasasagi: false,
    optionPageDetailsGeneral: false,
    optionPageDetailsDebug: false,

    /* Novel */
    novelCustomStyle: true,
    novelCustomHeader: true,
    novelExpandSkin: true,
    novelCustomHeaderScrollHidden: false,
    novelCustomHeaderMode: "scroll",
    novelCustomHeaderLeft: ["home", "info", "impression", "review", "pdf", "booklist"],
    novelCustomHeaderRight: ["siori", "option"],
    novelOptionModalSelected: 0,
    
    /* Mypage */
    mypageShowUserId: true,
    mypageProfileStatics: true,
    mypageProfileBooklist: true,
    mypageDisableExternalURLWarning: false,
    mypageProfileAutoURL: true,
    mypageBlogAutoURL: true,
    mypageBlogCommentAutoURL: false,

    /* Kasasagi */
    kasasagiCustomStyle: true,
    kasasagiExportButton: true,

    kasasagiShowGraph_GeneralDay: true,
    kasasagiShowGraph_GeneralTotal: false,
    kasasagiShowGraph_ChapterUnique: true,
    kasasagiShowGraph_DayPV: true,
    kasasagiShowGraph_DayUnique: true,
    kasasagiShowGraph_MonthPV: true,
    kasasagiShowGraph_MonthUnique: true,
    
    kasasagiGraphType_GeneralDay: "bar",
    kasasagiGraphType_GeneralTotal: "bar",
    kasasagiGraphType_ChapterUnique: "bar",
    kasasagiGraphType_DayPV: "bar",
    kasasagiGraphType_DayUnique: "bar",
    kasasagiGraphType_MonthPV: "bar",
    kasasagiGraphType_MonthUnique: "bar",

    kasasagiShowTable_API: true,
    kasasagiShowTable_GeneralDay: true,
    kasasagiShowTable_ChapterUnique: true,
    kasasagiShowTable_DayPV: true, //Unused
    kasasagiShowTable_DayUnique: true, //Unused
    kasasagiShowTable_MonthPV: true, //Unused
    kasasagiShowTable_MonthUnique: true, //Unused

    /* Skin */
    skins: [],
    selectedSkin: 0,

    /* Font */
    fontFontFamily: "gothic",
    fontFontSize: 0,
    fontLineHeight: 0,
    fontFontFamily_Custom: `"Yu Gothic", 游ゴシック, YuGothic, 游ゴシック体, sans-serif`,
    fontTextRendering: "optimizeLegibility",
    fontWidth: 1,

    /* Correction */
    correctionIndent: false,
    correctionNormalizeEllipses: false,
    correctionNormalizeDash: false,
    correctionRepeatedSymbols: false,
    correctionPeriodWithBrackets: false,
    correctionNoSpaceExclamation: false,
    correctionOddEllipsesAndDash: false,
    correctionReplacePatterns: [],
}

export const localSkins = [
    {
        "name": "ライト〔標準〕",
        "description": "Narou Tweaker オリジナル",
        "customizable": false,
        "show": true,
        "style": {
            "link": {
                "color_hover": "rgb(98, 84, 255)",
                "color_link": "rgb(26, 13, 171)",
                "color_visited": "#681da8"
            },
            "novel": {
                "background": "#ffffff",
                "background_second": "#eeeeee",
                "color": "rgba(0, 0, 0, 0.87)"
            },
            "sublist": {
                "color": "rgba(0, 0, 0, 0.3)",
                "hover": "rgba(67, 51, 242, 0.7)"
            }
        }
    },
    {
        "name": "ダーク〔標準〕",
        "description": "Narou Tweaker オリジナル",
        "customizable": false,
        "show": true,
        "style": {
            "link": {
                "color_hover": "rgb(152, 189, 235)",
                "color_link": "rgb(83, 155, 245)",
                "color_visited": "rgb(135, 122, 245)"
            },
            "novel": {
                "background": "#1d2020",
                "background_second": "rgb(47, 50, 50)",
                "color": "rgba(255, 255, 255, 0.92)"
            },
            "sublist": {
                "color": "rgba(255, 255, 255, 0.3)",
                "hover": "rgba(152, 189, 235, 0.7)"
            }
        }
    },
    {
        "name": "生成り〔標準〕",
        "description": "Narou Tweaker オリジナル",
        "customizable": false,
        "show": true,
        "style": {
            "link": {
                "color_hover": "rgb(98, 84, 255)",
                "color_link": "rgb(26, 13, 171)",
                "color_visited": "#681da8"
            },
            "novel": {
                "background": "#f7f6eb",
                "background_second": "#eeeeee",
                "color": "rgba(0, 0, 0, 0.87)"
            },
            "sublist": {
                "color": "rgba(0, 0, 0, 0.3)",
                "hover": "rgba(67, 51, 242, 0.7)"
            }
        }
    },
    {
        "name": "標準設定〔小説家になろう〕",
        "description": "サイトのデフォルト",
        "customizable": false,
        "show": true,
        "style": {
            "novel": {
                "background": "#fff",
                "background_second": "#fff",
                "color": "#444"
            },
            "link": {
                "color_link": "#03c",
                "color_visited": "#857",
                "color_hover": "#393"
            },
            "sublist": {
                "color": "#444",
                "hover": "#9df"
            }
        }
    },
    {
        "name": "ブラックモード1〔小説家になろう〕",
        "description": "サイトのデフォルト",
        "customizable": false,
        "show": true,
        "style": {
            "novel": {
                "background": "#000",
                "background_second": "#000",
                "color": "#fff"
            },
            "link": {
                "color_link": "#fcf",
                "color_visited": "#857",
                "color_hover": "#f03"
            },
            "sublist": {
                "color": "#fff",
                "hover": "#f03"
            }
        }
    },
    {
        "name": "ブラックモード2〔小説家になろう〕",
        "description": "サイトのデフォルト",
        "customizable": false,
        "show": true,
        "style": {
            "novel": {
                "background": "#000",
                "background_second": "#000",
                "color": "#ccc"
            },
            "link": {
                "color_link": "#ff9",
                "color_visited": "#857",
                "color_hover": "#cf0"
            },
            "sublist": {
                "color": "#ccc",
                "hover": "#cf0"
            }
        }
    },
    {
        "name": "通常1〔小説家になろう〕",
        "description": "サイトのデフォルト",
        "customizable": false,
        "show": true,
        "style": {
            "novel": {
                "background": "#ccf",
                "background_second": "#ccf",
                "color": "#444"
            },
            "link": {
                "color_link": "#00f",
                "color_visited": "#009",
                "color_hover": "#00f"
            },
            "sublist": {
                "color": "#444",
                "hover": "#00f"
            }
        }
    },
    {
        "name": "通常2〔小説家になろう〕",
        "description": "サイトのデフォルト",
        "customizable": false,
        "show": true,
        "style": {
            "novel": {
                "background": "#cfc",
                "background_second": "#cfc",
                "color": "#444"
            },
            "link": {
                "color_link": "#00f",
                "color_visited": "#009",
                "color_hover": "#00f"
            },
            "sublist": {
                "color": "#444",
                "hover": "#00f"
            }
        }
    },
    {
        "name": "シンプル〔小説家になろう〕",
        "description": "サイトのデフォルト",
        "customizable": false,
        "show": true,
        "style": {
            "novel": {
                "background": "#fafafa",
                "background_second": "#fafafa",
                "color": "#444"
            },
            "link": {
                "color_link": "#00f",
                "color_visited": "#009",
                "color_hover": "#393"
            },
            "sublist": {
                "color": "#444",
                "hover": "#393"
            }
        }
    },
    {
        "name": "おすすめ設定〔小説家になろう〕",
        "description": "サイトのデフォルト",
        "customizable": false,
        "show": true,
        "style": {
            "novel": {
                "background": "#edf7ff",
                "background_second": "#edf7ff",
                "color": "#000"
            },
            "link": {
                "color_link": "#00f",
                "color_visited": "#009",
                "color_hover": "#00f"
            },
            "sublist": {
                "color": "#444",
                "hover": "#00f"
            }
        }
    }
]

export const localFont = {
    "font-family": {
        "serif": "'游明朝',YuMincho,'ヒラギノ明朝 Pr6N','Hiragino Mincho Pr6N','ヒラギノ明朝 ProN','Hiragino Mincho ProN','ヒラギノ明朝 StdN','Hiragino Mincho StdN',HiraMinProN-W3,'HGS明朝B','HG明朝B',sans-serif",
        "gothic": `"メイリオ", "Meiryo", 'Hiragino Kaku Gothic ProN', 'ヒラギノ角ゴ ProN W3', sans-serif`
    },
    "font-size": 100,
    "line-height": 180,
    "text-rendering": "optimizeLegibility",
    "width": 600
}

export const replacePattern = {
    pattern: "",
    replacement: "",
    regex: false,
    active: true
}

export const narouNetwrokUrlPattern = [
    /^(h?)(ttps?:\/\/(.*)\.syosetu\.com)/,
    /^(h?)(ttps?:\/\/kasasagi\.hinaproject\.com)/
]

export function updateOption(force){
    chrome.storage.local.get(null, function(data) {
        var currentOptionVersion = defaultOption.optionsVersion
        if(currentOptionVersion != data.optionsVersion || force){
            var o = defaultOption
            Object.keys(o).forEach(function(key){
                if(data[key]!=undefined){
                    if( typeof(o[key]) == typeof(data[key]) ){
                        o[key] = data[key]
                    }
                }
            })

            chrome.storage.local.set(o, function(){})
        }
    })
}

export function saveFont(font){
    chrome.storage.local.set({"applied_font": font});
}
export function saveSkin(skin){
    chrome.storage.local.set({"applied_skin": skin});
}
export function saveSkins(skins){
    chrome.storage.local.set({"skins": skins});
}
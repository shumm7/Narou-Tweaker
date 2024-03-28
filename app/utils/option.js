import { defaultValue, getExtensionVersion } from "./misc.js"

export const defaultOption = {
    optionsVersion: getExtensionVersion(),

    /* Extension */
    extAdvancedSettings: false,

    /* Novel */
    novelCustomStyle: true,
    novelCustomHeader: true,
    novelLegacyHeaderIcon: true,
    novelCustomHeaderScrollHidden: false,
    novelCustomHeaderMode: "scroll",
    novelCustomHeaderLeft: ["home", "info", "impression", "review", "pdf", "booklist"],
    novelCustomHeaderRight: ["siori", "option"],
    novelOptionModalSelected: 0,

    /* Workspace */
    workspaceBookmarkLayout: "0",
    
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
    additionalCSS: "",
    novelAuthorCustomSkin: true,

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
    correctionShowIllustration: true,
    correctionRemoveIllustrationLink: false,
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
                "color": "rgba(0, 0, 0, 0.5)",
                "hover": "rgba(67, 51, 242, 0.7)",
                "visited": "rgba(50, 38, 181, 0.7)"
            }
        },
        "css": ""
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
                "hover": "rgba(152, 189, 235, 0.7)",
                "visited": "rgba(114, 142, 176, 0.7)"
            }
        },
        "css": ""
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
                "hover": "rgba(67, 51, 242, 0.7)",
                "visited": "rgba(50, 38, 181, 0.7)"
            }
        },
        "css": ""
    },
    {
        "name": "標準設定〔小説家になろう〕",
        "description": "サイトのデフォルト",
        "customizable": false,
        "show": true,
        "style": {
            "novel": {
                "background": "#fff",
                "background_second": "#dfdfdf",
                "color": "#444"
            },
            "link": {
                "color_link": "#03c",
                "color_visited": "#857",
                "color_hover": "#393"
            },
            "sublist": {
                "color": "#444",
                "hover": "#9df",
                "visited": "#73a6bf"
            }
        },
        "css": ""
    },
    {
        "name": "ブラックモード1〔小説家になろう〕",
        "description": "サイトのデフォルト",
        "customizable": false,
        "show": true,
        "style": {
            "novel": {
                "background": "#000",
                "background_second": "#202020",
                "color": "#fff"
            },
            "link": {
                "color_link": "#fcf",
                "color_visited": "#857",
                "color_hover": "#f03"
            },
            "sublist": {
                "color": "#fff",
                "hover": "#f03",
                "visited": "#bf0026"
            }
        },
        "css": ""
    },
    {
        "name": "ブラックモード2〔小説家になろう〕",
        "description": "サイトのデフォルト",
        "customizable": false,
        "show": true,
        "style": {
            "novel": {
                "background": "#000",
                "background_second": "#202020",
                "color": "#ccc"
            },
            "link": {
                "color_link": "#ff9",
                "color_visited": "#857",
                "color_hover": "#cf0"
            },
            "sublist": {
                "color": "#ccc",
                "hover": "#cf0",
                "visited": "#99bf00"
            }
        },
        "css": ""
    },
    {
        "name": "通常1〔小説家になろう〕",
        "description": "サイトのデフォルト",
        "customizable": false,
        "show": true,
        "style": {
            "novel": {
                "background": "#ccf",
                "background_second": "#d9d9ff",
                "color": "#444"
            },
            "link": {
                "color_link": "#00f",
                "color_visited": "#009",
                "color_hover": "#00f"
            },
            "sublist": {
                "color": "#444",
                "hover": "#00f",
                "visited": "#0000bf"
            }
        },
        "css": ""
    },
    {
        "name": "通常2〔小説家になろう〕",
        "description": "サイトのデフォルト",
        "customizable": false,
        "show": true,
        "style": {
            "novel": {
                "background": "#cfc",
                "background_second": "#b3dfb3",
                "color": "#444"
            },
            "link": {
                "color_link": "#00f",
                "color_visited": "#009",
                "color_hover": "#00f"
            },
            "sublist": {
                "color": "#444",
                "hover": "#00f",
                "visited": "#0000bf"
            }
        },
        "css": ""
    },
    {
        "name": "シンプル〔小説家になろう〕",
        "description": "サイトのデフォルト",
        "customizable": false,
        "show": true,
        "style": {
            "novel": {
                "background": "#fafafa",
                "background_second": "#dbdbdb",
                "color": "#444"
            },
            "link": {
                "color_link": "#00f",
                "color_visited": "#009",
                "color_hover": "#393"
            },
            "sublist": {
                "color": "#444",
                "hover": "#393",
                "visited": "#267326"
            }
        },
        "css": ""
    },
    {
        "name": "おすすめ設定〔小説家になろう〕",
        "description": "サイトのデフォルト",
        "customizable": false,
        "show": true,
        "style": {
            "novel": {
                "background": "#edf7ff",
                "background_second": "#cfd8df",
                "color": "#000"
            },
            "link": {
                "color_link": "#00f",
                "color_visited": "#009",
                "color_hover": "#00f"
            },
            "sublist": {
                "color": "#444",
                "hover": "#00f",
                "visited": "#0000bf"
            }
        },
        "css": ""
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

export function updateOption(force, data){

    function update(data){
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
    }

    if(data){
        update(data)
    }else{
        chrome.storage.local.get(null, function(data) {
            update(data)
        })
    }
}

export function formatSkinData(raw){
  
    // name
    if("name" in raw === false){raw.name = "" }
    if(typeof raw.name != typeof ""){raw.name = "" }
    if(raw.name.trim().length==0){raw.name="新規スキン"}

    // style
    if("style" in raw === false){raw.style = {}}
    if("novel" in raw.style === false){raw.style.novel = {}}
    if("link" in raw.style === false){raw.style.link = {}}
    if("sublist" in raw.style === false){raw.style.sublist = {}}

    return {
        name: raw.name,
        description: defaultValue(raw.description, ""),
        show: true,
        customizable: true,
        style: {
        novel: {
            background: defaultValue(raw.style.novel.background, "#fff"),
            background_second: defaultValue(raw.style.novel.background_second, "#dfdfdf"),
            color: defaultValue(raw.style.novel.color, "#444")
        },
        link: {
            color_link: defaultValue(raw.style.link.color_link, "#03c"),
            color_visited: defaultValue(raw.style.link.color_visited, "#857"),
            color_hover: defaultValue(raw.style.link.color_visited, "#393"),
        },
        sublist: {
            color: defaultValue(raw.style.sublist.color, "#444"),
            hover: defaultValue(raw.style.sublist.hover, "#9df"),
            visited: defaultValue(raw.style.sublist.visited, "#73a6bf"),
        }
        },
        css: defaultValue(raw.css, ""),
    }
}
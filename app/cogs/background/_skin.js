import { defaultValue } from "/utils/misc.js"
import { defaultOption, localFont, localSkins, localFontFamily } from "/utils/option.js"
import { makeSkinCSS } from "/utils/skin.js"

export function skinListener(){
    makeSkin()

    chrome.storage.local.onChanged.addListener(function(changes){
        if(changes.skins!=undefined ||
            changes.selectedSkin!=undefined ||
            changes.fontSelectedFontFamily!=undefined ||
            changes.fontFontFamilyList!=undefined ||
            changes.fontFontSize!=undefined ||
            changes.fontLineHeight!=undefined ||
            changes.fontTextRendering!=undefined ||
            changes.fontWidth!=undefined
        ){
            makeSkin()
        }
        if(changes.skins!=undefined ||
            changes.workspaceEditorSelectedSkin!=undefined ||
            changes.workspaceEditorSelectedFontFamily!=undefined ||
            changes.workspaceEditorFontFamilyList!=undefined ||
            changes.workspaceEditorFontSize!=undefined ||
            changes.workspaceEditorLineHeight!=undefined ||
            changes.workspaceEditorTextRendering!=undefined ||
            changes.workspaceEditorWidth!=undefined
        ){
            makeEditorSkin()
        }
    })
}

function makeSkin(){
    chrome.storage.local.get(null, (data) => {
        const skin_idx = defaultValue(data.selectedSkin, defaultOption.selectedSkin)
        const skins = localSkins.concat(defaultValue(data.skins, defaultOption.skins))
        const skin = skins[skin_idx]

        var rule = ""

        /* Font */
        const selectedFontFamily = defaultValue(data.fontSelectedFontFamily, defaultOption.fontSelectedFontFamily)
        var fontFamilyList = localFontFamily.concat(defaultValue(data.fontFontFamilyList, defaultOption.fontFontFamilyList))
        var fontFamily_Current 
        var fontCss

        if(fontFamilyList.length<=selectedFontFamily || selectedFontFamily<0){
            fontFamily_Current = localFontFamily[0].font
            fontCss = ""
        }else{
            fontFamily_Current = fontFamilyList[selectedFontFamily].font
            fontCss = fontFamilyList[selectedFontFamily].css
        }

        const fontSize = defaultValue(data.fontFontSize, defaultOption.fontFontSize) + localFont["font-size"]
        const lineHeight = defaultValue(data.fontLineHeight, defaultOption.fontLineHeight) + localFont["line-height"]
        const textRendering = defaultValue(data.fontTextRendering, defaultOption.fontTextRendering)
        const width = localFont["width"] * defaultValue(data.fontWidth, defaultOption.fontWidth)
        const widthRatio = defaultValue(data.fontWidth, defaultOption.fontWidth)

        rule += `
        #novel_honbun:not(.novelreport_novelview) {
            line-height: ${lineHeight}% !important;
            font-size: ${fontSize}% !important;
        }
        #novel_honbun:not(.novelreport_novelview),
        .p-novel__text--preface,
        .p-novel__text--afterword {
            /* 本文 あとがき まえがき*/
            max-width: 100vw;
            width: ${width}px;
        }
        `
        
        rule += `
        html body#container,
        #novel_color,
        #contents_main {
            font-family: ${fontFamily_Current};
            text-rendering: ${textRendering};
        }
        .narou-tweaker--series #container {
            font-family: ${fontFamily_Current};
            text-rendering: ${textRendering};
        }
        .narou-tweaker .novel-titles#ep-0,
        .narou-tweaker .novel-titles#ep-1 {
            font-family: ${fontFamily_Current};
            text-rendering: ${textRendering};
        
        }

        
        #novel_color,
        .contents1 {
            max-width: 100vw;
            width: calc(max(${width}px, 730px));
        }
        .narou-tweaker-vertical #novel_vertical_items {
            padding-top: calc(5vh * ${widthRatio}) !important;
            padding-bottom: calc(5vh * ${widthRatio}) !important;
        }
        `

        /* Option Modal */
        rule += `
        .novel-option--font-button#current {
            font-family: ${fontFamily_Current};
        }
        `

        chrome.storage.local.set({
            novelAppliedSkinCSS: makeSkinCSS(skin, data.novelCustomStyle),
            novelAppliedFontCSS: rule,
            novelSkinCustomCSS: skin.css,
            novelFontCustomCSS: fontCss
        })
    })
}

function makeEditorSkin(){
    chrome.storage.local.get(null, (data) => {
        const skin_idx = defaultValue(data.workspaceEditorSelectedSkin, defaultOption.workspaceEditorSelectedSkin)
        const skins = localSkins.concat(defaultValue(data.skins, defaultOption.skins))
        if(skins.length<skin_idx || skin_idx<0){
            skin_idx = 0
            chrome.storage.local.set({workspaceEditorSelectedSkin: skin_idx})
        }
        const skin = skins[skin_idx]
        const s = skin.style
        let skin_rule = ""

        skin_rule += `
        body.narou-tweaker-custom-editor,
        .narou-tweaker-custom-editor .nt-editor .nt-editor--header,
        .narou-tweaker-custom-editor .nt-editor .nt-editor--footer,
        .narou-tweaker-custom-editor .nt-editor--footer .nt-editor--footer-items {
            background-color: ${s.novel.background};
        }
        .narou-tweaker-custom-editor .nt-editor--body,
        .narou-tweaker-custom-editor .nt-editor--main-items,
        .narou-tweaker-custom-editor .nt-editor .nt-editor--header,
        .narou-tweaker-custom-editor .nt-editor .nt-editor--footer,
        .narou-tweaker-custom-editor textarea[name="novel"],
        .narou-tweaker-custom-editor textarea[name="preface"],
        .narou-tweaker-custom-editor textarea[name="postscript"],
        .narou-tweaker-custom-editor textarea[name="freememo"] {
            color: ${s.novel.color};
        }
        .narou-tweaker-custom-editor .nt-editor--footer-textcount .nt-editor--footer-textcount-unit {
            color: ${s.sublist.color};
        }
        .narou-tweaker-custom-editor .nt-editor .nt-editor--header,
        .narou-tweaker-custom-editor .nt-editor .nt-editor--footer {
            border-color: ${s.novel.background_second};
        }
        .narou-tweaker-custom-editor .nt-editor .nt-button {
            border-color: ${s.novel.background_second};
        }
        .narou-tweaker-custom-editor .nt-editor .nt-button:hover,
        .narou-tweaker-custom-editor .nt-editor .nt-editor--footer-tab-item:hover {
            background-color: ${s.novel.background_second};
        }
        .narou-tweaker-custom-editor .nt-editor .nt-button:disabled {
            background-color: ${s.novel.background_second};
            color: ${s.novel.color};
        }
        .narou-tweaker-custom-editor .nt-search-box {
            color: ${s.novel.color};
            background-color: ${s.novel.background_second};
            border-color: ${s.sublist.color};
        }
        .narou-tweaker-custom-editor .nt-search-box--field-dummy-outer,
        .narou-tweaker-custom-editor .nt-search-box--field {
            background-color: ${s.novel.background};
            border-color: ${s.sublist.color};
        }
        `

        const selectedFontFamily = defaultValue(data.workspaceEditorSelectedFontFamily, defaultOption.workspaceEditorSelectedFontFamily)
        const fontFamilyList = localFontFamily.concat(defaultValue(data.fontFontFamilyList, defaultOption.fontFontFamilyList))
        var fontFamily_Current 
        var fontCss

        if(fontFamilyList.length<=selectedFontFamily || selectedFontFamily<0){
            fontFamily_Current = localFontFamily[0].font
            fontCss = ""
        }else{
            fontFamily_Current = fontFamilyList[selectedFontFamily].font
            fontCss = fontFamilyList[selectedFontFamily].css
        }

        const fontSize = defaultValue(data.workspaceEditorFontSize, defaultOption.workspaceEditorFontSize) + localFont["font-size"]
        const lineHeight = defaultValue(data.workspaceEditorLineHeight, defaultOption.workspaceEditorLineHeight) + localFont["line-height"]
        const textRendering = defaultValue(data.workspaceEditorTextRendering, defaultOption.workspaceEditorTextRendering)
        const width = localFont["width"] * defaultValue(data.workspaceEditorWidth, defaultOption.workspaceEditorWidth)
        const widthRatio = defaultValue(data.workspaceEditorWidth, defaultOption.workspaceEditorWidth)
        let font_rule = ""

        font_rule += `
        .narou-tweaker-custom-editor .nt-editor .nt-editor--body {
            text-rendering: ${textRendering};
            font-family: ${fontFamily_Current};
        }
        .narou-tweaker-custom-editor textarea[name="novel"],
        .narou-tweaker-custom-editor textarea[name="preface"],
        .narou-tweaker-custom-editor textarea[name="postscript"],
        .narou-tweaker-custom-editor textarea[name="freememo"] {
            line-height: ${lineHeight}% !important;
            width: ${width}px;
            max-width: 100%;
        }
        .narou-tweaker-custom-editor .nt-editor--main-novel,
        .narou-tweaker-custom-editor .nt-editor--preface,
        .narou-tweaker-custom-editor .nt-editor--postscript,
        .narou-tweaker-custom-editor .nt-editor--freememo {
            max-width: 100% !important;
            width: ${width}px;
            line-height: ${lineHeight}% !important;
            font-size: ${fontSize}% !important;
        }
        `

        chrome.storage.local.set({
            workspaceEditorAppliedSkinCSS: skin_rule,
            workspaceEditorAppliedFontCSS: font_rule,
            workspaceEditorSkinCustomCSS: skin.css,
            workspaceEditorFontCustomCSS: fontCss
        })
    })
}
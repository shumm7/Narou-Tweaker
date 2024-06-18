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
    })
}

function makeSkin(){
    chrome.storage.local.get(null, (data) => {
        const skin_idx = defaultValue(data.selectedSkin, defaultOption.selectedSkin)
        const skins = localSkins.concat(defaultValue(data.skins, defaultOption.skins))
        const skin = skins[skin_idx]

        /* Skin */
        var rule = makeSkinCSS(skin, data.novelCustomStyle)

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
        #novel_a,
        #novel_p {
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
        
        chrome.storage.local.set({appliedSkinCSS: rule, appliedUserSkinCSS: skin.css, appliedUserFontCSS: fontCss})
    })
}
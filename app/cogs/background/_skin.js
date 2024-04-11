import { defaultValue } from "../../utils/misc.js"
import { defaultOption, localFont, localSkins } from "../../utils/option.js"
import { makeSkinCSS } from "../../utils/skin.js"

export function skinListener(){
    makeSkin()

    chrome.storage.local.onChanged.addListener(function(changes){
        if(changes.skins!=undefined ||
            changes.selectedSkin!=undefined ||
            changes.fontFontFamily!=undefined ||
            changes.fontFontFamily_Custom!=undefined ||
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
        var fontFamily = defaultValue(data.fontFontFamily, defaultOption.fontFontFamily)
        var fontFamily_Custom = defaultValue(data.fontFontFamily_Custom, defaultOption.fontFontFamily_Custom)
        var fontFamily_Current 
        var fontSize = defaultValue(data.fontFontSize, defaultOption.fontFontSize) + localFont["font-size"]
        var lineHeight = defaultValue(data.fontLineHeight, defaultOption.fontLineHeight) + localFont["line-height"]
        var textRendering = defaultValue(data.fontTextRendering, defaultOption.fontTextRendering)
        var width = localFont["width"] * defaultValue(data.fontWidth, defaultOption.fontWidth)

        if(fontFamily=="custom"){
            fontFamily_Current = fontFamily_Custom
        }else{
            fontFamily_Current = localFont["font-family"][fontFamily]
        }

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
        
        #novel_color,
        .contents1 {
            max-width: 100vw;
            width: calc(max(${width}px, 730px));
        }
        `

        /* Option Modal */
        rule += `
        .novel-option--font-button#gothic {
            font-family: ${localFont["font-family"].gothic};
        }
        .novel-option--font-button#serif {
            font-family: ${localFont["font-family"].serif};
        }
        .novel-option--font-button#custom {
            font-family: ${fontFamily_Custom};
        }
        `

        chrome.storage.local.set({appliedSkinCSS: rule})
    })
}
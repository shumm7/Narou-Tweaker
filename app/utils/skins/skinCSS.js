function generateSkinVariable(style){
    if(Array.isArray(style)){
        var root = ""

        /* .js-customlayout */
        style.forEach(function(s){
            if(s){
                if(typeof s.value ==="string" && typeof s.key ==="string"){
                    if(s.type=="variable"){
                        root += `--${s.key}:var(--${s.value})!important;`
                    }else{
                        root += `--${s.key}:${s.value}!important;`
                    }
                }
            }
        })
        return `:root,body,*[class^="js-customlayout"],.narou-tweaker--custom-skin[class^="js-customlayout"]{${root}}`
    }else{
        return ""
    }
}

/* スキン用CSSを生成 */
export function makeCSS(skin, local){
    var rule = ""
    if(!skin){
        skin = {}
    }

    /* データからスキンを生成 */
    rule += generateSkinVariable(skin.style)

    /* 簡易的なスキン */
    if(local.novelCustomStyle){
        var customStyle = [
            {key: "color-custom-border", value: "color-custom-body-bg", type: "variable"},
            {key: "color-custom-border--sub", value: "color-custom-pager-border-disabled", type: "variable"},
            {key: "color-custom-attention-text", value: "color-custom-text", type: "variable"},
            {key: "color-custom-attention-bg", value: "color-custom-body-bg", type: "variable"},
            {key: "color-custom-attention-border", value: "color-custom-border--sub", type: "variable"},
            
            {key: "color-custom-novelinfo-datatable-border", value: "color-custom-border--sub", type: "variable"},
            {key: "color-custom-novelinfo-table-border", value: "color-custom-border--sub", type: "variable"},
            {key: "color-custom-novelinfo-header-border", value: "color-custom-border", type: "variable"},
            {key: "color-custom-novelinfo-noveltype-text", value: "color-custom-text", type: "variable"},
            {key: "color-custom-novelinfo-noveltype-bg", value: "color-custom-bg--sub", type: "variable"},
            {key: "color-custom-novelinfo-noveltype-border", value: "color-custom-border--sub", type: "variable"},
            {key: "color-custom-novelcom-box-bg", value: "color-custom-bg--sub", type: "variable"},
            {key: "color-custom-novelcom-box-border", value: "color-custom-border--sub", type: "variable"},
            {key: "color-custom-novelcom-box-bg--res", value: "color-custom-bg--sub", type: "variable"},
            {key: "color-custom-novelcom-box-border--res", value: "color-custom-border--sub", type: "variable"},
            {key: "color-custom-novelcom-box-text--res", value: "color-custom-text", type: "variable"},
            {key: "color-custom-novelcom-box-bg--review", value: "color-custom-bg--sub", type: "variable"},
            {key: "color-custom-novelcom-box-border--review", value: "color-custom-border--sub", type: "variable"},
            {key: "color-custom-novelcom-form-bg", value: "transparent", type: "color"},
            {key: "color-custom-novelcom-form-border", value: "color-custom-border--sub", type: "variable"},
            {key: "color-custom-novelcom-form-text", value: "color-custom-text", type: "variable"},
            {key: "color-custom-novelcom-episode-bg", value: "color-custom-bg--sub", type: "variable"},
            {key: "color-custom-novelcom-episode-text", value: "color-custom-text--sub", type: "variable"},
            {key: "color-custom-novelcom-warning-bg", value: "color-custom-bg--sub", type: "variable"},
            {key: "color-custom-novelreport-highlight", value: "color-custom-bg--sub", type: "variable"},
            {key: "color-custom-novelreport-box-bg", value: "color-custom-bg--sub", type: "variable"},
            {key: "color-custom-novelreport-box-border", value: "color-custom-border--sub", type: "variable"},
        ]
        rule = generateSkinVariable(customStyle) + rule
    }

    // スキンが適用されるまでの一時的な繋ぎ（画面のチラツキ防止）
    rule += `
        body:not(.narou-tweaker--custom-skin) {
            background: var(--color-custom-body-bg);
            color: var(--color-custom-text);
        }
        body:not(.narou-tweaker--custom-skin) {
            a:link {
                color: var(--color-custom-link);
            }
            a:visited {
                color: var(--color-custom-link-visited);
            }
            a:hover {
                color: var(--color-custom-link-hover);
            }
        }
    `
    rule += `
        .c-announce-box {
            background-color: var(--color-custom-body-bg);
            color: var(--color-custom-text);
        }
    `
    if(local.novelCustomStyle){
        rule += `
        .novel-titles .novel-title,
        .novel-titles .novel-author,
        .novel-chapter {
            color: var(--color-custom-text--sub) !important;
        }
        .novel-titles#ep-0 .novel-title,
        .novel-titles#ep-1 .novel-title {
            color: var(--color-custom-text) !important;
        }

        .novel-titles {
            line-height: normal;
            word-break: break-word;
            text-align: left;
        }
        .novel-titles .novel-title {
            line-height: normal;
            font-weight: bold;
            word-break: break-word;
            word-break: auto-phrase;
        }
        .novel-titles .novel-author {
            margin-top: .5em;
            font-size: 90%;
        }
        .novel-titles#ep-0,
        .novel-titles#ep-1 {
            text-align: center;
            margin-top: 4em;
            margin-bottom: 4em;
        }
        .novel-titles#ep-0 .novel-title,
        .novel-titles#ep-1 .novel-title {
            font-size: 3em;
        }
        .novel-titles#ep-0 .novel-author,
        .novel-titles#ep-1 .novel-author {
            text-align: center;
            font-size: 2em;
            margin-top: .5em;
        }
        .novel-chapter {
            text-align: center;
            font-size: 90%;
        }
        .novel-titles a,
        #novel_vertical_items .novel-titles a {
            color: inherit !important;
        }
        `
    }

    /* ヘッダ有効化時の残像を非表示 */
    if(local.novelCustomHeaderType == "1" || local.novelCustomHeaderType=="2"){
        rule += `
        .l-scrollheader,
        .l-scrollheader {
            display: none !important;
        }
        `
    }



    return rule
}
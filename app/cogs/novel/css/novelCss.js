/* manifest.jsonよりも高速にCSSを挿入するためのコード */
insertCss()

function insertCss(){
    chrome.storage.local.get(null, function(data){
        let rule = ""
        
        /* 本文ページなどのUI調整 */
        if(data.novelCustomStyle){
                
            rule += `
            .c-announce-box {
                background-color: var(--color-custom-body-bg);
                color: var(--color-custom-text);
            }
            .novel-titles .novel-title,
            .novel-titles .novel-author,
            .novel-chapter {
                color: var(--color-custom-text--sub);
            }
            .novel-titles#ep-0 .novel-title,
            .novel-titles#ep-1 .novel-title {
                color: var(--color-custom-text);
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
                color: inherit;
            }
            `
        }

        /* ヘッダ有効化時の残像を非表示 */
        if(data.novelCustomHeaderType == "1" || data.novelCustomHeaderType=="2"){
            rule += `
            .l-scrollheader,
            .l-scrollheader {
                display: none !important;
            }
            `
        }

        if($("#narou-tweaker-style--common-novel-css").length){
            var l = $("#narou-tweaker-style--common-novel-css")
            l.text(l.text() + rule)
        }else{
            var l = $(`<style type="text/css" id="narou-tweaker-style--common-novel-css" class="narou-tweaker-style"></style>`)
            l.text(rule)
            $("html").append(l)
        }
    })
}
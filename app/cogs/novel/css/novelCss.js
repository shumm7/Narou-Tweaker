/* manifest.jsonよりも高速にCSSを挿入するためのコード */
insertCss()

function insertCss(){
    chrome.storage.local.get(null, function(data){
        let rule = ""
        
        /* 本文ページなどのUI調整 */
        rule += `
        .narou-tweaker .c-announce-box {
            background-color: var(--color-custom-body-bg);
            color: var(--color-custom-text);
        }
        .narou-tweaker .novel-titles .novel-title,
        .narou-tweaker .novel-titles .novel-author,
        .narou-tweaker .novel-chapter {
            color: var(--color-custom-text--sub);
        }
        .narou-tweaker .novel-titles#ep-0 .novel-title,
        .narou-tweaker .novel-titles#ep-1 .novel-title {
            color: var(--color-custom-text);
        }
        `

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
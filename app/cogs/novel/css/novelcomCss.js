/* manifest.jsonよりも高速にCSSを挿入するためのコード */
insertCss()

function insertCss(){
    chrome.storage.local.get(null, function(data){
        let rule = ``

        rule += `
        
        `

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
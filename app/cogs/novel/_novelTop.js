export function novelTop(){

    chrome.storage.local.get(null, (data) => {
        if(data.novelCustomStyle){
            $("body").addClass("narou-tweaker--custom-skin")
        }
        $("body").addClass("narou-tweaker--novel-top")
    })
    _showAllExtext()
}

function _showAllExtext(){
    chrome.storage.local.get(null, (data) => {
        if(data.novelShowAllExtext){
            var Extext = $("#novel_ex")
            var hiddenText = $("#novel_ex .hidden")
            if(hiddenText.length && Extext.length){
                var text = hiddenText[0].innerHTML
                $("#novel_ex .more").remove()
                $("#novel_ex .hidden").remove()
                $("#novel_ex span").remove()
                Extext[0].innerHTML += text
            }
        }
    })
}
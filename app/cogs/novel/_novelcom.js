
export function _novelcom(){
    _readImpression()
}

function _readImpression(){
if(location.pathname.match(/^\/impressionres\/confirm\/ncode\/\d*\/kanrino\/\d*\/*/))
    chrome.storage.local.get(null, function(data){
        if(data.workspaceImpressionMarkAsReadWhenReply && data.workspaceImpressionReadButton){
            if($("form #rescomment").length){
                const url = $("form:has(#rescomment)").prop("action").replace(/\/add\//, "/input/")

                $(document).on('submit','form:has(#rescomment)', function(){
                    if(!data.workspaceImpressionRead.includes(url)){
                        data.workspaceImpressionRead.push(url)
                        chrome.storage.local.set({workspaceImpressionRead: data.workspaceImpressionRead})
                    }
                })
            }
        }
    })
}

export function _novelcom(){
    _readImpression()
}

function _readImpression(){
if(location.pathname.match(/^\/impressionres\/confirm\/ncode\/\d*\/kanrino\/\d*\/*/))
    chrome.storage.local.get(null, function(data){
        if(data.workspaceImpressionMarkAsReadWhenReply && data.workspaceImpressionReadButton){
            if($("form #rescomment").length){
                const url = $("form:has(#rescomment)").prop("action").replace(/\/add\//, "/input/")

                chrome.storage.sync.get(null, function(data_s){
                    $(document).on('submit','form:has(#rescomment)', function(){
                        if(data_s.workspaceImpressionRead==undefined){l.workspaceImpressionRead = []}
                        if(!data_s.workspaceImpressionRead.includes(url)){
                            data_s.workspaceImpressionRead.push(url)
                            chrome.storage.sync.set({workspaceImpressionRead: data_s.workspaceImpressionRead})
                        }
                    })
                })
            }
        }
    })
}
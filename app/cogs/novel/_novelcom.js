import { indexToNcode } from "/utils/text.js"

export function _novelcom(){
    _readImpression()
}

function _readImpression(){
    if(location.pathname.match(/^\/impressionres\/confirm\/ncode\/\d+.*\/kanrino\/\d+\/*/)){
        var m = location.pathname.match(/^\/impressionres\/confirm\/ncode\/(\d+).*\/kanrino\/(\d+)\/*/)
        const ncode = indexToNcode(m[1])
        const kanrino = m[2]

        chrome.storage.local.get(null, function(data){
            if(data.workspaceImpressionMarkAsReadWhenReply && data.workspaceImpressionMarkedButton){
                if($("form #rescomment").length){

                    chrome.storage.sync.get(null, function(data_s){
                        $(document).on('submit','form:has(#rescomment)', function(){
                            if(data_s.workspaceImpressionMarked==undefined){l.workspaceImpressionMarked = {}}
                            if(!(ncode in data_s.workspaceImpressionMarked)){
                                data_s.workspaceImpressionMarked[ncode] = []
                            }
                            data_s.workspaceImpressionMarked[ncode].push(kanrino)
                            chrome.storage.sync.set({workspaceImpressionMarked: data_s.workspaceImpressionMarked})
                        })
                    })
                }
            }
        })
    }
}
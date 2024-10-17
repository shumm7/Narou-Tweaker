import { indexToNcode } from "/utils/text.js"
import { popHiddenList, popReadList, pushHiddenList, pushReadList } from "../workspace/_reactionTools.js"

export function _novelcom(){
    _readImpression()
}

function _readImpression(){
    try{
        if(location.pathname.match(/^\/impressionres\/confirm\/ncode\/\d+.*\/kanrino\/\d+\/*/)){
            var m = location.pathname.match(/^\/impressionres\/confirm\/ncode\/(\d+).*\/kanrino\/(\d+)\/*/)
            const ncode = indexToNcode(m[1])
            const kanrino = m[2]

            chrome.storage.local.get(null, function(data){
                try{
                    if(data.workspaceImpressionMarkAsReadWhenReply && data.workspaceImpressionMarkedButton){
                        if($("form #rescomment").length){
                            
                            $(document).on('submit','form:has(#rescomment)', function(){
                                pushReadList(ncode, kanrino)
                                if(data.workspaceImpressionHideButton && data.workspaceImpressionHideWhenMarked){
                                    pushHiddenList(ncode, kanrino)
                                }
                            })
                        }
                    }
                }catch(e){
                    console.warn(e)
                }
            })
        }
    }catch(e){
        console.warn(e)
    }
}
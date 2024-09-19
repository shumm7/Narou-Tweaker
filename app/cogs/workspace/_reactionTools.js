export function pushReadList(ncode, kanrino){
    chrome.storage.sync.get(["workspaceImpressionMarked"], function(l){
        if(l.workspaceImpressionMarked==undefined){l.workspaceImpressionMarked = {}}
        if(!(ncode in l.workspaceImpressionMarked)){
            l.workspaceImpressionMarked[ncode] = []
        }
        l.workspaceImpressionMarked[ncode].push(kanrino)
        chrome.storage.sync.set({workspaceImpressionMarked: l.workspaceImpressionMarked})
    })
}

export function popReadList(ncode, kanrino){
    chrome.storage.sync.get(["workspaceImpressionMarked"], function(l){
        if(l.workspaceImpressionMarked==undefined){l.workspaceImpressionMarked = {}}
        if(ncode in l.workspaceImpressionMarked){
            l.workspaceImpressionMarked[ncode] = l.workspaceImpressionMarked[ncode].filter(d => d!=kanrino)
            if(l.workspaceImpressionMarked[ncode].length === 0)[
                l.workspaceImpressionMarked[ncode] = undefined
            ]
            chrome.storage.sync.set({workspaceImpressionMarked: l.workspaceImpressionMarked})
        }
    })
}

export function pushHiddenList(ncode, kanrino){
    chrome.storage.sync.get(["workspaceImpressionHidden"], function(l){
        if(l.workspaceImpressionHidden==undefined){l.workspaceImpressionHidden = {}}
        if(!(ncode in l.workspaceImpressionHidden)){
            l.workspaceImpressionHidden[ncode] = []
        }
        l.workspaceImpressionHidden[ncode].push(kanrino)
        chrome.storage.sync.set({workspaceImpressionHidden: l.workspaceImpressionHidden})
    })
}

export function popHiddenList(ncode, kanrino){
    chrome.storage.sync.get(["workspaceImpressionHidden"], function(l){
        if(l.workspaceImpressionHidden==undefined){l.workspaceImpressionHidden = {}}
        if(ncode in l.workspaceImpressionHidden){
            l.workspaceImpressionHidden[ncode] = l.workspaceImpressionHidden[ncode].filter(d => d!=kanrino)
            if(l.workspaceImpressionHidden[ncode].length === 0)[
                l.workspaceImpressionHidden[ncode] = undefined
            ]
            chrome.storage.sync.set({workspaceImpressionHidden: l.workspaceImpressionHidden})
        }
    })
}
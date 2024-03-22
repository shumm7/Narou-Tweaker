import { checkPageDetail, getEpisode, getNcode } from "../novel/utils.js";

function setupContextMenu() {
    chrome.contextMenus.create({
        id: 'narou-tweaker-show-index',
        title: '目次を表示',
        contexts: ['page'],
		documentUrlPatterns : ["*://ncode.syosetu.com/*"]
    });
}

function setSidepanelData(ncode, episode){
    chrome.storage.session.set({ncode: null, episode: null});

    fetch(`https://api.syosetu.com/novelapi/api/?out=json&libtype=2&ncode=${ncode}`, {'method': 'GET'})
    .then(response => response.json())
    .then(result => {
        if(result[0].allcount==1){
            var novelData = {}
            const d = result[1]
            
            novelData.ncode = ncode
            novelData.episode = episode
            novelData.title = d.title
            novelData.author = d.writer
            novelData.userid = d.userid
            novelData.episode_no = d.general_all_no
            novelData.type = d.novel_type

            if(novelData.type==1){ //連載
                var fetches = []
                for(var i=1; i<=Math.ceil(novelData.episode_no/100); i++){
                    fetches.push(fetch(`https://ncode.syosetu.com/${ncode}/?p=${i}`, {'method': 'GET'}))
                }
                Promise.all(fetches).then((responses) => {
                    var docs = []
                    responses.forEach(function(response){
                        docs.push(response.text())
                    })
                    Promise.all(docs).then((texts) => {
                        novelData.docs = texts
                        chrome.storage.session.set(novelData);
                    })
                });

            }else{ //短編
                novelData.docs = []
                chrome.storage.session.set(novelData);
            }
        }
    })
}



export function sidepanelListener(){
    
    chrome.runtime.onInstalled.addListener(() => {
        chrome.storage.session.set({ncode: null, episode: null})
        setupContextMenu();
    })

    chrome.tabs.onActivated.addListener(function(activeInfo){
        console.log("activated")
        chrome.tabs.get(activeInfo.tabId, function(tab){
            chrome.storage.session.get(null, function(data){
                const ncode = getNcode(tab.url)
                const episode = getEpisode(tab.url)
                if(data.ncode!=ncode){
                    setSidepanelData(ncode, episode)
                }
                else{
                    if(data.episode!=episode){
                        chrome.storage.session.set({episode: episode})
                    }
                }
            })
        })
    })

    chrome.contextMenus.onClicked.addListener((data, tab) => {
        console.log("context")
        chrome.storage.session.set({ ncode: null });
        chrome.sidePanel.setOptions({
            tabId: tab.id,
            path: 'cogs/sidepanel/index/index.html'
        })
        chrome.sidePanel.open({
            tabId: tab.id
        })
        setSidepanelData(getNcode(tab.url), getEpisode(tab.url))
    });

    chrome.tabs.onUpdated.addListener((tabId, info, tab) => {
        console.log("updated")
        if (!tab.url) return;
        const url = new URL(tab.url);
        const detail = checkPageDetail(url)
        if (detail=="novel" || detail=="top" || detail=="info" || detail=="review" || detail=="impression") {
            chrome.sidePanel.setOptions({
                tabId,
                path: 'cogs/sidepanel/index/index.html',
                enabled: true
            });

            const ncode = getNcode(tab.url)
            const episode = getEpisode(tab.url)
            chrome.storage.session.get(null, function(data){
                if(data.ncode!=ncode){
                    setSidepanelData(ncode, episode)
                }
                else{
                    if(data.episode!=episode){
                        chrome.storage.session.set({episode: episode})
                    }
                }
            })

        }else{
            chrome.sidePanel.setOptions({
                tabId,
                enabled: false
            })
        }
        
    })
    
}
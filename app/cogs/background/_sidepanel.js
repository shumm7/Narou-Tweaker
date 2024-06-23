import { getNcode } from "/utils/ncode.js";
import { checkNovelPageDetail, getEpisode } from "../novel/utils.js";

/* Require permissions: 
    "contextMenus",
    "sidePanel"
*/

function setupContextMenu() {
    chrome.contextMenus.create({
        id: 'narou-tweaker-show-index',
        title: '目次を表示',
        contexts: ['page'],
		documentUrlPatterns : ["*://ncode.syosetu.com/*"]
    });
}

function setSidepanelData(ncode, episode){
    if(!ncode){return}
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
    if(typeof chrome.sidePanel == "undefined"){return} //Only Chrome
    var active = false

    /* On Installed */
    chrome.runtime.onInstalled.addListener(() => {
        chrome.storage.session.set({ncode: null, episode: null})
        setupContextMenu();
    })

    /* サイドパネルのON/OFF検知 */
    chrome.runtime.onConnect.addListener(function (port) {

        if (port.name === 'sidePanelIndex') {
            active = true
            port.onDisconnect.addListener(async () => {
                active = false
            });

            chrome.tabs.query({active: true, lastFocusedWindow: true, currentWindow: true},function(tabs){
                if(tabs[0]!=undefined){
                    chrome.storage.session.get(null, function(data){
                        const ncode = getNcode(tabs[0].url)
                        const episode = getEpisode(tabs[0].url)
                        if(data.ncode==ncode){
                            setSidepanelData(ncode, episode)
                        }
                    })
                }
            })
            
        }
      });


    /* タブ有効化時 */
    chrome.tabs.onActivated.addListener(function(activeInfo){
        chrome.tabs.get(activeInfo.tabId, function(tab){
            chrome.storage.session.get(null, function(data){
                const ncode = getNcode(tab.url)
                const episode = getEpisode(tab.url)
                if(data.ncode!=ncode){
                    if(!active){return}
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

    /* コンテキストメニュークリック時 */
    chrome.contextMenus.onClicked.addListener((data, tab) => {
        chrome.storage.session.set({ ncode: null });
        chrome.sidePanel.setOptions({
            tabId: tab.id,
            path: 'cogs/sidepanel/index/index.html'
        })
        chrome.sidePanel.open({
            tabId: tab.id
        })
        setSidepanelData(getNcode(tab.url), getEpisode(tab.url))
        active = true
    });

    /* リロード時 */
    chrome.tabs.onUpdated.addListener((tabId, info, tab) => {
        if (!tab.url) return;
        const url = new URL(tab.url);
        if (url.hostname.match(/^(.+\.|)syosetu\.com/)) {
            chrome.sidePanel.setOptions({
                tabId,
                path: 'cogs/sidepanel/index/index.html',
                enabled: true
            });

            const ncode = getNcode(tab.url)
            const episode = getEpisode(tab.url)
            chrome.storage.session.get(null, function(data){
                if(data.ncode!=ncode){
                    if(!active){return}
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
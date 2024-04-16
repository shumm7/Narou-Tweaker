export function yomouCssListener(){
    makeRankTopCSS()

    chrome.storage.local.onChanged.addListener(function(changes){
        if(changes.yomouRankTop_ShowDescription!=undefined ||
            changes.yomouRankTop_ShowTags!=undefined ||
            changes.yomouRankTop_ShowLength!=undefined ||
            changes.yomouRankTop_ShowPoints!=undefined ||
            changes.yomouRankTop_ShowNovelInfoLink!=undefined ||
            changes.yomouRankTop_ShowUpdateDate!=undefined
        ){
            makeRankTopCSS()
        }
    })
}

function makeRankTopCSS(){
    chrome.storage.local.get(null, (data) => {
        var rule = ""

        if(!data.yomouRankTop_ShowTags){
            rule += `
            .p-ranktop-item__keyword{
                display: none;
            }
            `
        }
        if(!data.yomouRankTop_ShowLength){
            rule += `
            .p-ranktop-item__length{
                display: none;
            }
            `
        }
        if(!data.yomouRankTop_ShowPoints){
            rule += `
            .p-ranktop-item__points{
                display: none;
            }
            `
        }
        if(!data.yomouRankTop_ShowNovelInfoLink){
            rule += `
            .p-ranktop-item__novel-info{
                display: none;
            }
            `
        }
        if(!data.yomouRankTop_ShowUpdateDate){
            rule += `
            .p-ranktop-item__update-date{
                display: none !important;
            }
            `
        }

        chrome.storage.local.set({yomouRankTop_AppliedCSS: rule})
    })
}
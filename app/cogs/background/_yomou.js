export function yomouCssListener(){
    makeRankCSS()
    makeRankTopCSS()

    chrome.storage.local.onChanged.addListener(function(changes){
        if(
            changes.yomouRank_ShowNovelInfoLink!=undefined ||
            changes.yomouRank_ShowKasasagi!=undefined ||
            changes.yomouRank_ShowRaWi!=undefined ||
            changes.yomouRank_ShowDescription!=undefined ||
            changes.yomouRank_ShowTags!=undefined ||
            changes.yomouRank_ShowNovelInfoLink!=undefined ||
            changes.yomouRank_DevidePointsUnit!=undefined ||
            changes.yomouRank_PointsColor!=undefined
        ){
            makeRankCSS()
        }

        if(
            changes.yomouRank_DevidePointsUnit!=undefined ||
            changes.yomouRank_PointsColor!=undefined ||
            changes.yomouRankTop_ShowDescription!=undefined ||
            changes.yomouRankTop_ShowTags!=undefined ||
            changes.yomouRankTop_ShowLength!=undefined ||
            changes.yomouRankTop_ShowPoints!=undefined ||
            changes.yomouRankTop_ShowNovelInfoLink!=undefined ||
            changes.yomouRankTop_ShowUpdateDate!=undefined ||
            changes.yomouRankTop_ShowKasasagi!=undefined ||
            changes.yomouRankTop_ShowRaWi!=undefined
        ){
            makeRankTopCSS()
        }

    })
}


function makeRankCSS(){
    chrome.storage.local.get(null, (data) => {
        var rule = ""

        if(data.yomouRank_DevidePointsUnit){
            rule += `
                .p-ranklist-item__points {
                    color: #999;
                }
                .p-ranklist-item__points-value {
                    color: ${data.yomouRank_PointsColor};
                }
                .p-ranklist-item__points-unit {
                    margin-left: 0.2em;
                    font-size: 80%;
                }
            `
        }else{
            rule += `
                .p-ranklist-item__points {
                    color: #999;
                    color: ${data.yomouRank_PointsColor};
                }
            `
        }

        if(!data.yomouRank_ShowNovelInfoLink){
            rule += `
                .p-ranklist-item__novel-info {
                    display: none !important;
                }
            `
        }
        if(!data.yomouRank_ShowKasasagi){
            rule += `
                .p-ranklist-item__kasasagi {
                    display: none !important;
                }
            `
        }
        if(!data.yomouRank_ShowRaWi){
            rule += `
                .p-ranklist-item__novel-rawi {
                    display: none !important;
                }
            `
        }
        if(!data.yomouRank_ShowDescription){
            rule += `
                .p-ranklist-item__synopsis {
                    display: none !important;
                }
            `
        }
        if(!data.yomouRank_ShowTags){
            rule += `
                .p-ranklist-item__keyword {
                    display: none !important;
                }
            `
        }

        chrome.storage.local.set({yomouRank_AppliedCSS: rule})
    })
}

function makeRankTopCSS(){
    chrome.storage.local.get(null, (data) => {
        var rule = ""

        if(data.yomouRank_DevidePointsUnit){
            rule += `
                .p-ranktop-item__points {
                    color: #999;
                }
                .p-ranktop-item__points-value {
                    color: ${data.yomouRank_PointsColor};
                }
                .p-ranktop-item__points-unit {
                    margin-left: 0.2em;
                    font-size: 80%;
                }
            `
        }else{
            rule += `
                .p-ranktop-item__points {
                    color: #999;
                    color: ${data.yomouRank_PointsColor};
                }
            `

        }

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

        if(!data.yomouRankTop_ShowKasasagi){
            rule += `
            .p-ranktop-item__kasasagi{
                display: none !important;
            }
            `
        }


        if(!data.yomouRankTop_ShowRaWi){
            rule += `
            .p-ranktop-item__novel-rawi{
                display: none !important;
            }
            `
        }

        chrome.storage.local.set({yomouRankTop_AppliedCSS: rule})
    })
}
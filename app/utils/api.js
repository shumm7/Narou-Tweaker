function fetch(url, options){
    chrome.runtime.sendMessage(
        {
            action: "fetch",
            data: {url: url, options: options}
        }
    );
}

export function getNovelInfo(ncode){
    var url = "https://api.syosetu.com/novelapi/api/?out=json&libtype=2&ncode=" + ncode
    var options = {
        'method': 'GET'
    }
    fetch(url, options);
}

export function getUserInfo(userid){
    var url = "https://api.syosetu.com/userapi/api/?out=json&libtype=2&userid=" + userid
    var options = {
        'method': 'GET'
    }
    fetch(url, options);
}

export function getBigGenre(genre){
    if(genre==1){
        return "恋愛"
    }
    else if(genre==2){
        return "ファンタジー"
    }
    else if(genre==3){
        return "文芸"
    }
    else if(genre==4){
        return "SF"
    }
    else if(genre==99){
        return "その他"
    }
    else if(genre==98){
        return "ノンジャンル"
    }
    else{
        return ""
    }
}

export function getGenre(genre){
    if(genre==101){
        return "異世界〔恋愛〕"
    }
    else if(genre==102){
        return "現実世界〔恋愛〕"
    }
    else if(genre==201){
        return "ハイファンタジー〔ファンタジー〕"
    }
    else if(genre==202){
        return "ローファンタジー〔ファンタジー〕"
    }
    else if(genre==301){
        return "純文学〔文芸〕"
    }
    else if(genre==302){
        return "ヒューマンドラマ〔文芸〕"
    }
    else if(genre==303){
        return "歴史〔文芸〕"
    }
    else if(genre==304){
        return "推理〔文芸〕"
    }
    else if(genre==305){
        return "ホラー〔文芸〕"
    }
    else if(genre==306){
        return "アクション〔文芸〕"
    }
    else if(genre==307){
        return "コメディー〔文芸〕"
    }
    else if(genre==401){
        return "VRゲーム〔SF〕"
    }
    else if(genre==402){
        return "宇宙〔SF〕"
    }
    else if(genre==403){
        return "空想科学〔SF〕"
    }
    else if(genre==404){
        return "パニック〔SF〕"
    }
    else if(genre==9901){
        return "童話〔その他〕"
    }
    else if(genre==9902){
        return "詩〔その他〕"
    }
    else if(genre==9903){
        return "エッセイ〔その他〕"
    }
    else if(genre==9904){
        return "リプレイ〔その他〕"
    }
    else if(genre==9999){
        return "その他〔その他〕"
    }
    else if(genre==9801){
        return "ノンジャンル〔ノンジャンル〕"
    }
    else{
        return ""
    }
}

export function getNovelType(tp){
    if(tp==1){
        return "連載"
    }
    else if(tp==2){
        return "短編"
    }else{
        return ""
    }
}

export function getNovelEnd(state){
    if(state==0){
        return "完結"
    }
    else if(state==1){
        return "連載中"
    }else{
        return ""
    }
}
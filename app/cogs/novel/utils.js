export function getEpisode(url){
    if(url==undefined){
        url = location
    }else{
        try{
            url = new URL(url)
        }catch(e){
            return
        }
    }

    if(url.hostname=="ncode.syosetu.com" || url.hostname=="novel18.syosetu.com"){
        if (url.pathname.match(/^\/[n|N]\d{4}[a-zA-Z]{2}\/\d+\/*$/)){ /* Story */
            return parseInt(url.pathname.match(/^\/[n|N]\d{4}[a-zA-Z]{2}\/(\d+)\/*$/)[1])
        }
    }
    return 0
}

export function checkNovelPageDetail(url){
    if(url==undefined){
        url = location
    }else{
        try{
            url = new URL(url)
        }catch(e){
            return
        }
    }

    if(url.hostname=="ncode.syosetu.com" || url.hostname=="novel18.syosetu.com"){
        if (url.pathname.match(/^\/[n|N]\d{4}[a-zA-Z]{2}\/\d+\/*$/)){ /* Story */
            return "novel"
        }
        else if (url.pathname.match(/^\/[n|N]\d{4}[a-zA-Z]{2}\/*$/)){ /* Top */
            if((typeof $)!=="undefined"){
                if($("#novel_honbun").length){
                    return "novel"
                }else{
                    return "top"
                }
            }else{
                return "novel"
            }
        }
        else if (url.pathname.match(/\/novelview\/infotop\/ncode\/[n|N]\d{4}[a-zA-Z]{2}\/*/)){ /* Novel Info */
            return "info"
        }
        else if(url.pathname.match(/^\/novelpdf\/creatingpdf\/ncode\/[n|N]\d{4}[a-zA-Z]{2}\/*$/)){ /* PDF */
            return "pdf"
        }
        else if(url.pathname.match(/^\/txtdownload\/top\/ncode\/[n|N]\d{4}[a-zA-Z]{2}\/*$/)){ /* TXT */
            return "txt"
        }
        else if(url.pathname.match(/^\/[s|S]\d{4}[a-zA-Z]{1,}\/*$/)){ /* シリーズ */
            return "series"
        }
    }else if(url.hostname=="novelcom.syosetu.com" || url.hostname=="novelcom18.syosetu.com"){
        if (url.pathname.match(/^\/impression\/list\/ncode\/\d+\/*.*$/)){ /* Impression */
            return "impression"
        }
        else if (url.pathname.match(/^\/novelreview\/list\/ncode\/\d+\/*.*$/)){ /* Review */
            return "review"
        }
        else if (url.pathname.match(/^\/novelreport\/input\/ncode\/\d+\/*.*$/)){ /* 誤字報告 */
            return "report"
        }
        else if(url.pathname.match(/^\/[s|S]\d{4}[a-zA-Z]{1,}\/*$/)){ /* シリーズ */
            return "series"
        }
    }
}

export function isR18(url){
    if(url==undefined){
        url = location
    }else{
        try{
            url = new URL(url)
        }catch(e){
            return
        }
    }

    if(url.hostname=="ncode.syosetu.com" || url.hostname=="novelcom.syosetu.com"){
        return false
    }
    else if(url.hostname=="novelcom18.syosetu.com" || url.hostname=="novel18.syosetu.com"){
        return true
    }
}
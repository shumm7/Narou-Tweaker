import { indexToNcode } from "/utils/text.js"

export function getNcode(url){
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
        if (url.pathname.match(/^\/[n|N]\d+[a-zA-Z]+\/\d+\/*$/)){ /* Story */
            return url.pathname.match(/^\/([n|N]\d+[a-zA-Z]+)\/\d+\/*$/)[1].toLowerCase()
        }
        else if (url.pathname.match(/^\/[n|N]\d+[a-zA-Z]+\/*$/)){ /* Top */
            return url.pathname.match(/^\/([n|N]\d+[a-zA-Z]+)\/*$/)[1].toLowerCase()
        }
        else if (url.pathname.match(/\/novelview\/infotop\/ncode\/[n|N]\d+[a-zA-Z]+\/*/)){ /* Novel Info */
            return url.pathname.match(/\/novelview\/infotop\/ncode\/([n|N]\d+[a-zA-Z]+)\/*/)[1].toLowerCase()
        }
        else if(url.pathname.match(/^\/novelpdf\/creatingpdf\/ncode\/[n|N]\d+[a-zA-Z]+\/*$/)){ /* PDF */
            return url.pathname.match(/^\/novelpdf\/creatingpdf\/ncode\/([n|N]\d+[a-zA-Z]+)\/*$/)[1].toLowerCase()
        }
        else if(url.pathname.match(/^\/txtdownload\/top\/ncode\/[n|N]\d+[a-zA-Z]+\/*$/)){ /* TXT */
            return url.pathname.match(/^\/txtdownload\/top\/ncode\/([n|N]\d+[a-zA-Z]+)\/*$/)[1].toLowerCase()
        }
    }else if(url.hostname=="novelcom.syosetu.com" || url.hostname == "novelcom18.syosetu.com"){
        if (url.pathname.match(/^\/impression\/list\/ncode\/\d+\/*.*$/)){ /* Impression */
            return indexToNcode(url.pathname.match(/^\/impression\/list\/ncode\/(\d+)\/*.*$/)[1])
        }
        else if (url.pathname.match(/^\/impressionres\/.*\/ncode\/(\d+)\/*.*$/)){ /* Review */
            return indexToNcode(url.pathname.match(/^\/impressionres\/.*\/ncode\/(\d+)\/*.*$/)[1])
        }
        else if (url.pathname.match(/^\/novelreview\/list\/ncode\/(\d+)\/*.*$/)){ /* Review */
            return indexToNcode(url.pathname.match(/^\/novelreview\/list\/ncode\/(\d+)\/*.*$/)[1])
        }
        else if (url.pathname.match(/^\/novelreport\/.*\/ncode\/(\d+)\/*.*$/)){ /* Review */
            return indexToNcode(url.pathname.match(/^\/novelreport\/.*\/ncode\/(\d+)\/*.*$/)[1])
        }
    }   
}

export function getScode(url){
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
        if (url.pathname.match(/^\/[s|S]\d{4}[a-zA-Z]{1,}\/\d+\/*$/)){
            return url.pathname.match(/^\/([s|S]\d{4}[a-zA-Z]{1,})\/\d+\/*$/)[1].toLowerCase()
        }
    }
}

export function getEpisode(url){
    try{
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
            if (url.pathname.match(/^\/[n|N]\d+[a-zA-Z]+\/\d+\/*$/)){ /* Story */
                return parseInt(url.pathname.match(/^\/[n|N]\d+[a-zA-Z]+\/(\d+)\/*$/)[1])
            }
        }
        return 0
    }catch{
        return 0
    }
}

export function checkNovelPageDetail(url){
    try{
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
            if (url.pathname.match(/^\/[n|N]\d+[a-zA-Z]+\/\d+\/*$/)){ /* Story */
                return "novel"
            }
            else if (url.pathname.match(/^\/[n|N]\d+[a-zA-Z]+\/*$/)){ /* Top */
                if((typeof $)!=="undefined"){
                    if($(".p-novel__body").length){
                        return "novel"
                    }else{
                        return "top"
                    }
                }else{
                    return "novel"
                }
            }
            else if (url.pathname.match(/\/novelview\/infotop\/ncode\/[n|N]\d+[a-zA-Z]+\/*/)){ /* Novel Info */
                return "info"
            }
            else if(url.pathname.match(/^\/novelpdf\/creatingpdf\/ncode\/[n|N]\d+[a-zA-Z]+\/*$/)){ /* PDF */
                return "pdf"
            }
            else if(url.pathname.match(/^\/txtdownload\/top\/ncode\/[n|N]\d+[a-zA-Z]+\/*$/)){ /* TXT */
                return "txt"
            }
            else if(url.pathname.match(/^\/[s|S]\d{4}[a-zA-Z]{1,}\/*$/)){ /* シリーズ */
                return "series"
            }
        }else if(url.hostname=="novelcom.syosetu.com" || url.hostname=="novelcom18.syosetu.com"){
            if (url.pathname.match(/^\/impression\/list\/ncode\/\d+\/*.*$/)){ /* Impression */
                return "impression"
            }
            else if (url.pathname.match(/^\/impressionres\/.*\/ncode\/\d+\/*.*$/)){ /* Impression Reply */
                return "impressionres"
            }
            else if (url.pathname.match(/^\/novelreview\/list\/ncode\/\d+\/*.*$/)){ /* Review */
                return "review"
            }
            else if (url.pathname.match(/^\/novelreport\/.*\/ncode\/\d+\/*.*$/)){ /* 誤字報告 */
                return "report"
            }
            else if(url.pathname.match(/^\/[s|S]\d{4}[a-zA-Z]{1,}\/*$/)){ /* シリーズ */
                return "series"
            }
        }
    }catch{
        return 
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
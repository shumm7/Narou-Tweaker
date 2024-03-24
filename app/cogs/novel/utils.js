import { indexToNcode } from "../../utils/text.js"

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

    if(url.hostname=="ncode.syosetu.com"){
        if (url.pathname.match(/^\/[n|N]\d{4}[a-zA-Z]{2}\/\d+\/*$/)){ /* Story */
            return url.pathname.match(/^\/([n|N]\d{4}[a-zA-Z]{2})\/\d+\/*$/)[1].toLowerCase()
        }
        else if (url.pathname.match(/^\/[n|N]\d{4}[a-zA-Z]{2}\/*$/)){ /* Top */
            return url.pathname.match(/^\/([n|N]\d{4}[a-zA-Z]{2})\/*$/)[1].toLowerCase()
        }
        else if (url.pathname.match(/\/novelview\/infotop\/ncode\/[n|N]\d{4}[a-zA-Z]{2}\/*/)){ /* Novel Info */
            return url.pathname.match(/\/novelview\/infotop\/ncode\/([n|N]\d{4}[a-zA-Z]{2})\/*/)[1].toLowerCase()
        }
        else if(url.pathname.match(/^\/novelpdf\/creatingpdf\/ncode\/[n|N]\d{4}[a-zA-Z]{2}\/*$/)){ /* PDF */
            return url.pathname.match(/^\/novelpdf\/creatingpdf\/ncode\/([n|N]\d{4}[a-zA-Z]{2})\/*$/)[1].toLowerCase()
        }
        else if(url.pathname.match(/^\/txtdownload\/top\/ncode\/[n|N]\d{4}[a-zA-Z]{2}\/*$/)){ /* TXT */
            return url.pathname.match(/^\/txtdownload\/top\/ncode\/([n|N]\d{4}[a-zA-Z]{2})\/*$/)[1].toLowerCase()
        }
    }else if(url.hostname=="novelcom.syosetu.com"){
        if (url.pathname.match(/^\/impression\/list\/ncode\/\d+\/*.*$/)){ /* Impression */
            return indexToNcode(url.pathname.match(/^\/impression\/list\/ncode\/(\d+)\/*.*$/)[1])
        }
        else if (url.pathname.match(/^\/novelreview\/list\/ncode\/(\d+)\/*.*$/)){ /* Review */
            return indexToNcode(url.pathname.match(/^\/novelreview\/list\/ncode\/(\d+)\/*.*$/)[1])
        }
        else if (url.pathname.match(/^\/novelreport\/input\/ncode\/(\d+)\/*.*$/)){ /* Review */
            return indexToNcode(url.pathname.match(/^\/novelreport\/input\/ncode\/(\d+)\/*.*$/)[1])
        }
    }   
}

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

    if(url.hostname=="ncode.syosetu.com"){
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

    if(url.hostname=="ncode.syosetu.com"){
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
    }else if(url.hostname=="novelcom.syosetu.com"){
        if (url.pathname.match(/^\/impression\/list\/ncode\/\d+\/*.*$/)){ /* Impression */
            return "impression"
        }
        else if (url.pathname.match(/^\/novelreview\/list\/ncode\/\d+\/*.*$/)){ /* Review */
            return "review"
        }
        else if (url.pathname.match(/^\/novelreport\/input\/ncode\/\d+\/*.*$/)){ /* 誤字報告 */
            return "report"
        }
    }
}
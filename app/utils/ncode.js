import { indexToNcode } from "./text.js"

export function getNcode(url){
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
            else if (url.pathname.match(/^\/novelreview\/list\/ncode\/(\d+)\/*.*$/)){ /* Review */
                return indexToNcode(url.pathname.match(/^\/novelreview\/list\/ncode\/(\d+)\/*.*$/)[1])
            }
            else if (url.pathname.match(/^\/novelreport\/input\/ncode\/(\d+)\/*.*$/)){ /* Review */
                return indexToNcode(url.pathname.match(/^\/novelreport\/input\/ncode\/(\d+)\/*.*$/)[1])
            }
        }else if(url.hostname=="syosetu.com"){
            if (url.pathname.match(/^\/draftepisode\/input\/ncode\/\d+\/*/)){
                return indexToNcode(url.pathname.match(/^\/draftepisode\/input\/ncode\/(\d+)\/*/)[1])
            }
            else if (url.pathname.match(/^\/usernoveldatamanage\/.*\/ncode\/\d+\/*.*$/)){
                return indexToNcode(url.pathname.match(/^\/usernoveldatamanage\/updateinput\/ncode\/(\d+)\/*.*$/)[1])
            }
        }
    }catch{
        return
    }
}

export function getScode(url){
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
            if (url.pathname.match(/^\/[s|S]\d{4}[a-zA-Z]{1,}\/\d+\/*$/)){
                return url.pathname.match(/^\/([s|S]\d{4}[a-zA-Z]{1,})\/\d+\/*$/)[1].toLowerCase()
            }
        }
    }catch{
        return
    }
}
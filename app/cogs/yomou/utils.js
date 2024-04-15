

export function checkRankPageDetail(url){
    if(url==undefined){
        url = location
    }else{
        try{
            url = new URL(url)
        }catch(e){
            return {}
        }
    }

    var ret = {}
    if(url.hostname=="yomou.syosetu.com"){
        ret.site = "yomou"
        ret.r18 = false

        if (url.pathname.match(/^\/rank\/top\/*$/)){ /* Ranking Top */
            ret.detail = "rank"
            ret.type = "top"
        }else if(url.pathname.match(/^\/rireki\/list\/*$/)){ /* History */
            ret.detail = "history"
        }else if(url.pathname.match(/^\/search.php/)){ /* Search */
            ret.detail = "search"
        }else if(url.pathname.match(/^\/rank\/list\/type\/.*\/*$/)){ /* General Ranking */
            ret.detail = "rank"
            ret.type = "general"
            ret.category = url.pathname.match(/^\/rank\/list\/type\/(.*)\/*$/)[1]
        }else if(url.pathname.match(/^\/rank\/attnlist\/type\/.*\/*$/)){ /* Attn Ranking */
            ret.detail = "rank"
            ret.type = "attn"
            ret.category = url.pathname.match(/^\/rank\/attnlist\/type\/(.*)\/*$/)[1]
        }else if(url.pathname.match(/^\/rank\/genrelist\/type\/.*\/*$/)){ /* Genre Ranking */
            ret.detail = "rank"
            ret.type = "genre"
            ret.category = url.pathname.match(/^\/rank\/genrelist\/type\/(.*)\/*$/)[1]
        }else if(url.pathname.match(/^\/rank\/isekailist\/type\/.*\/*$/)){ /* Isekai Ranking */
            ret.detail = "rank"
            ret.type = "isekai"
            ret.category = url.pathname.match(/^\/rank\/isekailist\/type\/(.*)\/*$/)[1]
        } 

    }else if(url.hostname=="noc.syosetu.com"){
        ret.site = "noc"
        ret.r18 = true

        if (url.pathname.match(/^\/rank\/top\/*$/)){ /* Ranking Top */
            ret.detail = "rank"
            ret.type = "top"
        }else if(url.pathname.match(/^\/rireki\/list\/*$/)){ /* History */
            ret.detail = "history"
        }else if(url.pathname.match(/^\/search\/search\/*$/)){ /* Search */
            ret.detail = "search"
        }else if(url.pathname.match(/^\/rank\/list\/type\/.*\/*$/)){ /* General Ranking */
            ret.detail = "rank"
            ret.type = "general"
            ret.category = url.pathname.match(/^\/rank\/list\/type\/(.*)\/*$/)[1]
        }

    }else if(url.hostname=="mid.syosetu.com"){
        ret.site = "mid"
        ret.r18 = true

        if (url.pathname.match(/^\/rank\/top\/*$/)){ /* Ranking Top */
            ret.detail = "rank"
            ret.type = "top"
        }else if(url.pathname.match(/^\/rireki\/list\/*$/)){ /* History */
            ret.detail = "history"
        }else if(url.pathname.match(/^\/search\/search\/*$/)){ /* Search */
            ret.detail = "search"
        }else if(url.pathname.match(/^\/rank\/list\/type\/.*\/*$/)){ /* General Ranking */
            ret.detail = "rank"
            ret.type = "general"
            ret.category = url.pathname.match(/^\/rank\/list\/type\/(.*)\/*$/)[1]
        }

    }else if(url.hostname=="mnlt.syosetu.com"){
        ret.site = "mnlt"
        ret.r18 = true

        if (url.pathname.match(/^\/rank\/top\/*$/)){ /* Ranking Top */
            ret.detail = "rank"
            ret.type = "top"
            ret.category = "female"
        }else if(url.pathname.match(/^\/rank\/bltop\/*$/)){ /* BL Ranking Top */
            ret.detail = "rank"
            ret.type = "top"
            ret.category = "bl"
        }else if(url.pathname.match(/^\/rireki\/list\/*$/)){ /* History */
            ret.detail = "history"
        }else if(url.pathname.match(/^\/search\/search\/*$/)){ /* Search */
            ret.detail = "search"
        }else if(url.pathname.match(/^\/rank\/list\/type\/.*\/*$/)){ /* General Ranking */
            ret.detail = "rank"
            ret.type = "general_female"
            ret.category = url.pathname.match(/^\/rank\/list\/type\/(.*)\/*$/)[1]
        }else if(url.pathname.match(/^\/rank\/bllist\/type\/.*\/*$/)){ /* BL General Ranking */
            ret.detail = "rank"
            ret.type = "general_bl"
            ret.category = url.pathname.match(/^\/rank\/bllist\/type\/(.*)\/*$/)[1]
        }

    }

    return ret
}
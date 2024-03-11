
export function getNcode(){
    if (location.pathname.match(/\/n\d{4}[a-z]{2}\/\d+\//)){ /* Story */
        return location.pathname.match(/\/(n\d{4}[a-z]{2})\/\d+\//)[1]
    }
    else if (location.pathname.match(/\/n\d{4}[a-z]{2}\//)){ /* Top */
        return location.pathname.match(/\/(n\d{4}[a-z]{2})\//)[1]
    }
    else if (location.pathname.match(/\/novelview\/infotop\/ncode\/n\d{4}[a-z]{2}\//)){ /* Novel Info */
        return location.pathname.match(/\/novelview\/infotop\/ncode\/(n\d{4}[a-z]{2})\//)[1]
    }
}

export function getEpisode(){
    if (location.pathname.match(/\/n\d{4}[a-z]{2}\/\d+\//)){ /* Story */
        return parseInt(location.pathname.match(/\/n\d{4}[a-z]{2}\/(\d+)\//)[1])
    }
    else if (location.pathname.match(/\/n\d{4}[a-z]{2}\//)){ /* Top */
        return 0
    }
    else if (location.pathname.match(/\/novelview\/infotop\/ncode\/n\d{4}[a-z]{2}\//)){ /* Novel Info */
        return 0
    }
}
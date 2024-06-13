export function getIcode(url){
    if(url==undefined){
        url = location
    }else{
        try{
            url = new URL(url)
        }catch(e){
            return
        }
    }

    var icode
    var userid
    if(url.protocol=="https:" || url.protocol=="http:"){
        if(url.host.match(/^[0-9]+\.mitemin\.net$/)){
            userid = url.host.match(/^([0-9]+)\.mitemin\.net$/)[1]
            if(url.pathname.match(/^\/i[0-9]+\/*$/)){
                icode = url.pathname.match(/^\/(i[0-9]+)\/*$/)[1]
            }
        }else if(url.host.match(/^trackback\.mitemin\.net$/) && url.pathname.match(/^\/send\/image\/icode\/[0-9]+\/*$/)){
            icode = "i" + url.pathname.match(/^\/send\/image\/icode\/([0-9]+)\/*$/)[1]
        }
    }

    return {userid: userid, icode: icode}
}
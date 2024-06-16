export function checkXmypage(){
    if(location.hostname == "mypage.syosetu.com"){
        return false
    }else if(location.hostname == "xmypage.syosetu.com"){
        return true
    }
}

export function getUserId(){
    if(location.hostname == "mypage.syosetu.com"){
        var m = location.pathname.match(/\/userid\/(\d+)\//)
        if(m){
            return m[1]
        }
    }else if(location.hostname == "xmypage.syosetu.com"){
        var m = location.pathname.match(/\/xid\/(x\d+[a-z]*)\//)
        if(m){
            return m[1]
        }
    }
}